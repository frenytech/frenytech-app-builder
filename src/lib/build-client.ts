import type { BuildFormConfig, BuildResponse } from "@/types/build";

const CLIENT_TIMEOUT_MS = 10 * 60 * 1000; // APK builds legitimately take minutes.

/**
 * Calls our own server route. The browser never talks to the upstream
 * Web2APK service and never sees its raw response.
 */
export async function requestBuild(config: BuildFormConfig): Promise<BuildResponse> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);

  try {
    const formData = new FormData();
    formData.set("websiteUrl", config.websiteUrl);
    formData.set("appName", config.appName);
    formData.set("packageName", config.packageName);
    formData.set("versionName", config.versionName);
    formData.set("versionCode", config.versionCode);
    if (config.iconFile) formData.set("icon", config.iconFile);

    const response = await fetch("/api/public/build", {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });

    const data: unknown = await response.json().catch(() => null);

    if (data && typeof data === "object" && "success" in data) {
      return data as BuildResponse;
    }

    return {
      success: false,
      code: "server_error",
      message: "The build service returned an unexpected response. Please try again.",
    };
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return {
        success: false,
        code: "timeout",
        message: "The build took too long to respond. Please try again in a few minutes.",
      };
    }
    return {
      success: false,
      code: "network_error",
      message: "Network connection lost. Check your internet connection and try again.",
    };
  } finally {
    clearTimeout(timer);
  }
}
