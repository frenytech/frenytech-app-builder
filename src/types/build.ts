/** Shared types for the FrenyTech Web2APK build workflow. */

export interface BuildConfig {
  websiteUrl: string;
  appName: string;
  packageName: string;
  versionName: string;
  versionCode: string;
  iconUrl: string;
}

/** The only shape the browser ever receives from our server route. */
export interface BuildSuccess {
  success: true;
  message: string;
  buildTimeMs: number | null;
  downloadUrl: string;
  appName: string;
  packageName: string;
  versionName: string;
  versionCode: string;
}

export interface BuildFailure {
  success: false;
  /** Safe, user-facing message. Never contains upstream internals. */
  message: string;
  code: BuildErrorCode;
}

export type BuildErrorCode =
  | "validation_failed"
  | "upstream_error"
  | "upstream_invalid_response"
  | "missing_download_url"
  | "timeout"
  | "network_error"
  | "server_error";

export type BuildResponse = BuildSuccess | BuildFailure;

export type BuildStage =
  | "idle"
  | "preparing"
  | "sending"
  | "building"
  | "finalizing"
  | "complete"
  | "failed";
