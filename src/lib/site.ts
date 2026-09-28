/** Site-wide constants. Production canonical domain is configurable. */

const rawSiteUrl =
  (typeof import.meta !== "undefined" && import.meta.env?.["VITE_SITE_URL"]) ||
  "https://frenytech-web2apk.vercel.app";

export const SITE_URL: string = String(rawSiteUrl).replace(/\/+$/, "");

export const BRAND = "FrenyTech";
export const PRODUCT = "FrenyTech Web2APK Builder";
export const GITHUB_URL = "https://github.com/frenytech";
export const WHATSAPP_URL = "https://wa.me/2349048564527";

export const canonical = (path = "/"): string =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
