"use client";

import { useState } from "react";
import { performRecon } from "../actions/recon";
import type { ReconResult } from "../actions/recon";
import { classifyInput } from "../lib/recon-utils";

type Status = "idle" | "loading" | "success" | "error";

function VerdictBadge({ malicious, suspicious }: { malicious: number; suspicious: number }) {
  if (malicious >= 3) {
    return (
      <span className="font-mono text-xs px-2 py-0.5 border border-red-500/40 text-red-400 bg-red-500/10">
        MALICIOUS ({malicious})
      </span>
    );
  }
  if (malicious > 0 || suspicious > 0) {
    return (
      <span className="font-mono text-xs px-2 py-0.5 border border-yellow-500/40 text-yellow-400 bg-yellow-500/10">
        SUSPICIOUS ({malicious + suspicious})
      </span>
    );
  }
  return (
    <span className="font-mono text-xs px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
      CLEAN
    </span>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 py-2.5 border-b border-[#151f35] last:border-0">
      <span className="text-xs text-[#5a6a8a] uppercase tracking-widest w-40 shrink-0 pt-0.5">
        {label}
      </span>
      <span className="text-sm text-white font-mono break-all">{value ?? "—"}</span>
    </div>
  );
}

function StatBox({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="bg-[#070b12] border border-[#151f35] p-4 text-center">
      <p className={`text-2xl font-bold font-mono ${color}`}>{value}</p>
      <p className="text-xs text-[#5a6a8a] uppercase tracking-widest mt-1">{label}</p>
    </div>
  );
}

function AbuseScoreBar({ score }: { score: number }) {
  const color = score >= 80 ? "bg-red-500" : score >= 40 ? "bg-yellow-500" : "bg-emerald-500";
  return (
    <div className="mt-1">
      <div className="h-1.5 w-full bg-[#151f35] rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${score}%` }} />
      </div>
      <p className="text-xs text-[#5a6a8a] mt-1">{score}% confidence</p>
    </div>
  );
}

function PanelHeader({ id, title, badge }: { id: string; title: string; badge?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-[#151f35]">
      <h2 id={id} className="font-mono text-xs text-[#a78bfa] uppercase tracking-widest">
        {title}
      </h2>
      {badge}
    </div>
  );
}

function TagList({ items, color = "border-[#a78bfa33] text-[#a78bfa]" }: { items: string[]; color?: string }) {
  if (!items.length) return <span className="text-[#5a6a8a]">—</span>;
  return (
    <span className="flex flex-wrap gap-1.5">
      {items.map((t) => (
        <span key={t} className={`text-xs border px-1.5 py-0.5 ${color}`}>{t}</span>
      ))}
    </span>
  );
}

function BoolBadge({ value, trueLabel = "Yes", falseLabel = "No" }: { value: boolean | null; trueLabel?: string; falseLabel?: string }) {
  if (value === null) return <span className="text-[#5a6a8a]">—</span>;
  return (
    <span className={value ? "text-red-400" : "text-emerald-400"}>
      {value ? trueLabel : falseLabel}
    </span>
  );
}

export default function BridgeSearch() {
  const [query, setQuery]   = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [result, setResult] = useState<ReconResult | null>(null);
  const [clientError, setClientError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = query.trim();
    if (!q) { setClientError("Enter an IP address, domain, or file hash."); return; }
    if (!classifyInput(q)) {
      setClientError("Unrecognised format. Supported: IPv4/IPv6, domain, URL (https://...), email, MD5/SHA1/SHA256, ASN (AS15169), or Bitcoin address.");
      return;
    }
    setClientError("");
    setStatus("loading");
    setResult(null);
    const res = await performRecon(q);
    setResult(res);
    setStatus(res.success ? "success" : "error");
  }

  const vt     = result?.virusTotal;
  const abuse  = result?.abuseIPDB;
  const shodan = result?.shodan;
  const mb     = result?.malwareBazaar;
  const uh     = result?.urlhaus;
  const tf     = result?.threatfox;
  const gn     = result?.greyNoise;
  const otx    = result?.otx;
  const ipi    = result?.ipinfo;
  const ipqs   = result?.ipqs;
  const asnI    = result?.asnInfo;
  const censys  = result?.censys;
  const lc      = result?.leakCheck;

  return (
    <div className="space-y-8">
      {/* ── SEARCH BAR ── */}
      <form onSubmit={handleSubmit} aria-label="Threat intelligence lookup form" noValidate>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <label htmlFor="bridge-query" className="sr-only">IP address, domain, or file hash</label>
            <input
              id="bridge-query"
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setClientError(""); }}
              placeholder="IP · domain · URL · email · hash · ASN · bitcoin"
              maxLength={256}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
              aria-invalid={!!clientError}
              aria-describedby={clientError ? "bridge-error" : undefined}
              className="w-full bg-[#0c1221] border border-[#151f35] text-white placeholder-[#3a4a6a] px-4 py-3 text-sm font-mono focus:outline-none focus:border-[#a78bfa] transition-colors"
              disabled={status === "loading"}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="bg-[#a78bfa] text-[#070b12] font-bold px-8 py-3 text-sm tracking-wide hover:bg-[#8b5cf6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === "loading" ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#070b12] animate-ping inline-block" />
                Scanning…
              </span>
            ) : "Run Lookup"}
          </button>
        </div>
        {clientError && (
          <p id="bridge-error" role="alert" className="mt-2 text-xs text-red-400 font-mono">{clientError}</p>
        )}
      </form>

      {/* ── ERROR STATE ── */}
      {status === "error" && result && (
        <div role="alert" className="border border-red-500/30 bg-red-500/5 px-5 py-4 font-mono text-sm text-red-400">
          {result.error}
        </div>
      )}

      {/* ── RESULTS ── */}
      {status === "success" && result && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center gap-4 flex-wrap">
            <p className="font-mono text-xs text-[#5a6a8a] uppercase tracking-widest">// Results for</p>
            <code className="text-[#a78bfa] text-sm font-mono break-all">{result.query}</code>
            <span className="font-mono text-xs text-[#3a4a6a] border border-[#151f35] px-2 py-0.5 uppercase">
              {result.inputType}
            </span>
          </div>

          {/* ── DETECTION ANALYSIS ── */}
          {vt && (
            <section aria-labelledby="vt-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="vt-heading"
                title="// Detection Analysis"
                badge={<VerdictBadge malicious={vt.maliciousCount} suspicious={vt.suspiciousCount} />}
              />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[#151f35] border-b border-[#151f35]">
                <StatBox label="Malicious"  value={vt.maliciousCount}  color="text-red-400" />
                <StatBox label="Suspicious" value={vt.suspiciousCount} color="text-yellow-400" />
                <StatBox label="Harmless"   value={vt.harmlessCount}   color="text-emerald-400" />
                <StatBox label="Undetected" value={vt.undetectedCount} color="text-[#5a6a8a]" />
              </div>
              <div className="px-6 py-4">
                <Row label="Total Engines" value={vt.totalEngines || "—"} />
                {vt.reputation !== null && (
                  <Row label="Reputation" value={
                    <span className={vt.reputation < 0 ? "text-red-400" : "text-emerald-400"}>{vt.reputation}</span>
                  } />
                )}
                {vt.lastAnalysisDate && (
                  <Row label="Last Analysis" value={new Date(vt.lastAnalysisDate).toUTCString()} />
                )}
                {vt.country  && <Row label="Country"   value={vt.country} />}
                {vt.asOwner  && <Row label="ASN Owner" value={vt.asOwner} />}
                {vt.fileName && <Row label="File Name" value={vt.fileName} />}
                {vt.fileType && <Row label="File Type" value={vt.fileType} />}
                {vt.fileSizeBytes != null && (
                  <Row label="File Size" value={`${(vt.fileSizeBytes / 1024).toFixed(1)} KB`} />
                )}
                {vt.categories.length > 0 && <Row label="Categories" value={<TagList items={vt.categories} />} />}
                {vt.tags.length > 0 && (
                  <Row label="Tags" value={<TagList items={vt.tags} color="border-[#151f35] text-[#5a6a8a]" />} />
                )}
              </div>
            </section>
          )}

          {/* ── NETWORK CONTEXT (IPinfo) ── */}
          {ipi && (ipi.org || ipi.hostname || ipi.city) && (
            <section aria-labelledby="ipi-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader id="ipi-heading" title="// Network Context" />
              <div className="px-6 py-4">
                {ipi.hostname   && <Row label="Hostname"      value={ipi.hostname} />}
                {ipi.org        && <Row label="Organisation"  value={ipi.org} />}
                {ipi.city       && <Row label="City"          value={ipi.city} />}
                {ipi.region     && <Row label="Region"        value={ipi.region} />}
                {ipi.country    && <Row label="Country"       value={ipi.country} />}
                {ipi.abuseEmail && <Row label="Abuse Contact" value={ipi.abuseEmail} />}
              </div>
            </section>
          )}

          {/* ── INTERNET NOISE CLASSIFICATION (GreyNoise) ── */}
          {gn && (
            <section aria-labelledby="gn-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="gn-heading"
                title="// Internet Noise Classification"
                badge={
                  gn.classification ? (
                    <span className={`font-mono text-xs px-2 py-0.5 border ${
                      gn.classification === "malicious"
                        ? "border-red-500/40 text-red-400 bg-red-500/10"
                        : gn.classification === "benign"
                        ? "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                        : "border-[#151f35] text-[#5a6a8a]"
                    }`}>
                      {gn.classification.toUpperCase()}
                    </span>
                  ) : (
                    <span className="font-mono text-xs px-2 py-0.5 border border-[#151f35] text-[#5a6a8a]">
                      NOT SEEN
                    </span>
                  )
                }
              />
              <div className="px-6 py-4">
                <Row label="Internet Noise" value={<BoolBadge value={gn.noise} trueLabel="Yes, background scan traffic" falseLabel="No" />} />
                <Row label="Common Service"  value={<BoolBadge value={gn.riot}  trueLabel="Yes, benign business service" falseLabel="No" />} />
                {gn.name     && <Row label="Actor / Tool" value={gn.name} />}
                {gn.lastSeen && <Row label="Last Seen"    value={gn.lastSeen} />}
              </div>
            </section>
          )}

          {/* ── FRAUD & PROXY SCORING (IPQS) ── */}
          {ipqs && (
            <section aria-labelledby="ipqs-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="ipqs-heading"
                title="// Fraud & Proxy Scoring"
                badge={
                  ipqs.fraudScore !== null ? (
                    <span className={`font-mono text-xs px-2 py-0.5 border ${
                      ipqs.fraudScore >= 75
                        ? "border-red-500/40 text-red-400 bg-red-500/10"
                        : ipqs.fraudScore >= 40
                        ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10"
                        : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                    }`}>
                      FRAUD SCORE {ipqs.fraudScore}
                    </span>
                  ) : ipqs.riskScore !== null ? (
                    <span className={`font-mono text-xs px-2 py-0.5 border ${
                      ipqs.riskScore >= 75
                        ? "border-red-500/40 text-red-400 bg-red-500/10"
                        : "border-yellow-500/40 text-yellow-400 bg-yellow-500/10"
                    }`}>
                      RISK SCORE {ipqs.riskScore}
                    </span>
                  ) : undefined
                }
              />
              <div className="px-6 py-4">
                {ipqs.proxy     !== null && <Row label="Proxy"     value={<BoolBadge value={ipqs.proxy} />} />}
                {ipqs.vpn       !== null && <Row label="VPN"       value={<BoolBadge value={ipqs.vpn} />} />}
                {ipqs.tor       !== null && <Row label="Tor"       value={<BoolBadge value={ipqs.tor} />} />}
                {ipqs.botStatus !== null && <Row label="Bot"       value={<BoolBadge value={ipqs.botStatus} />} />}
                {ipqs.unsafe    !== null && <Row label="Unsafe"    value={<BoolBadge value={ipqs.unsafe} />} />}
                {ipqs.phishing  !== null && <Row label="Phishing"  value={<BoolBadge value={ipqs.phishing} />} />}
                {ipqs.malware   !== null && <Row label="Malware"   value={<BoolBadge value={ipqs.malware} />} />}
                {ipqs.isp       && <Row label="ISP"          value={ipqs.isp} />}
                {ipqs.org       && <Row label="Organisation" value={ipqs.org} />}
                {ipqs.country   && <Row label="Country"      value={ipqs.country} />}
              </div>
            </section>
          )}

          {/* ── IP REPUTATION (AbuseIPDB) ── */}
          {abuse?.available && (
            <section aria-labelledby="abuse-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="abuse-heading"
                title="// IP Reputation"
                badge={
                  <span className={`font-mono text-xs px-2 py-0.5 border ${
                    abuse.abuseConfidenceScore >= 80
                      ? "border-red-500/40 text-red-400 bg-red-500/10"
                      : abuse.abuseConfidenceScore >= 40
                      ? "border-yellow-500/40 text-yellow-400 bg-yellow-500/10"
                      : "border-emerald-500/40 text-emerald-400 bg-emerald-500/10"
                  }`}>
                    {abuse.abuseConfidenceScore >= 80 ? "HIGH RISK" : abuse.abuseConfidenceScore >= 40 ? "MEDIUM RISK" : "LOW RISK"}
                  </span>
                }
              />
              <div className="px-6 py-4">
                <div className="py-2.5 border-b border-[#151f35]">
                  <span className="text-xs text-[#5a6a8a] uppercase tracking-widest block mb-2">Abuse Score</span>
                  <AbuseScoreBar score={abuse.abuseConfidenceScore} />
                </div>
                <Row label="Total Reports"  value={abuse.totalReports} />
                <Row label="Distinct Users" value={abuse.numDistinctUsers} />
                {abuse.lastReportedAt && (
                  <Row label="Last Reported" value={new Date(abuse.lastReportedAt).toUTCString()} />
                )}
                {abuse.isp       && <Row label="ISP"        value={abuse.isp} />}
                {abuse.domain    && <Row label="Domain"     value={abuse.domain} />}
                {abuse.country   && <Row label="Country"    value={abuse.country} />}
                {abuse.usageType && <Row label="Usage Type" value={abuse.usageType} />}
                <Row label="Tor Node" value={<BoolBadge value={abuse.isTor} />} />
              </div>
            </section>
          )}

          {/* ── OPEN PORTS & EXPOSURE (Shodan) ── */}
          {shodan && (shodan.ports.length > 0 || shodan.vulns.length > 0 || shodan.hostnames.length > 0) && (
            <section aria-labelledby="shodan-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="shodan-heading"
                title="// Open Ports & Exposure"
                badge={
                  shodan.vulns.length > 0 ? (
                    <span className="font-mono text-xs px-2 py-0.5 border border-red-500/40 text-red-400 bg-red-500/10">
                      {shodan.vulns.length} CVE{shodan.vulns.length !== 1 ? "s" : ""}
                    </span>
                  ) : (
                    <span className="font-mono text-xs px-2 py-0.5 border border-[#151f35] text-[#5a6a8a]">
                      {shodan.ports.length} PORT{shodan.ports.length !== 1 ? "S" : ""}
                    </span>
                  )
                }
              />
              <div className="px-6 py-4">
                {shodan.ports.length > 0 && (
                  <Row label="Open Ports" value={
                    <span className="flex flex-wrap gap-1.5">
                      {shodan.ports.map((p) => (
                        <span key={p} className="text-xs border border-[#151f35] text-[#a78bfa] px-1.5 py-0.5 font-mono">{p}</span>
                      ))}
                    </span>
                  } />
                )}
                {shodan.hostnames.length > 0 && (
                  <Row label="Hostnames" value={<TagList items={shodan.hostnames} color="border-[#151f35] text-[#5a6a8a]" />} />
                )}
                {shodan.vulns.length > 0 && (
                  <Row label="CVEs" value={<TagList items={shodan.vulns} color="border-red-500/30 text-red-400" />} />
                )}
                {shodan.cpes.length > 0 && (
                  <Row label="CPEs" value={<TagList items={shodan.cpes} color="border-[#151f35] text-[#5a6a8a]" />} />
                )}
                {shodan.tags.length > 0 && (
                  <Row label="Tags" value={<TagList items={shodan.tags} color="border-[#151f35] text-[#5a6a8a]" />} />
                )}
              </div>
            </section>
          )}

          {/* ── CENSYS — INTERNET EXPOSURE ── */}
          {censys && (censys.services.length > 0 || censys.certs.length > 0) && (
            <section aria-labelledby="censys-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="censys-heading"
                title={result?.inputType === "domain" ? "// Certificate Transparency" : "// Internet Exposure"}
                badge={
                  result?.inputType === "domain" ? (
                    <span className="font-mono text-xs px-2 py-0.5 border border-[#a78bfa33] text-[#a78bfa]">
                      {censys.certCount} CERT{censys.certCount !== 1 ? "S" : ""} FOUND
                    </span>
                  ) : (
                    <span className="font-mono text-xs px-2 py-0.5 border border-[#151f35] text-[#5a6a8a]">
                      {censys.services.length} SERVICE{censys.services.length !== 1 ? "S" : ""}
                    </span>
                  )
                }
              />
              <div className="px-6 py-4">
                {/* IP: metadata */}
                {result?.inputType !== "domain" && (censys.country || censys.asn) && (
                  <>
                    {censys.country  && <Row label="Country"  value={censys.country} />}
                    {censys.asn      && <Row label="ASN"      value={censys.asn} />}
                    {censys.asnName  && <Row label="ASN Name" value={censys.asnName} />}
                    {censys.lastUpdated && <Row label="Last Indexed" value={censys.lastUpdated} />}
                  </>
                )}

                {/* IP: services table */}
                {censys.services.length > 0 && (
                  <div className={result?.inputType !== "domain" && (censys.country || censys.asn) ? "pt-3 mt-1" : ""}>
                    {result?.inputType !== "domain" && (censys.country || censys.asn) && (
                      <p className="text-xs text-[#5a6a8a] uppercase tracking-widest mb-3">Exposed Services</p>
                    )}
                    <div className="space-y-2">
                      {censys.services.map((svc, i) => (
                        <div key={i} className="bg-[#070b12] border border-[#151f35] px-4 py-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="font-mono text-xs border border-[#151f35] text-[#a78bfa] px-1.5 py-0.5">
                              {svc.port}
                            </span>
                            {svc.transport && (
                              <span className="font-mono text-xs text-[#5a6a8a] uppercase">{svc.transport}</span>
                            )}
                            {svc.protocol && (
                              <span className="text-sm text-white font-mono">{svc.protocol}</span>
                            )}
                          </div>
                          {(svc.certSubject || svc.certIssuer) && (
                            <div className="mt-1.5 space-y-0.5">
                              {svc.certSubject && (
                                <p className="text-xs text-[#5a6a8a]">Subject: <span className="text-white">{svc.certSubject}</span></p>
                              )}
                              {svc.certIssuer && (
                                <p className="text-xs text-[#5a6a8a]">Issuer: <span className="text-[#a78bfa]">{svc.certIssuer}</span></p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Domain: certificate list */}
                {censys.certs.length > 0 && (
                  <div className="space-y-2">
                    {censys.certs.map((cert, i) => (
                      <div key={i} className="bg-[#070b12] border border-[#151f35] px-4 py-3 space-y-1">
                        {cert.commonName  && <p className="text-sm text-white font-mono">{cert.commonName}</p>}
                        {cert.issuer      && <p className="text-xs text-[#5a6a8a]">Issuer: <span className="text-[#a78bfa]">{cert.issuer}</span></p>}
                        {cert.notBefore   && <p className="text-xs text-[#3a4a6a]">Valid: {cert.notBefore} → {cert.notAfter}</p>}
                        {cert.fingerprint && (
                          <p className="text-xs font-mono text-[#3a4a6a] truncate">SHA256: {cert.fingerprint}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── THREAT CAMPAIGNS (OTX) ── */}
          {otx && otx.pulseCount > 0 && (
            <section aria-labelledby="otx-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="otx-heading"
                title="// Threat Campaigns"
                badge={
                  <span className="font-mono text-xs px-2 py-0.5 border border-red-500/40 text-red-400 bg-red-500/10">
                    {otx.pulseCount} PULSE{otx.pulseCount !== 1 ? "S" : ""}
                  </span>
                }
              />
              <div className="px-6 py-4">
                {otx.countryName && <Row label="Country" value={otx.countryName} />}
                {otx.asn         && <Row label="ASN"     value={otx.asn} />}
                {otx.reputation !== 0 && (
                  <Row label="Reputation" value={
                    <span className={otx.reputation < 0 ? "text-red-400" : "text-emerald-400"}>{otx.reputation}</span>
                  } />
                )}
                {otx.pulses.length > 0 && (
                  <div className="pt-2 mt-1">
                    <p className="text-xs text-[#5a6a8a] uppercase tracking-widest mb-3">Associated Campaigns</p>
                    <div className="space-y-2">
                      {otx.pulses.map((p, i) => (
                        <div key={i} className="bg-[#070b12] border border-[#151f35] px-4 py-3 space-y-1.5">
                          <p className="text-sm text-white font-mono">{p.name}</p>
                          {p.adversary && (
                            <p className="text-xs text-[#5a6a8a]">Adversary: <span className="text-[#a78bfa]">{p.adversary}</span></p>
                          )}
                          {p.malwareFamilies.length > 0 && (
                            <TagList items={p.malwareFamilies} color="border-red-500/30 text-red-400" />
                          )}
                          {p.tags.length > 0 && (
                            <TagList items={p.tags} color="border-[#151f35] text-[#5a6a8a]" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── MALWARE INTELLIGENCE (MalwareBazaar) ── */}
          {mb && (
            <section aria-labelledby="mb-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="mb-heading"
                title="// Malware Intelligence"
                badge={
                  mb.found ? (
                    <span className="font-mono text-xs px-2 py-0.5 border border-red-500/40 text-red-400 bg-red-500/10">KNOWN MALWARE</span>
                  ) : (
                    <span className="font-mono text-xs px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10">NOT FOUND</span>
                  )
                }
              />
              {mb.found && (
                <div className="px-6 py-4">
                  {mb.fileName       && <Row label="File Name"       value={mb.fileName} />}
                  {mb.fileType       && <Row label="File Type"       value={mb.fileType} />}
                  {mb.fileSizeBytes != null && (
                    <Row label="File Size" value={`${(mb.fileSizeBytes / 1024).toFixed(1)} KB`} />
                  )}
                  {mb.signature      && <Row label="Signature"       value={mb.signature} />}
                  {mb.deliveryMethod && <Row label="Delivery Method" value={mb.deliveryMethod} />}
                  {mb.firstSeen      && <Row label="First Seen"      value={mb.firstSeen} />}
                  {mb.lastSeen       && <Row label="Last Seen"       value={mb.lastSeen} />}
                  {mb.tags.length > 0 && (
                    <Row label="Tags" value={<TagList items={mb.tags} color="border-red-500/30 text-red-400" />} />
                  )}
                </div>
              )}
            </section>
          )}

          {/* ── MALWARE DISTRIBUTION (URLhaus) ── */}
          {uh && uh.found && (
            <section aria-labelledby="uh-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="uh-heading"
                title="// Malware Distribution"
                badge={
                  uh.blacklisted ? (
                    <span className="font-mono text-xs px-2 py-0.5 border border-red-500/40 text-red-400 bg-red-500/10">BLACKLISTED</span>
                  ) : (
                    <span className="font-mono text-xs px-2 py-0.5 border border-yellow-500/40 text-yellow-400 bg-yellow-500/10">
                      {uh.urlCount} URL{uh.urlCount !== 1 ? "s" : ""} TRACKED
                    </span>
                  )
                }
              />
              <div className="px-6 py-4">
                <Row label="URLs Tracked" value={uh.urlCount} />
                {uh.tags.length > 0 && (
                  <Row label="Tags" value={<TagList items={uh.tags} color="border-yellow-500/30 text-yellow-400" />} />
                )}
                {uh.recentUrls.length > 0 && (
                  <div className="pt-2">
                    <p className="text-xs text-[#5a6a8a] uppercase tracking-widest mb-3">Recent URLs</p>
                    <div className="space-y-2">
                      {uh.recentUrls.map((u, i) => (
                        <div key={i} className="bg-[#070b12] border border-[#151f35] px-4 py-3">
                          <p className="text-xs font-mono text-white break-all">{u.url}</p>
                          <div className="flex gap-4 mt-1.5">
                            <span className={`text-xs font-mono ${u.status === "online" ? "text-red-400" : "text-[#5a6a8a]"}`}>{u.status}</span>
                            <span className="text-xs text-[#5a6a8a]">{u.threat}</span>
                            <span className="text-xs text-[#3a4a6a]">{u.dateAdded}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ── EMAIL BREACH INTELLIGENCE ── */}
          {lc && result?.inputType === "email" && (
            <section aria-labelledby="email-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="email-heading"
                title="// Credential Breach Intelligence"
                badge={
                  lc.found > 0 ? (
                    <span className="font-mono text-xs px-2 py-0.5 border border-red-500/40 text-red-400 bg-red-500/10">
                      {lc.found.toLocaleString()} RECORDS EXPOSED
                    </span>
                  ) : (
                    <span className="font-mono text-xs px-2 py-0.5 border border-emerald-500/40 text-emerald-400 bg-emerald-500/10">
                      NOT FOUND IN BREACHES
                    </span>
                  )
                }
              />
              {lc.found > 0 && (
                <div className="px-6 py-4">
                  <Row label="Breach Count"    value={lc.sources.length} />
                  {lc.fields.length > 0 && (
                    <Row
                      label="Exposed Fields"
                      value={
                        <span className="flex flex-wrap gap-1.5">
                          {lc.fields.map((f) => (
                            <span
                              key={f}
                              className={`text-xs border px-1.5 py-0.5 font-mono ${
                                f === "password" || f === "ssn" || f === "credit_card"
                                  ? "border-red-500/40 text-red-400"
                                  : "border-yellow-500/30 text-yellow-400"
                              }`}
                            >
                              {f}
                            </span>
                          ))}
                        </span>
                      }
                    />
                  )}
                  {lc.sources.length > 0 && (
                    <div className="pt-3 mt-1">
                      <p className="text-xs text-[#5a6a8a] uppercase tracking-widest mb-3">Breach Sources</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {lc.sources.map((s, i) => (
                          <div key={i} className="bg-[#070b12] border border-[#151f35] px-3 py-2 flex items-center justify-between gap-2">
                            <span className="text-xs text-white font-mono truncate">{s.name}</span>
                            {s.date && <span className="text-xs text-[#3a4a6a] shrink-0">{s.date}</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>
          )}

          {/* ── ASN INTELLIGENCE ── */}
          {asnI && (asnI.name || asnI.org || asnI.prefixes.length > 0) && (
            <section aria-labelledby="asn-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader id="asn-heading" title="// ASN Information" />
              <div className="px-6 py-4">
                {asnI.name    && <Row label="Name"     value={asnI.name} />}
                {asnI.org     && <Row label="Org"      value={asnI.org} />}
                {asnI.country && <Row label="Country"  value={asnI.country} />}
                {asnI.prefixes.length > 0 && (
                  <Row label="IP Prefixes" value={<TagList items={asnI.prefixes} color="border-[#151f35] text-[#5a6a8a]" />} />
                )}
              </div>
            </section>
          )}

          {/* ── IOC INTELLIGENCE (ThreatFox) ── */}
          {tf && tf.found && (
            <section aria-labelledby="tf-heading" className="bg-[#0c1221] border border-[#151f35]">
              <PanelHeader
                id="tf-heading"
                title="// IOC Intelligence"
                badge={
                  <span className="font-mono text-xs px-2 py-0.5 border border-red-500/40 text-red-400 bg-red-500/10">
                    {tf.iocCount} IOC{tf.iocCount !== 1 ? "s" : ""} MATCHED
                  </span>
                }
              />
              <div className="px-6 py-4 space-y-4">
                {tf.iocs.map((ioc, i) => (
                  <div key={i} className="bg-[#070b12] border border-[#151f35] px-4 py-3 space-y-1.5">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="font-mono text-xs border border-[#151f35] text-[#a78bfa] px-1.5 py-0.5 uppercase">
                        {ioc.iocType}
                      </span>
                      {ioc.malwarePrintable && (
                        <span className="text-sm text-white font-mono">{ioc.malwarePrintable}</span>
                      )}
                      <span className={`font-mono text-xs px-2 py-0.5 border ml-auto ${
                        ioc.confidence >= 75
                          ? "border-red-500/40 text-red-400"
                          : ioc.confidence >= 50
                          ? "border-yellow-500/40 text-yellow-400"
                          : "border-[#151f35] text-[#5a6a8a]"
                      }`}>
                        {ioc.confidence}% confidence
                      </span>
                    </div>
                    {ioc.firstSeen && <p className="text-xs text-[#5a6a8a]">First seen: {ioc.firstSeen}</p>}
                    {ioc.tags.length > 0 && <TagList items={ioc.tags} color="border-[#151f35] text-[#5a6a8a]" />}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <p className="font-mono text-xs text-[#3a4a6a] leading-relaxed">
            Passive lookups only. No active scanning or probing is performed.
            Results are sourced from multiple threat intelligence databases
            and reflect their last update times.
          </p>
        </div>
      )}
    </div>
  );
}
