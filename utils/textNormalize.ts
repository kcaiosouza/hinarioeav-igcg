/**
 * Normalizes text for accent-insensitive, punctuation-insensitive, and case-insensitive search.
 * Example: "Senhor, remove o véu!" -> "senhor remove o veu"
 */
export function normalizeSearchText(str?: string | null): string {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
