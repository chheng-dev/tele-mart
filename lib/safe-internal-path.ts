/** Allows same-origin relative paths only (avoids open redirects). */
export function safeInternalPath(from: string | undefined): string | null {
  if (!from || !from.startsWith("/") || from.startsWith("//")) {
    return null;
  }
  return from;
}
