import type { BuildConfig, BuildFormConfig } from "@/types/build";

export type BuildErrors = Partial<Record<keyof BuildFormConfig, string>>;

const PACKAGE_RE = /^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/i;
const VERSION_NAME_RE = /^\d+(\.\d+){0,3}([-+][A-Za-z0-9.-]+)?$/;

export const isHttpUrl = (value: string): boolean => {
  try {
    const url = new URL(value.trim());
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

const JAVA_KEYWORDS = new Set([
  "abstract",
  "class",
  "const",
  "default",
  "do",
  "else",
  "enum",
  "for",
  "goto",
  "if",
  "import",
  "int",
  "new",
  "package",
  "private",
  "public",
  "return",
  "static",
  "switch",
  "try",
  "void",
  "while",
]);

export function validateBuildConfig(config: BuildConfig | BuildFormConfig): BuildErrors {
  const errors: BuildErrors = {};

  const websiteUrl = config.websiteUrl.trim();
  if (!websiteUrl) errors.websiteUrl = "Website URL is required.";
  else if (!isHttpUrl(websiteUrl))
    errors.websiteUrl = "Enter a full URL including http:// or https://";

  const appName = config.appName.trim();
  if (!appName) errors.appName = "App name is required.";
  else if (appName.length < 2) errors.appName = "App name must be at least 2 characters.";
  else if (appName.length > 50) errors.appName = "App name must be 50 characters or fewer.";

  const packageName = config.packageName.trim();
  if (!packageName) errors.packageName = "Package name is required.";
  else if (!PACKAGE_RE.test(packageName))
    errors.packageName = "Use Android format, e.g. com.frenytech.myapp (at least two segments).";
  else if (packageName.split(".").some((segment) => JAVA_KEYWORDS.has(segment.toLowerCase())))
    errors.packageName = "Package segments cannot be reserved Java keywords.";

  const versionName = config.versionName.trim();
  if (!versionName) errors.versionName = "Version name is required.";
  else if (!VERSION_NAME_RE.test(versionName))
    errors.versionName = "Use a numeric version such as 1.0.0";

  const versionCode = config.versionCode.trim();
  if (!versionCode) errors.versionCode = "Version code is required.";
  else if (!/^\d+$/.test(versionCode)) errors.versionCode = "Version code must be a whole number.";
  else if (Number(versionCode) < 1) errors.versionCode = "Version code must be 1 or higher.";
  else if (Number(versionCode) > 2100000000) errors.versionCode = "Version code is too large.";

  if ("iconFile" in config) {
    if (!config.iconFile) errors.iconFile = "App icon is required.";
  } else {
    const iconUrl = config.iconUrl.trim();
    if (!iconUrl) errors.iconFile = "App icon is required.";
    else if (!isHttpUrl(iconUrl)) errors.iconFile = "The uploaded icon could not be prepared.";
  }

  return errors;
}

export const hasErrors = (errors: BuildErrors): boolean => Object.keys(errors).length > 0;

export const suggestPackageName = (appName: string): string => {
  const slug = appName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 24);
  return slug ? `com.frenytech.${slug}` : "";
};

export const formatBuildTime = (ms: number | null): string => {
  if (ms == null || !Number.isFinite(ms) || ms <= 0) return "Not reported";
  const seconds = ms / 1000;
  if (seconds < 60) return `${seconds.toFixed(seconds < 10 ? 1 : 0)} seconds`;
  const minutes = Math.floor(seconds / 60);
  const rest = Math.round(seconds % 60);
  return `${minutes}m ${rest}s`;
};
