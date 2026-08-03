/**
 * Input validation and sanitisation utilities.
 * OWASP-aligned: strip dangerous characters, validate formats.
 */

/** Strip HTML tags and trim whitespace */
export function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')        // strip HTML tags
    .replace(/[<>"'`]/g, '')        // strip remaining dangerous chars
    .trim()
}

/** Validate email format (RFC 5322 simplified) */
export function isValidEmail(email: string): boolean {
  const pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  return pattern.test(email) && email.length <= 254
}

/** Validate URL format (loose — allows without protocol) */
export function isValidUrl(url: string): boolean {
  if (!url) return true // optional field
  const pattern = /^(https?:\/\/)?[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z]{2,})+/
  return pattern.test(url) && url.length <= 200
}

/** Validate name — no script injection, reasonable length */
export function isValidName(name: string): boolean {
  const clean = sanitize(name)
  return clean.length >= 2 && clean.length <= 100
}

/** Validate free text — reasonable length, not just whitespace */
export function isValidText(text: string, minLength = 3, maxLength = 2000): boolean {
  const clean = sanitize(text)
  return clean.length >= minLength && clean.length <= maxLength
}

/** Rate limiting helper — returns true if too many submissions */
const submissions: number[] = []
export function isRateLimited(maxPerMinute = 3): boolean {
  const now = Date.now()
  const oneMinuteAgo = now - 60000
  // Clean old entries
  while (submissions.length > 0 && submissions[0] < oneMinuteAgo) {
    submissions.shift()
  }
  if (submissions.length >= maxPerMinute) return true
  submissions.push(now)
  return false
}
