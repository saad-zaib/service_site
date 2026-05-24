// Shared validation utilities — imported by both the server action and the client component

export const IPV4_REGEX =
  /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)$/;

// Length-gated before regex to prevent ReDoS on pathological input
function isIPv6(s: string): boolean {
  if (s.length > 45) return false;
  // Must contain at least one colon and only valid IPv6 chars
  if (!/^[0-9a-fA-F:%.]+$/.test(s)) return false;
  // Reject more than two consecutive colons
  if (/:{3,}/.test(s)) return false;
  // Must have between 2 and 8 colon groups
  const colonCount = (s.match(/:/g) ?? []).length;
  if (colonCount < 2 || colonCount > 7) return false;
  // Each group must be 0-4 hex digits
  const groups = s.replace(/::/, ":Z:").split(":");
  return groups.every((g) => g === "Z" || /^[0-9a-fA-F]{0,4}$/.test(g));
}
export const IPV6_REGEX = null; // replaced by isIPv6() function

export const DOMAIN_REGEX =
  /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.[a-zA-Z0-9-]{1,63})*\.[a-zA-Z]{2,}$/;

export const MD5_REGEX    = /^[a-fA-F0-9]{32}$/;
export const SHA1_REGEX   = /^[a-fA-F0-9]{40}$/;
export const SHA256_REGEX = /^[a-fA-F0-9]{64}$/;

// http:// or https:// required to distinguish from bare domains
export const URL_REGEX =
  /^https?:\/\/(([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}|localhost|\d{1,3}(\.\d{1,3}){3})(:\d+)?(\/[^\s]*)?$/i;

export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

// AS or ASN followed by 1-10 digits (e.g. AS15169, ASN15169)
export const ASN_REGEX = /^(as|asn)\d{1,10}$/i;

// Legacy P2PKH (1...), P2SH (3...), Bech32 (bc1...)
export const BITCOIN_REGEX =
  /^(1[a-km-zA-HJ-NP-Z1-9]{25,34}|3[a-km-zA-HJ-NP-Z1-9]{25,34}|bc1[a-z0-9]{6,87})$/;

export type InputType =
  | "ipv4" | "ipv6" | "domain" | "hash"
  | "url"  | "email" | "asn"   | "bitcoin";

export function classifyInput(raw: string): InputType | null {
  const t = raw.trim();
  const lower = t.toLowerCase();

  // URL must start with http:// or https:// — check first to avoid domain match
  if (URL_REGEX.test(t)) return "url";

  if (IPV4_REGEX.test(lower)) return "ipv4";
  if (isIPv6(lower)) return "ipv6";

  // Pure hex hashes — check before email/domain to avoid ambiguity on long hex strings
  if (MD5_REGEX.test(lower) || SHA1_REGEX.test(lower) || SHA256_REGEX.test(lower)) return "hash";

  // Email contains @ so won't match domain
  if (EMAIL_REGEX.test(t)) return "email";

  // ASN: starts with AS/ASN prefix
  if (ASN_REGEX.test(lower)) return "asn";

  // Bitcoin: base58/bech32 — won't match domain (no dot)
  if (BITCOIN_REGEX.test(t)) return "bitcoin";

  // Domain last — catch-all for valid FQDNs
  if (DOMAIN_REGEX.test(t) && lower !== "localhost") return "domain";

  return null;
}
