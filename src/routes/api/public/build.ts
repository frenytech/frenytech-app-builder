import { createFileRoute } from "@tanstack/react-router";

import { validateBuildConfig, hasErrors } from "@/lib/validation";
import type { BuildConfig, BuildResponse } from "@/types/build";

const UPSTREAM_URL = "https://web2apk.benfeitech.com/api/build";
const UPSTREAM_TIMEOUT_MS = 9 * 60 * 1000;

const json = (payload: BuildResponse, status: number): Response =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const asString = (value: unknown): string => (typeof value === "string" ? value.trim() : "");

function readConfig(body: unknown): BuildConfig {
  const source = (body ?? {}) as Record<string, unknown>;
  return {
    websiteUrl: asString(source["websiteUrl"]),
    appName: asString(source["appName"]),
    packageName: asString(source["packageName"]),
    versionName: asString(source["versionName"]) || "1.0.0",
    versionCode: asString(source["versionCode"]) || "1",
    iconUrl: asString(source["iconUrl"]),
  };
}

export const Route = createFileRoute("/api/public/build")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
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

        const config = readConfig(body);
        const errors = validateBuildConfig(config);
        if (hasErrors(errors)) {
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
