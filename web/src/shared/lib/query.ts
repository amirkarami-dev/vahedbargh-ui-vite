// Serialize a flat object to a URL query string (old-ui helpers/service_helper serializeQuery).
// Skips undefined/null/empty values so optional filters don't add noise.
export function toQuery(obj: Record<string, unknown>): string {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
}
