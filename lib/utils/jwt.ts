export function decodeJwt<T = Record<string, unknown>>(
  token: string,
): T | null {
  try {
    const payloadBase64 = token.split(".")[1];
    if (!payloadBase64) return null;

    const normalized = payloadBase64
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(payloadBase64.length / 4) * 4, "=");

    const decoded = atob(normalized);
    return JSON.parse(decoded) as T;
  } catch {
    return null;
  }
}
