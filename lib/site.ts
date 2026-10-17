// Central site config — change ONLY this file when you buy your domain.
// Replace "https://www.your-domain.com" with your real domain, e.g. "https://cvmakerpakistan.pk".
// Do NOT add a trailing slash.
export const SITE_URL = "https://www.your-domain.com";
export const SITE_NAME = "CV Maker Pakistan";
export const CONTACT_EMAIL = "gmdcf797@gmail.com";
// Used for <lastmod> in the sitemap. Update only when page content really changes.
export const CONTENT_UPDATED = "2026-10-16";
export const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;
