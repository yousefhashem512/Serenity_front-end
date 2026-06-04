export function safeUrl(url) {
  if (!url) return "";

  return url.replace(/^http:\/\//i, "https://");
}


