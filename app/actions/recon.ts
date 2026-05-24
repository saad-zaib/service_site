"use server";

import { headers } from "next/headers";
import {
  classifyInput,
  type InputType,
} from "../lib/recon-utils";

// ── RESULT TYPE ──────────────────────────────────────────────────────────────

export interface ReconResult {
  success: boolean;
  error?: string;
  inputType: InputType | null;
  query: string;
  virusTotal?: {
    found: boolean;
    maliciousCount: number;
    suspiciousCount: number;
    harmlessCount: number;
    undetectedCount: number;
    totalEngines: number;
    reputation: number | null;
    lastAnalysisDate: string | null;
    categories: string[];
    tags: string[];
    country: string | null;
    asOwner: string | null;
    fileName: string | null;
    fileType: string | null;
    fileSizeBytes: number | null;
    // URL-specific
    finalUrl: string | null;
    title: string | null;
  };
  abuseIPDB?: {
    available: boolean;
    abuseConfidenceScore: number;
    totalReports: number;
    numDistinctUsers: number;
    lastReportedAt: string | null;
    isTor: boolean;
    usageType: string | null;
    isp: string | null;
    domain: string | null;
    country: string | null;
  };
  shodan?: {
    ports: number[];
    vulns: string[];
    hostnames: string[];
    tags: string[];
    cpes: string[];
  };
  malwareBazaar?: {
    found: boolean;
    fileName: string | null;
    fileType: string | null;
    fileSizeBytes: number | null;
    signature: string | null;
    firstSeen: string | null;
    lastSeen: string | null;
    deliveryMethod: string | null;
    tags: string[];
  };
  urlhaus?: {
    found: boolean;
    urlCount: number;
    blacklisted: boolean;
    tags: string[];
    recentUrls: Array<{
      url: string;
      status: string;
      dateAdded: string;
      threat: string;
    }>;
  };
  threatfox?: {
    found: boolean;
    iocCount: number;
    iocs: Array<{
      iocType: string;
      malwarePrintable: string | null;
      firstSeen: string | null;
      confidence: number;
      tags: string[];
    }>;
  };
  greyNoise?: {
    noise: boolean;
    riot: boolean;
    classification: string | null;
    name: string | null;
    lastSeen: string | null;
  };
  otx?: {
    pulseCount: number;
    pulses: Array<{
      name: string;
      tags: string[];
      malwareFamilies: string[];
      adversary: string | null;
    }>;
    reputation: number;
    countryName: string | null;
    asn: string | null;
  };
  ipinfo?: {
    hostname: string | null;
    city: string | null;
    region: string | null;
    country: string | null;
    org: string | null;
    abuseEmail: string | null;
  };
  ipqs?: {
    fraudScore: number | null;
    proxy: boolean | null;
    vpn: boolean | null;
    tor: boolean | null;
    botStatus: boolean | null;
    isp: string | null;
    org: string | null;
    country: string | null;
    unsafe: boolean | null;
    phishing: boolean | null;
    malware: boolean | null;
    riskScore: number | null;
    // email-specific
    disposable: boolean | null;
    valid: boolean | null;
    recentAbuse: boolean | null;
    spamTrapScore: string | null;
    leaked: boolean | null;
  };
  // ASN lookup via ipinfo
  asnInfo?: {
    name: string | null;
    country: string | null;
    org: string | null;
    prefixes: string[];
  };
  // LeakCheck — email breach data, no key
  leakCheck?: {
    found: number;
    fields: string[];
    sources: Array<{ name: string; date: string | null }>;
  };
  // Censys — IPs and domains
  censys?: {
    // IP fields
    services: Array<{
      port: number;
      protocol: string;
      serviceName: string | null;
      transport: string | null;
      certIssuer: string | null;
      certSubject: string | null;
    }>;
    // Domain / cert fields
    certCount: number;
    certs: Array<{
      commonName: string | null;
      issuer: string | null;
      notBefore: string | null;
      notAfter: string | null;
      fingerprint: string | null;
    }>;
    lastUpdated: string | null;
    country: string | null;
    asn: string | null;
    asnName: string | null;
  };
}

// ── PRIVATE / RESERVED IP BLOCK ──────────────────────────────────────────────

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split(".").map(Number);
  const [a, b] = parts;
  if (a === 127) return true;
  if (a === 10) return true;
  if (a === 172 && b >= 16 && b <= 31) return true;
  if (a === 192 && b === 168) return true;
  if (a === 169 && b === 254) return true;
  if (a >= 224) return true;
  if (a === 0) return true;
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase();
  if (lower === "::1") return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("fe80")) return true;
  if (lower === "::" || lower === "0:0:0:0:0:0:0:0") return true;
  return false;
}

// ── SANITISATION ─────────────────────────────────────────────────────────────

