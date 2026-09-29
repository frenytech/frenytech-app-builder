import { createFileRoute } from "@tanstack/react-router";

import { validateBuildConfig, hasErrors } from "@/lib/validation";
import type { BuildConfig, BuildResponse } from "@/types/build";

const UPSTREAM_URL = "https://web2apk.benfeitech.com/api/build";
const UPSTREAM_TIMEOUT_MS = 9 * 60 * 1000;
const ICON_BUCKET = "apk-build-icons";
const MAX_ICON_BYTES = 5 * 1024 * 1024;
const ALLOWED_ICON_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

const json = (payload: BuildResponse, status: number): Response =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const asString = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

function readConfig(source: Record<string, unknown>, iconUrl: string): BuildConfig {
  return {
    websiteUrl: asString(source["websiteUrl"]),
    appName: asString(source["appName"]),
    packageName: asString(source["packageName"]),
    versionName: asString(source["versionName"]) || "1.0.0",
    versionCode: asString(source["versionCode"]) || "1",
    iconUrl,
  };
}

export const Route = createFileRoute("/api/public/build")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let formData: FormData;
        try {
          formData = await request.formData();
        } catch {
          return json(
            {
              success: false,
              code: "validation_failed",
              message: "The build request could not be read. Please resubmit the form.",
            },
            400,
          );
        }

        const icon = formData.get("icon");
        if (!(icon instanceof File) || !ALLOWED_ICON_TYPES.has(icon.type) || icon.size > MAX_ICON_BYTES) {
          return json(
            {
              success: false,
              code: "validation_failed",
              message: "Choose a PNG, JPG, JPEG, or WEBP icon no larger than 5 MB.",
            },
            400,
          );
        }

        const fields: Record<string, unknown> = {};
        for (const key of ["websiteUrl", "appName", "packageName", "versionName", "versionCode"]) {
          fields[key] = formData.get(key);
        }

        const extension = icon.type === "image/png" ? "png" : icon.type === "image/webp" ? "webp" : "jpg";
        const storagePath = `builds/${crypto.randomUUID()}.${extension}`;
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const iconBytes = await icon.arrayBuffer();
        const { error: uploadError } = await supabaseAdmin.storage
          .from(ICON_BUCKET)
          .upload(storagePath, iconBytes, { contentType: icon.type, upsert: false });

        if (uploadError) {
          console.error("[web2apk] icon upload failed", uploadError.message);
          return json(
            {
              success: false,
              code: "icon_upload_failed",
              message: "The icon could not be prepared for the build. Please try again.",
            },
            502,
          );
        }

        const { data: signedIcon, error: signedUrlError } = await supabaseAdmin.storage
          .from(ICON_BUCKET)
          .createSignedUrl(storagePath, 15 * 60);

        if (signedUrlError || !signedIcon?.signedUrl) {
          await supabaseAdmin.storage.from(ICON_BUCKET).remove([storagePath]);
          console.error("[web2apk] icon URL signing failed", signedUrlError?.message);
          return json(
            {
              success: false,
              code: "icon_upload_failed",
              message: "The icon could not be prepared for the build. Please try again.",
            },
            502,
          );
        }

        const config = readConfig(fields, signedIcon.signedUrl);
        const errors = validateBuildConfig(config);
        if (hasErrors(errors)) {
          await supabaseAdmin.storage.from(ICON_BUCKET).remove([storagePath]);
          return json(
            {
              success: false,
              code: "validation_failed",
              message: "Some build settings are invalid. Please review the form and try again.",
            },
            400,
          );
        }

        // Optional upstream credential — server-side only, never exposed.
        const apiKey = process.env["WEB2APK_API_KEY"];
        const headers: Record<string, string> = {
          "Content-Type": "application/json",
          Accept: "application/json",
        };
        if (apiKey) headers["Authorization"] = `Bearer ${apiKey}`;

        let upstream: Response;
        try {
          upstream = await fetch(UPSTREAM_URL, {
            method: "POST",
            headers,
            body: JSON.stringify({
              websiteUrl: config.websiteUrl,
              appName: config.appName,
              packageName: config.packageName,
              versionName: config.versionName,
              versionCode: config.versionCode,
              iconUrl: config.iconUrl,
            }),
            signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
          });
        } catch (error) {
          const timedOut = error instanceof Error && /timeout|abort/i.test(error.name);
          console.error("[web2apk] upstream request failed", error);
          return json(
            timedOut
              ? {
                  success: false,
                  code: "timeout",
                  message:
                    "The build service did not finish in time. Large sites can take longer — please try again.",
                }
              : {
                  success: false,
                  code: "network_error",
                  message: "The build service is unreachable right now. Please try again shortly.",
                },
            504,
          );
        } finally {
          const { error: cleanupError } = await supabaseAdmin.storage
            .from(ICON_BUCKET)
            .remove([storagePath]);
          if (cleanupError) console.error("[web2apk] icon cleanup failed", cleanupError.message);
        }

        let payload: unknown;
        try {
          payload = await upstream.json();
        } catch {
          console.error("[web2apk] upstream returned non-JSON", upstream.status);
          return json(
            {
              success: false,
              code: "upstream_invalid_response",
              message: "The build service returned an unreadable response. Please try again.",
            },
            502,
          );
        }

        const data = (payload ?? {}) as Record<string, unknown>;

        if (!upstream.ok || data["success"] !== true) {
          const upstreamMessage = asString(data["message"] ?? data["error"]);
          console.error("[web2apk] build rejected", upstream.status, upstreamMessage);
          return json(
            {
              success: false,
              code: "upstream_error",
              message:
                upstreamMessage.length > 0 && upstreamMessage.length <= 180
                  ? upstreamMessage
                  : "The build could not be completed. Please check your settings and try again.",
            },
            502,
          );
        }

        const downloadUrl = asString(data["downloadUrl"]);
        const validDownload =
          downloadUrl.startsWith("https://") || downloadUrl.startsWith("http://");

        if (!validDownload) {
          return json(
            {
              success: false,
              code: "missing_download_url",
              message:
                "The build finished but no download link was provided. Please run the build again.",
            },
            502,
          );
        }

        const rawBuildTime = data["buildTime"];
        const buildTimeMs =
          typeof rawBuildTime === "number" && Number.isFinite(rawBuildTime)
            ? rawBuildTime
            : typeof rawBuildTime === "string" && /^\d+$/.test(rawBuildTime)
              ? Number(rawBuildTime)
              : null;

        // Only the minimum fields the UI needs are forwarded to the browser.
        return json(
          {
            success: true,
            message: "APK built successfully!",
            buildTimeMs,
            downloadUrl,
            appName: config.appName,
            packageName: config.packageName,
            versionName: config.versionName,
            versionCode: config.versionCode,
          },
          200,
        );
      },
    },
  },
});