function sanitiseStr(val: unknown, maxLen = 200): string {
  if (val === null || val === undefined) return "";
  return String(val)
    .slice(0, maxLen)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

function safeNum(val: unknown): number {
  const n = Number(val);
  return Number.isFinite(n) ? n : 0;
}

function safeNumOrNull(val: unknown): number | null {
  if (val === null || val === undefined || val === "") return null;
  const n = Number(val);
  return Number.isFinite(n) ? n : null;
}

function sanitiseStrOrNull(val: unknown): string | null {
  if (val === null || val === undefined || val === "") return null;
  const s = sanitiseStr(val);
  return s === "" ? null : s;
}

function sanitiseArray(val: unknown, maxItems = 20): string[] {
  if (!Array.isArray(val)) return [];
  return val.slice(0, maxItems).map((v) => sanitiseStr(v));
}

function sanitiseNumArray(val: unknown, maxItems = 50): number[] {
  if (!Array.isArray(val)) return [];
  return val.slice(0, maxItems).map((v) => Number(v)).filter((n) => Number.isFinite(n));
}

function safeBoolOrNull(val: unknown): boolean | null {
  if (val === null || val === undefined) return null;
  if (typeof val === "boolean") return val;
  return null;
}

// ── RATE LIMITING ─────────────────────────────────────────────────────────────

const perIpMap  = new Map<string, { count: number; resetAt: number }>();
const globalMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(
  map: Map<string, { count: number; resetAt: number }>,
  key: string,
  max: number
): boolean {
  const now = Date.now();
  for (const [k, v] of map) {
    if (now > v.resetAt) map.delete(k);
  }
  const entry = map.get(key);
  if (!entry || now > entry.resetAt) {
    map.set(key, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  if (entry.count >= max) return true;
  entry.count++;
  return false;
}

// ── HELPERS ──────────────────────────────────────────────────────────────────

function mkCtrl() { return new AbortController(); }
function T(ctrl: AbortController, ms: number) { return setTimeout(() => ctrl.abort(), ms); }

// ── MAIN SERVER ACTION ────────────────────────────────────────────────────────

export async function performRecon(rawInput: string): Promise<ReconResult> {
  const query = rawInput.trim();
  const queryLower = query.toLowerCase();

  const inputType = classifyInput(rawInput);
  if (!inputType) {
    return {
      success: false,
      error: "Invalid input. Enter a public IP, domain, URL, email, file hash, ASN, or Bitcoin address.",
      inputType: null,
      query: queryLower,
    };
  }

  if (inputType === "ipv4" && isPrivateIPv4(queryLower)) {
    return { success: false, error: "Private and reserved IP ranges cannot be looked up.", inputType, query: queryLower };
  }
  if (inputType === "ipv6" && isPrivateIPv6(queryLower)) {
    return { success: false, error: "Private and reserved IP ranges cannot be looked up.", inputType, query: queryLower };
  }

  let clientIp = "unknown";
  try {
    const hdrs = await headers();
    const forwarded = hdrs.get("x-forwarded-for");
    if (forwarded) clientIp = forwarded.split(",")[0].trim();
  } catch { /* outside request context */ }

  if (checkRateLimit(perIpMap, clientIp, 10)) {
    return { success: false, error: "Too many lookups. Please wait before trying again.", inputType, query: queryLower };
  }
  if (checkRateLimit(globalMap, "__global__", 100)) {
    return { success: false, error: "Service is temporarily busy. Please try again shortly.", inputType, query: queryLower };
  }

  const vtKey        = process.env.VT_API_KEY;
  const abuseKey     = process.env.ABUSEIPDB_API_KEY;
  const gnKey        = process.env.GREYNOISE_API_KEY;
  const otxKey       = process.env.OTX_API_KEY;
  const ipinfoKey    = process.env.IPINFO_API_KEY;
  const ipqsKey      = process.env.IPQS_API_KEY;
  const censysId     = process.env.CENSYS_API_ID;
  const censysSecret = process.env.CENSYS_API_SECRET;
  const abusechKey   = process.env.ABUSECH_API_KEY;

  const VT_BASE = "https://www.virustotal.com/api/v3";
  const AB_BASE = "https://api.abuseipdb.com/api/v2";

  if (!vtKey) {
    console.error("recon: VT_API_KEY is not set");
    return { success: false, error: "Service not configured. Please try again later.", inputType, query: queryLower };
  }

  const isIp     = inputType === "ipv4" || inputType === "ipv6";
  const isHash   = inputType === "hash";
  const isUrl    = inputType === "url";
  const isEmail  = inputType === "email";
  const isAsn    = inputType === "asn";
  const isBtc    = inputType === "bitcoin";
  const isDomain = inputType === "domain";

  // ── VirusTotal endpoint ──
  // URL requires submitting for analysis then polling — use url_id (base64url of the URL)
  let vtEndpoint: string | null = null;
  if (isIp) {
    vtEndpoint = `${VT_BASE}/ip_addresses/${encodeURIComponent(queryLower)}`;
  } else if (isDomain) {
    vtEndpoint = `${VT_BASE}/domains/${encodeURIComponent(query)}`;
  } else if (isHash) {
    vtEndpoint = `${VT_BASE}/files/${encodeURIComponent(queryLower)}`;
  } else if (isUrl) {
    // VT URL lookup: base64url-encode the URL (no padding)
    const urlId = Buffer.from(query).toString("base64url");
    vtEndpoint = `${VT_BASE}/urls/${urlId}`;
  }
  // email, asn, bitcoin: no VT endpoint

  // ── AbortControllers ──
  const vtCtrl      = mkCtrl(); const abuseCtrl   = mkCtrl();
  const shodanCtrl  = mkCtrl(); const mbCtrl       = mkCtrl();
  const urlhausCtrl = mkCtrl(); const tfCtrl       = mkCtrl();
  const gnCtrl      = mkCtrl(); const otxCtrl      = mkCtrl();
  const ipinfoCtrl  = mkCtrl(); const ipqsCtrl     = mkCtrl();
  const censysCtrl       = mkCtrl();
  const bgpViewCtrl      = mkCtrl();
  const bgpViewPfxCtrl   = mkCtrl();
  const lcCtrl           = mkCtrl();

  const vtTO      = T(vtCtrl,      12000); const abuseTO   = T(abuseCtrl,    8000);
  const shodanTO  = T(shodanCtrl,   8000); const mbTO      = T(mbCtrl,       8000);
  const urlhausTO = T(urlhausCtrl,  8000); const tfTO      = T(tfCtrl,       8000);
  const gnTO      = T(gnCtrl,       8000); const otxTO     = T(otxCtrl,      8000);
  const ipinfoTO  = T(ipinfoCtrl,   8000); const ipqsTO    = T(ipqsCtrl,     8000);
  const censysTO    = T(censysCtrl,    10000);
  const bgpViewTO   = T(bgpViewCtrl,    8000);
  const bgpViewPfxTO = T(bgpViewPfxCtrl, 8000);
  const lcTO        = T(lcCtrl,          8000);

  // ── Build fetch promises ──

  const vtPromise = vtEndpoint
    ? fetch(vtEndpoint, {
        headers: { "x-apikey": vtKey, Accept: "application/json" },
        signal: vtCtrl.signal,
      })
    : null;

  const abusePromise = abuseKey && isIp
    ? fetch(`${AB_BASE}/check?ipAddress=${encodeURIComponent(queryLower)}&maxAgeInDays=90&verbose`, {
        headers: { Key: abuseKey, Accept: "application/json" },
        signal: abuseCtrl.signal,
      })
    : null;

  // Shodan InternetDB — IPs only, no key
  const shodanPromise = isIp
    ? fetch(`https://internetdb.shodan.io/${encodeURIComponent(queryLower)}`, {
        headers: { Accept: "application/json" },
        signal: shodanCtrl.signal,
      })
    : null;

  // MalwareBazaar — hashes only
  const mbPromise = isHash
    ? fetch("https://mb-api.abuse.ch/api/v1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          ...(abusechKey ? { "Auth-Key": abusechKey } : {}),
        },
        body: `query=get_info&hash=${encodeURIComponent(queryLower)}`,
        signal: mbCtrl.signal,
      })
    : null;

  // URLhaus — IPs, domains, URLs
  const abusechHeaders: Record<string, string> = {
    "Content-Type": "application/x-www-form-urlencoded",
    ...(abusechKey ? { "Auth-Key": abusechKey } : {}),
  };
  let urlhausPromise: Promise<Response> | null = null;
  if (isIp || isDomain) {
    urlhausPromise = fetch("https://urlhaus-api.abuse.ch/v1/host/", {
      method: "POST",
      headers: abusechHeaders,
      body: `host=${encodeURIComponent(queryLower)}`,
      signal: urlhausCtrl.signal,
    });
  } else if (isUrl) {
    urlhausPromise = fetch("https://urlhaus-api.abuse.ch/v1/url/", {
      method: "POST",
      headers: abusechHeaders,
      body: `url=${encodeURIComponent(query)}`,
      signal: urlhausCtrl.signal,
    });
  }

  // ThreatFox — IPs, domains, hashes, URLs
  const tfPromise = !isEmail && !isAsn && !isBtc
    ? fetch("https://threatfox-api.abuse.ch/api/v1/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(abusechKey ? { "Auth-Key": abusechKey } : {}),
        },
        body: JSON.stringify({ query: "search_ioc", search_term: queryLower }),
        signal: tfCtrl.signal,
      })
    : null;

  // GreyNoise — IPs only, free key
  const gnPromise = gnKey && isIp
    ? fetch(`https://api.greynoise.io/v3/community/${encodeURIComponent(queryLower)}`, {
        headers: { key: gnKey, Accept: "application/json" },
        signal: gnCtrl.signal,
      })
    : null;

  // OTX — IPs, domains, hashes, URLs only
  let otxEndpoint: string | null = null;
  if (otxKey) {
    if (isIp) {
      otxEndpoint = `https://otx.alienvault.com/api/v1/indicators/IPv4/${encodeURIComponent(queryLower)}/general`;
    } else if (isDomain) {
      otxEndpoint = `https://otx.alienvault.com/api/v1/indicators/domain/${encodeURIComponent(query)}/general`;
    } else if (isHash) {
      otxEndpoint = `https://otx.alienvault.com/api/v1/indicators/file/${encodeURIComponent(queryLower)}/general`;
    } else if (isUrl) {
      otxEndpoint = `https://otx.alienvault.com/api/v1/indicators/url/${encodeURIComponent(query)}/general`;
    }
    // bitcoin_address and email indicator types are not supported by the OTX API
  }
  const otxPromise = otxKey && otxEndpoint
    ? fetch(otxEndpoint, {
        headers: { "X-OTX-API-KEY": otxKey, Accept: "application/json" },
        signal: otxCtrl.signal,
      })
    : null;

  // IPinfo — IPs only (ASN lookup moved to BGPView)
  let ipinfoPromise: Promise<Response> | null = null;
  if (ipinfoKey && isIp) {
    ipinfoPromise = fetch(`https://ipinfo.io/${encodeURIComponent(queryLower)}/json?token=${ipinfoKey}`, {
      headers: { Accept: "application/json" },
      signal: ipinfoCtrl.signal,
    });
  }

  // RIPEstat — ASN lookup, free no-key API
  const asnNum = isAsn ? queryLower.replace(/^asn?/i, "") : null;
  const bgpViewPromise = isAsn && asnNum
    ? fetch(`https://stat.ripe.net/data/as-overview/data.json?resource=AS${encodeURIComponent(asnNum)}`, {
        headers: { Accept: "application/json" },
        signal: bgpViewCtrl.signal,
      })
    : null;
  const bgpViewPrefixPromise = isAsn && asnNum
    ? fetch(`https://stat.ripe.net/data/announced-prefixes/data.json?resource=AS${encodeURIComponent(asnNum)}`, {
        headers: { Accept: "application/json" },
        signal: bgpViewPfxCtrl.signal,
      })
    : null;

  // IPQS — IPs, domains, emails
  let ipqsPromise: Promise<Response> | null = null;
  if (ipqsKey) {
    if (isIp) {
      ipqsPromise = fetch(
        `https://ipqualityscore.com/api/json/ip/${encodeURIComponent(ipqsKey)}/${encodeURIComponent(queryLower)}?strictness=1`,
        { headers: { Accept: "application/json" }, signal: ipqsCtrl.signal }
      );
    } else if (isDomain) {
      const encodedUrl = encodeURIComponent(`https://${query}`);
      ipqsPromise = fetch(
        `https://ipqualityscore.com/api/json/url/${encodeURIComponent(ipqsKey)}/${encodedUrl}`,
        { headers: { Accept: "application/json" }, signal: ipqsCtrl.signal }
      );
    } else if (isUrl) {
      const encodedUrl = encodeURIComponent(query);
      ipqsPromise = fetch(
        `https://ipqualityscore.com/api/json/url/${encodeURIComponent(ipqsKey)}/${encodedUrl}`,
        { headers: { Accept: "application/json" }, signal: ipqsCtrl.signal }
      );
    } else if (isEmail) {
      ipqsPromise = fetch(
        `https://ipqualityscore.com/api/json/email/${encodeURIComponent(ipqsKey)}/${encodeURIComponent(query)}?strictness=1&abuse_strictness=1`,
        { headers: { Accept: "application/json" }, signal: ipqsCtrl.signal }
      );
    }
  }

  // Censys — IPs (host view) and domains (cert search), Basic Auth
  let censysPromise: Promise<Response> | null = null;
  if (censysId && censysSecret && (isIp || isDomain)) {
    const authHeader = "Basic " + Buffer.from(`${censysId}:${censysSecret}`).toString("base64");
    if (isIp) {
      censysPromise = fetch(`https://search.censys.io/api/v2/hosts/${encodeURIComponent(queryLower)}`, {
        headers: { Authorization: authHeader, Accept: "application/json" },
        signal: censysCtrl.signal,
      });
    } else {
      // Domain: search certificates by subject CN or SAN
      censysPromise = fetch("https://search.censys.io/api/v2/certificates/search", {
        method: "POST",
        headers: { Authorization: authHeader, "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          q: `parsed.names: "${queryLower.replace(/"/g, "")}"`,
          per_page: 5,
          fields: ["parsed.subject_dn", "parsed.issuer_dn", "parsed.validity.start",
                   "parsed.validity.end", "fingerprint_sha256"],
        }),
        signal: censysCtrl.signal,
      });
    }
  }

  // LeakCheck public API — email only, no key required
  const lcPromise = isEmail
    ? fetch(`https://leakcheck.io/api/public?check=${encodeURIComponent(query)}`, {
        headers: { Accept: "application/json" },
        signal: lcCtrl.signal,
      })
    : null;

  const [
    vtSettled, abuseSettled, shodanSettled, mbSettled,
    urlhausSettled, tfSettled, gnSettled, otxSettled,
    ipinfoSettled, ipqsSettled, censysSettled,
    bgpViewSettled, bgpViewPrefixSettled,
    lcSettled,
  ] = await Promise.allSettled([
    vtPromise             ?? Promise.resolve(null),
    abusePromise          ?? Promise.resolve(null),
    shodanPromise         ?? Promise.resolve(null),
    mbPromise             ?? Promise.resolve(null),
    urlhausPromise        ?? Promise.resolve(null),
    tfPromise             ?? Promise.resolve(null),
    gnPromise             ?? Promise.resolve(null),
    otxPromise            ?? Promise.resolve(null),
    ipinfoPromise         ?? Promise.resolve(null),
    ipqsPromise           ?? Promise.resolve(null),
    censysPromise         ?? Promise.resolve(null),
    bgpViewPromise        ?? Promise.resolve(null),
    bgpViewPrefixPromise  ?? Promise.resolve(null),
    lcPromise             ?? Promise.resolve(null),
  ]);

  [vtTO, abuseTO, shodanTO, mbTO, urlhausTO, tfTO, gnTO, otxTO, ipinfoTO, ipqsTO, censysTO, bgpViewTO, bgpViewPfxTO, lcTO]
    .forEach(clearTimeout);

  // ── Parse VirusTotal ──
  let vtData: ReconResult["virusTotal"] | undefined;
  if (vtSettled.status === "fulfilled" && vtSettled.value) {
    const res = vtSettled.value;
    if (!res.ok) {
      if (res.status !== 404) {
        console.error(`recon: VT returned HTTP ${res.status} for ${inputType}`);
        return { success: false, error: "Lookup failed. Please try again.", inputType, query: queryLower };
      }
      // 404 = not found in VT — return a "not found" result rather than failing
    } else {
      try {
        const json = await res.json();
        const attr = json?.data?.attributes ?? {};
        const stats: Record<string, number> = attr.last_analysis_stats ?? {};
        const malicious  = safeNum(stats.malicious);
        const suspicious = safeNum(stats.suspicious);
        const harmless   = safeNum(stats.harmless);
        const undetected = safeNum(stats.undetected);

        let categories: string[] = [];
        if (Array.isArray(attr.categories)) {
          categories = sanitiseArray(attr.categories);
        } else if (attr.categories && typeof attr.categories === "object") {
          categories = sanitiseArray(Object.values(attr.categories));
        }

        vtData = {
          found:            true,
          maliciousCount:   malicious,
          suspiciousCount:  suspicious,
          harmlessCount:    harmless,
          undetectedCount:  undetected,
          totalEngines:     malicious + suspicious + harmless + undetected,
          reputation:       safeNumOrNull(attr.reputation),
          lastAnalysisDate: sanitiseStrOrNull(
            attr.last_analysis_date
              ? new Date(safeNum(attr.last_analysis_date) * 1000).toISOString()
              : null
          ),
          categories,
          tags:          sanitiseArray(attr.tags),
          country:       sanitiseStrOrNull(attr.country),
          asOwner:       sanitiseStrOrNull(attr.as_owner),
          fileName:      sanitiseStrOrNull(attr.meaningful_name ?? attr.name),
          fileType:      sanitiseStrOrNull(attr.type_description),
          fileSizeBytes: safeNumOrNull(attr.size),
          finalUrl:      sanitiseStrOrNull(attr.final_url ?? attr.last_final_url),
          title:         sanitiseStrOrNull(attr.title),
        };
      } catch (err) {
        console.error("recon: failed to parse VT response", err instanceof Error ? err.message : err);
        return { success: false, error: "Lookup failed. Please try again.", inputType, query: queryLower };
      }
    }
  } else if (vtSettled.status === "rejected" && vtPromise) {
    console.error("recon: VT fetch failed", (vtSettled.reason as Error)?.message ?? "timeout");
    return { success: false, error: "Lookup timed out. Please try again.", inputType, query: queryLower };
  }

  // ── Parse AbuseIPDB ──
  const emptyAbuse: ReconResult["abuseIPDB"] = {
    available: false, abuseConfidenceScore: 0, totalReports: 0,
    numDistinctUsers: 0, lastReportedAt: null, isTor: false,
    usageType: null, isp: null, domain: null, country: null,
  };
  let abuseData: ReconResult["abuseIPDB"] | undefined;
  if (abuseKey && isIp) {
    if (abuseSettled.status === "fulfilled" && abuseSettled.value) {
      const res = abuseSettled.value;
      if (res.ok) {
        try {
          const json = await res.json();
          const d = json?.data ?? {};
          abuseData = {
            available:            true,
            abuseConfidenceScore: safeNum(d.abuseConfidenceScore),
            totalReports:         safeNum(d.totalReports),
            numDistinctUsers:     safeNum(d.numDistinctUsers),
            lastReportedAt:       sanitiseStrOrNull(d.lastReportedAt),
            isTor:                Boolean(d.isTor),
            usageType:            sanitiseStrOrNull(d.usageType),
            isp:                  sanitiseStrOrNull(d.isp),
            domain:               sanitiseStrOrNull(d.domain),
            country:              sanitiseStrOrNull(d.countryCode),
          };
        } catch (err) {
          console.error("recon: failed to parse AbuseIPDB response", err instanceof Error ? err.message : err);
          abuseData = emptyAbuse;
        }
      } else { abuseData = emptyAbuse; }
    } else if (abuseSettled.status === "rejected") { abuseData = emptyAbuse; }
  }

  // ── Parse Shodan InternetDB ──
  let shodanData: ReconResult["shodan"] | undefined;
  if (isIp && shodanSettled.status === "fulfilled" && shodanSettled.value) {
    const res = shodanSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        shodanData = {
          ports:     sanitiseNumArray(json.ports),
          vulns:     sanitiseArray(json.vulns, 30),
          hostnames: sanitiseArray(json.hostnames, 20),
          tags:      sanitiseArray(json.tags, 20),
          cpes:      sanitiseArray(json.cpes, 20),
        };
      } catch (err) {
        console.error("recon: failed to parse Shodan response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse MalwareBazaar ──
  let mbData: ReconResult["malwareBazaar"] | undefined;
  if (isHash && mbSettled.status === "fulfilled" && mbSettled.value) {
    const res = mbSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        if (json.query_status === "ok" && Array.isArray(json.data) && json.data.length > 0) {
          const d = json.data[0];
          mbData = {
            found:          true,
            fileName:       sanitiseStrOrNull(d.file_name),
            fileType:       sanitiseStrOrNull(d.file_type),
            fileSizeBytes:  safeNumOrNull(d.file_size),
            signature:      sanitiseStrOrNull(d.signature),
            firstSeen:      sanitiseStrOrNull(d.first_seen),
            lastSeen:       sanitiseStrOrNull(d.last_seen),
            deliveryMethod: sanitiseStrOrNull(d.delivery_method),
            tags:           sanitiseArray(d.tags, 20),
          };
        } else {
          mbData = {
            found: false, fileName: null, fileType: null, fileSizeBytes: null,
            signature: null, firstSeen: null, lastSeen: null, deliveryMethod: null, tags: [],
          };
        }
      } catch (err) {
        console.error("recon: failed to parse MalwareBazaar response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse URLhaus ──
  let urlhausData: ReconResult["urlhaus"] | undefined;
  if ((isIp || isDomain || isUrl) && urlhausSettled.status === "fulfilled" && urlhausSettled.value) {
    const res = urlhausSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        // host endpoint returns query_status "is_host"; url endpoint returns "is_url"
        if ((json.query_status === "is_host" || json.query_status === "is_url") && Array.isArray(json.urls)) {
          const bl = json.blacklists ?? {};
          const blacklisted =
            bl.spamhaus_dbl === "abused_legit_malware" ||
            bl.spamhaus_dbl === "malware_domain" ||
            bl.spamhaus_dbl === "botnet_cc_domain" ||
            bl.surbl === "listed";
          const recentUrls = (json.urls as unknown[]).slice(0, 5).map((u) => {
            const e = u as Record<string, unknown>;
            return {
              url:       sanitiseStr(e.url, 300),
              status:    sanitiseStr(e.url_status),
              dateAdded: sanitiseStr(e.date_added),
              threat:    sanitiseStr(e.threat),
            };
          });
          urlhausData = {
            found: true,
            urlCount: safeNum(json.urls.length),
            blacklisted,
            tags: sanitiseArray(json.tags, 20),
            recentUrls,
          };
        } else if (json.query_status === "is_url" && json.url_status) {
          // Single URL result
          urlhausData = {
            found: true,
            urlCount: 1,
            blacklisted: false,
            tags: sanitiseArray(json.tags, 20),
            recentUrls: [{
              url:       sanitiseStr(json.url, 300),
              status:    sanitiseStr(json.url_status),
              dateAdded: sanitiseStr(json.date_added),
              threat:    sanitiseStr(json.threat),
            }],
          };
        } else {
          urlhausData = { found: false, urlCount: 0, blacklisted: false, tags: [], recentUrls: [] };
        }
      } catch (err) {
        console.error("recon: failed to parse URLhaus response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse ThreatFox ──
  let tfData: ReconResult["threatfox"] | undefined;
  if (tfPromise && tfSettled.status === "fulfilled" && tfSettled.value) {
    const res = tfSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        if (json.query_status === "ok" && Array.isArray(json.data) && json.data.length > 0) {
          const iocs = (json.data as unknown[]).slice(0, 10).map((item) => {
            const d = item as Record<string, unknown>;
            return {
              iocType:          sanitiseStr(d.ioc_type),
              malwarePrintable: sanitiseStrOrNull(d.malware_printable ?? d.malware),
              firstSeen:        sanitiseStrOrNull(d.first_seen),
              confidence:       safeNum(d.confidence_level),
              tags:             sanitiseArray(d.tags, 10),
            };
          });
          tfData = { found: true, iocCount: safeNum(json.data.length), iocs };
        } else {
          tfData = { found: false, iocCount: 0, iocs: [] };
        }
      } catch (err) {
        console.error("recon: failed to parse ThreatFox response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse GreyNoise ──
  let gnData: ReconResult["greyNoise"] | undefined;
  if (gnKey && isIp && gnSettled.status === "fulfilled" && gnSettled.value) {
    const res = gnSettled.value;
    if (res.ok || res.status === 404) {
      try {
        const json = await res.json();
        gnData = {
          noise:          Boolean(json.noise),
          riot:           Boolean(json.riot),
          classification: sanitiseStrOrNull(json.classification),
          name:           sanitiseStrOrNull(json.name),
          lastSeen:       sanitiseStrOrNull(json.last_seen),
        };
      } catch (err) {
        console.error("recon: failed to parse GreyNoise response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse OTX ──
  let otxData: ReconResult["otx"] | undefined;
  if (otxKey && otxSettled.status === "fulfilled" && otxSettled.value) {
    const res = otxSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        const pulseInfo = json?.pulse_info ?? {};
        const rawPulses = Array.isArray(pulseInfo.pulses) ? pulseInfo.pulses : [];
        const pulses = (rawPulses as unknown[]).slice(0, 10).map((p) => {
          const pulse = p as Record<string, unknown>;
          const families = Array.isArray(pulse.malware_families)
            ? (pulse.malware_families as unknown[]).slice(0, 5).map((f) => {
                const fam = f as Record<string, unknown>;
                return sanitiseStr(fam.display_name ?? fam.family ?? f);
              })
            : [];
          return {
            name:            sanitiseStr(pulse.name),
            tags:            sanitiseArray(pulse.tags, 10),
            malwareFamilies: families,
            adversary:       sanitiseStrOrNull(pulse.adversary),
          };
        });
        otxData = {
          pulseCount:  safeNum(pulseInfo.count),
          pulses,
          reputation:  safeNum(json.reputation),
          countryName: sanitiseStrOrNull(json.country_name),
          asn:         sanitiseStrOrNull(json.asn),
        };
      } catch (err) {
        console.error("recon: failed to parse OTX response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse IPinfo (IPs only) ──
  let ipinfoData: ReconResult["ipinfo"] | undefined;
  if (ipinfoSettled.status === "fulfilled" && ipinfoSettled.value) {
    const res = ipinfoSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        if (isIp) {
          ipinfoData = {
            hostname:   sanitiseStrOrNull(json.hostname),
            city:       sanitiseStrOrNull(json.city),
            region:     sanitiseStrOrNull(json.region),
            country:    sanitiseStrOrNull(json.country),
            org:        sanitiseStrOrNull(json.org),
            abuseEmail: sanitiseStrOrNull(json.abuse?.email),
          };
        }
      } catch (err) {
        console.error("recon: failed to parse IPinfo response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse RIPEstat (ASN) ──
  let asnData: ReconResult["asnInfo"] | undefined;
  if (isAsn) {
    try {
      let asnName: string | null = null;
      let asnOrg: string | null = null;
      if (bgpViewSettled.status === "fulfilled" && bgpViewSettled.value?.ok) {
        const json = await bgpViewSettled.value.json();
        const d = json?.data ?? {};
        asnName = sanitiseStrOrNull(d.holder);
        asnOrg  = sanitiseStrOrNull(d.holder);
      }
      let prefixes: string[] = [];
      if (bgpViewPrefixSettled.status === "fulfilled" && bgpViewPrefixSettled.value?.ok) {
        const json = await bgpViewPrefixSettled.value.json();
        const rawPrefixes = Array.isArray(json?.data?.prefixes) ? json.data.prefixes : [];
        prefixes = (rawPrefixes as unknown[]).slice(0, 30).map((p) => {
          const pr = p as Record<string, unknown>;
          return sanitiseStr(pr.prefix);
        }).filter(Boolean);
      }
      if (asnName || prefixes.length > 0) {
        asnData = { name: asnName, country: null, org: asnOrg, prefixes };
      }
    } catch (err) {
      console.error("recon: failed to parse RIPEstat response", err instanceof Error ? err.message : err);
    }
  }

  // ── Parse IPQS ──
  let ipqsData: ReconResult["ipqs"] | undefined;
  if (ipqsKey && ipqsSettled.status === "fulfilled" && ipqsSettled.value) {
    const res = ipqsSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        if (json.success === true) {
          if (isIp) {
            ipqsData = {
              fraudScore: safeNumOrNull(json.fraud_score),
              proxy:      safeBoolOrNull(json.proxy),
              vpn:        safeBoolOrNull(json.vpn),
              tor:        safeBoolOrNull(json.tor),
              botStatus:  safeBoolOrNull(json.bot_status),
              isp:        sanitiseStrOrNull(json.ISP),
              org:        sanitiseStrOrNull(json.organization),
              country:    sanitiseStrOrNull(json.country_code),
              unsafe: null, phishing: null, malware: null, riskScore: null,
              disposable: null, valid: null, recentAbuse: null, spamTrapScore: null, leaked: null,
            };
          } else if (isDomain || isUrl) {
            ipqsData = {
              fraudScore: null, proxy: null, vpn: null, tor: null, botStatus: null,
              isp: null, org: null, country: null,
              unsafe:    safeBoolOrNull(json.unsafe),
              phishing:  safeBoolOrNull(json.phishing),
              malware:   safeBoolOrNull(json.malware),
              riskScore: safeNumOrNull(json.risk_score),
              disposable: null, valid: null, recentAbuse: null, spamTrapScore: null, leaked: null,
            };
          } else if (isEmail) {
            ipqsData = {
              fraudScore:    safeNumOrNull(json.fraud_score),
              proxy: null, vpn: null, tor: null, botStatus: null,
              isp: null, org: null, country: null,
              unsafe: null, phishing: null, malware: null, riskScore: null,
              disposable:    safeBoolOrNull(json.disposable),
              valid:         safeBoolOrNull(json.valid),
              recentAbuse:   safeBoolOrNull(json.recent_abuse),
              spamTrapScore: sanitiseStrOrNull(json.smtp_score != null ? String(json.smtp_score) : null),
              leaked:        safeBoolOrNull(json.leaked),
            };
          }
        }
      } catch (err) {
        console.error("recon: failed to parse IPQS response", err instanceof Error ? err.message : err);
      }
    }
  }

  // ── Parse Censys ──
  let censysData: ReconResult["censys"] | undefined;
  if (censysId && censysSecret && (isIp || isDomain) && censysSettled.status === "fulfilled" && censysSettled.value) {
    const res = censysSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        if (isIp) {
          const result = json?.result ?? {};
          const rawServices = Array.isArray(result.services) ? result.services : [];
          const services = (rawServices as unknown[]).slice(0, 20).map((s) => {
            const svc = s as Record<string, unknown>;
            const tlsCert = (svc.tls as Record<string, unknown> | undefined)
              ?.certificates as Record<string, unknown> | undefined;
            const leaf = (tlsCert?.leaf_data as Record<string, unknown> | undefined);
            const certIssuer  = sanitiseStrOrNull((leaf?.issuer as Record<string, unknown> | undefined)?.common_name);
            const certSubject = sanitiseStrOrNull((leaf?.subject as Record<string, unknown> | undefined)?.common_name);
            return {
              port:        safeNum(svc.port),
              protocol:    sanitiseStr(svc.extended_service_name ?? svc.service_name ?? ""),
              serviceName: sanitiseStrOrNull(svc.service_name),
              transport:   sanitiseStrOrNull(svc.transport_protocol),
              certIssuer,
              certSubject,
            };
          });
          const loc = result.location ?? {};
          const asInfo = result.autonomous_system ?? {};
          censysData = {
            services,
            certCount:   0,
            certs:       [],
            lastUpdated: sanitiseStrOrNull(result.last_updated_at),
            country:     sanitiseStrOrNull((loc as Record<string, unknown>).country_code),
            asn:         sanitiseStrOrNull(String((asInfo as Record<string, unknown>).asn ?? "")),
            asnName:     sanitiseStrOrNull((asInfo as Record<string, unknown>).name),
          };
        } else {
          // Domain cert search
          const hits = Array.isArray(json?.result?.hits) ? json.result.hits : [];
          const certs = (hits as unknown[]).slice(0, 5).map((h) => {
            const hit = h as Record<string, unknown>;
            const parsed = hit.parsed as Record<string, unknown> | undefined;
            const validity = parsed?.validity as Record<string, unknown> | undefined;
            return {
              commonName:  sanitiseStrOrNull((parsed?.subject as Record<string, unknown> | undefined)?.common_name),
              issuer:      sanitiseStrOrNull((parsed?.issuer as Record<string, unknown> | undefined)?.common_name),
              notBefore:   sanitiseStrOrNull(validity?.start),
              notAfter:    sanitiseStrOrNull(validity?.end),
              fingerprint: sanitiseStrOrNull(hit.fingerprint_sha256),
            };
          });
          censysData = {
            services:    [],
            certCount:   safeNum(json?.result?.total),
            certs,
            lastUpdated: null,
            country:     null,
            asn:         null,
            asnName:     null,
          };
        }
      } catch (err) {
        console.error("recon: failed to parse Censys response", err instanceof Error ? err.message : err);
      }
    } else {
      console.error(`recon: Censys returned HTTP ${res.status}`);
    }
  } else if (censysId && censysSecret && censysSettled.status === "rejected") {
    console.error("recon: Censys fetch failed", (censysSettled.reason as Error)?.message ?? "timeout");
  }

  // ── Parse LeakCheck ──
  let lcData: ReconResult["leakCheck"] | undefined;
  if (isEmail && lcSettled.status === "fulfilled" && lcSettled.value) {
    const res = lcSettled.value;
    if (res.ok) {
      try {
        const json = await res.json();
        if (json.success === true) {
          const rawSources = Array.isArray(json.sources) ? json.sources : [];
          lcData = {
            found:   safeNum(json.found),
            fields:  sanitiseArray(json.fields, 30),
            sources: (rawSources as unknown[]).slice(0, 30).map((s) => {
              const src = s as Record<string, unknown>;
              return {
                name: sanitiseStr(src.name),
                date: sanitiseStrOrNull(src.date),
              };
            }),
          };
        }
      } catch (err) {
        console.error("recon: failed to parse LeakCheck response", err instanceof Error ? err.message : err);
      }
    }
  } else if (isEmail && lcSettled.status === "rejected") {
    console.error("recon: LeakCheck fetch failed", (lcSettled.reason as Error)?.message ?? "timeout");
  }

  return {
    success:       true,
    inputType,
    query:         queryLower,
    virusTotal:    vtData,
    abuseIPDB:     abuseData,
    shodan:        shodanData,
    malwareBazaar: mbData,
    urlhaus:       urlhausData,
    threatfox:     tfData,
    greyNoise:     gnData,
    otx:           otxData,
    ipinfo:        ipinfoData,
    ipqs:          ipqsData,
    asnInfo:       asnData,
    censys:        censysData,
    leakCheck:     lcData,
  };
}
