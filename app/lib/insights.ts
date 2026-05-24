import type { BlogSection } from "./blog-posts";

export interface Insight {
  slug: string;
  year: number;
  tag: string;
  title: string;
  excerpt: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  publishedDate: string;
  isoDate: string;
  sources: string[];
  content: BlogSection[];
}

export const insights: Insight[] = [
  // ─── 1. Threat Landscape 2025 ──────────────────────────────────────────────
  {
    slug: "threat-landscape-2025",
    year: 2025,
    tag: "Threat Landscape",
    title: "2025 Cybersecurity Threat Landscape: What the Numbers Actually Say",
    excerpt:
      "Ransomware groups pivot to data extortion without encryption. AI-generated phishing reaches near-undetectable quality. Supply chain attacks against CI/CD pipelines triple year-on-year. Our annual breakdown of what changed and what it means for defenders.",
    readTime: "18 min read",
    heroImage: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1200&q=80",
    heroImageAlt: "Abstract threat visualization with digital network",
    publishedDate: "January 2025",
    isoDate: "2025-01-20",
    sources: [
      "Verizon 2025 Data Breach Investigations Report",
      "CrowdStrike 2025 Global Threat Report",
      "IBM X-Force 2025 Threat Intelligence Index",
      "Mandiant M-Trends 2025",
      "Google Cloud Threat Horizons Report H1 2025",
    ],
    content: [
      {
        type: "p",
        text: "Every year the security industry publishes dozens of threat reports. The signal-to-noise ratio is mixed. Some reports reflect genuinely novel data from millions of observed incidents. Others recycle prior-year conclusions with new graphics. This report synthesises findings from the major 2025 publications — Verizon DBIR, CrowdStrike GTR, IBM X-Force, and Mandiant M-Trends — into a practitioner-focused summary of what actually changed in the threat landscape and what the defensive implications are.",
      },
      {
        type: "callout",
        variant: "info",
        text: "All statistics cited in this report are derived from the published 2025 editions of the referenced industry reports. Where figures differ between sources we note the variance and prefer the source with the larger, more geographically diverse dataset.",
      },
      {
        type: "h2",
        text: "The Biggest Shift: Encryption-Free Ransomware",
      },
      {
        type: "p",
        text: "The most significant structural change in ransomware operations this year was the growth of extortion-only attacks that skip encryption entirely. CrowdStrike documented a 40% year-on-year increase in adversary groups conducting data theft followed directly by ransom demands, without deploying an encryptor. The economics make sense from the attacker's perspective: encryption requires victim-specific key management infrastructure, creates detectable endpoint activity, and leaves evidence in memory. Exfiltration alone achieves the same leverage with less operational overhead.",
      },
      {
        type: "p",
        text: "Verizon's DBIR found that extortion was present in 32% of all financially motivated breaches in 2025, up from 24% the prior year. Critically, the median dwell time before extortion demand dropped to 5.5 days, compared to 8 days for traditional ransomware. Defenders have less time than ever to detect and contain an intrusion before the leverage is established.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&q=80",
        alt: "Binary code representing digital threat activity",
        caption: "Extortion-only attacks have grown consistently for three years, now accounting for nearly a third of financially motivated breaches.",
      },
      {
        type: "h2",
        text: "Initial Access: Credential Theft Still Dominates",
      },
      {
        type: "p",
        text: "Verizon's 2025 DBIR found that stolen credentials were the number one initial access method for the fourth consecutive year, involved in 38% of breaches. The mechanism has shifted: the dominant delivery channel is no longer direct phishing of target employees but rather purchase of credentials harvested by information-stealer malware deployed via malvertising, trojanised software downloads, and cracked software repositories.",
      },
      {
        type: "table",
        headers: ["Initial Access Method", "Share of Breaches (2025)", "Year-on-Year Change"],
        rows: [
          ["Stolen credentials (purchased/infostealer)", "38%", "+4 pp"],
          ["Phishing (direct to target)", "22%", "-3 pp"],
          ["Exploitation of public-facing applications", "19%", "+2 pp"],
          ["Trusted relationship / supply chain", "12%", "+5 pp"],
          ["Valid accounts (insider/misconfiguration)", "9%", "Flat"],
        ],
      },
      {
        type: "p",
        text: "IBM X-Force reported that the average time from initial infostealer infection to credential deployment in a separate targeted attack was 22 days. This gap represents the window available for credential monitoring to detect and remediate before an attacker makes use of the stolen material.",
      },
      {
        type: "h2",
        text: "Vulnerability Exploitation: The Speed of Weaponisation",
      },
      {
        type: "p",
        text: "CrowdStrike tracked the median time from CVE publication to active exploitation at 62 hours in 2025, down from 84 hours in 2024 and 5 days in 2022. The compression is being driven by automated exploitation frameworks that generate working exploits from patch diffs within hours of a fix being published. For organisations with 30-day or quarterly patch cycles, this data point should prompt a fundamental rethink of patching SLAs for internet-facing infrastructure.",
      },
      {
        type: "code",
        lang: "text",
        code: `CVE Weaponisation Timeline (CrowdStrike GTR 2025)

CVE disclosed (Day 0)
  |
  +-- Patch released (same day ~60% of cases, within 7 days ~35%)
  |
  +-- Proof-of-concept published (median: 28 hours after CVE disclosure)
  |
  +-- Active exploitation observed (median: 62 hours after CVE disclosure)
  |
  +-- Broad threat actor adoption (median: 14 days after CVE disclosure)
  |
  +-- Average enterprise patch deployment (30-90 days after CVE disclosure)
                                            ^
                                            | This gap is the attack window`,
      },
      {
        type: "p",
        text: "The most heavily exploited vulnerability classes in 2025 were: edge device firmware (VPN appliances, firewalls, load balancers) at 29% of exploited CVEs; web application frameworks at 24%; and cloud management interfaces at 18%. Mandiant noted that edge device exploitation was the single most common enterprise intrusion vector in their incident response caseload for the second consecutive year.",
      },
      {
        type: "h2",
        text: "AI-Assisted Attacks: Moving Beyond Hype",
      },
      {
        type: "p",
        text: "Last year's reports were heavy on AI threat speculation. This year's data shows concrete operational adoption in two specific areas: phishing content generation and vulnerability research automation.",
      },
      {
        type: "p",
        text: "IBM X-Force analysed 8,000 phishing emails attributed to tracked threat groups and found that AI-generated content had reached a quality threshold where linguistic analysis tools could no longer reliably distinguish it from legitimate correspondence. The same groups were deploying AI-generated phishing in five languages simultaneously, targeting multinational organisations without the per-language staffing costs that previously constrained international campaigns.",
      },
      {
        type: "p",
        text: "CrowdStrike documented nation-state actors using LLM-assisted vulnerability research to generate candidate exploits for target software, reducing research time by an estimated 60%. The capability is currently limited to actors with the resources to run private model instances — public commercial APIs are not being abused at scale for this purpose due to content filtering. That constraint is expected to erode as capable open-weight models become more accessible.",
      },
      {
        type: "h2",
        text: "Supply Chain: CI/CD as the New Attack Surface",
      },
      {
        type: "p",
        text: "Mandiant M-Trends 2025 documented a 210% increase in intrusions targeting software build and deployment infrastructure compared to 2023. The XZ Utils backdoor (discovered in 2024 but active for over a year) catalysed significant threat actor interest in the pattern: a single successful compromise of a widely-used open-source dependency or build tool can provide access to thousands of downstream environments simultaneously.",
      },
      {
        type: "p",
        text: "The most common supply chain intrusion vectors in 2025 were: compromised CI/CD credentials exposed in public repositories (41%); malicious packages published to open-source registries (28%); and social engineering of open-source maintainers to accept malicious pull requests (19%). The last category is the most difficult to defend against and requires community-level governance responses rather than organisational security controls alone.",
      },
      {
        type: "h2",
        text: "Sector-Specific Findings",
      },
      {
        type: "table",
        headers: ["Sector", "Top Threat", "Key Statistic"],
        rows: [
          ["Financial Services", "BEC / account takeover", "Median loss per BEC incident: $140k (FBI IC3 2025)"],
          ["Healthcare", "Ransomware / data extortion", "62% of all ransomware reports involved healthcare targets (HHS 2025)"],
          ["Critical Infrastructure", "Nation-state pre-positioning", "ICS-CERT responded to 1,200+ OT incidents, up 38% (CISA 2025)"],
          ["Technology", "Supply chain / credential theft", "SaaS platform credentials in 44% of tech sector breaches (IBM X-Force 2025)"],
          ["Education", "Phishing / credential compromise", "Underfunded security functions with high-volume external exposure (Verizon DBIR 2025)"],
        ],
      },
      {
        type: "h2",
        text: "Defensive Priorities for 2025",
      },
      {
        type: "p",
        text: "Synthesising the findings above into a prioritised defensive roadmap, the highest-return investments are consistent across all five major reports:",
      },
      {
        type: "ol",
        items: [
          "Phishing-resistant MFA deployed to all users, not just privileged accounts. Credential theft is the leading initial access method. Phishing-resistant MFA (hardware keys, passkeys) directly blocks the most common attack chain.",
          "Patch SLA reform for internet-facing infrastructure. A 30-day patch cycle means living with a 28-day attack window on every critical CVE. Edge devices and VPN appliances should be patched within 24-48 hours of a critical advisory.",
          "Credential monitoring and infostealer hygiene. Subscribe to a credential intelligence feed. The 22-day gap between infostealer infection and targeted use is a detection opportunity that most organisations are not using.",
          "CI/CD pipeline security. Audit all workflow files for credential exposure, enforce branch protection, pin third-party action versions by SHA, and implement mandatory code review for pipeline configuration changes.",
          "Detection capability for data exfiltration. With dwell time before extortion demand dropping to 5.5 days, detection engineering should prioritise large outbound data transfers, Rclone usage, and bulk file access events.",
        ],
      },
      {
        type: "callout",
        variant: "tip",
        text: "The single finding most consistent across all five 2025 reports: organisations with phishing-resistant MFA and a mature vulnerability management programme for external attack surface were significantly underrepresented in breach data relative to their peers. Neither control is complex to implement. The gap is consistent execution, not lack of knowledge.",
      },
    ],
  },

  // ─── 2. AI Attack Surface 2025 ─────────────────────────────────────────────
  {
    slug: "ai-attack-surface-2025",
    year: 2025,
    tag: "AI Security",
    title: "The AI Attack Surface in 2025: What Enterprises Got Wrong",
    excerpt:
      "Enterprise adoption of GenAI outpaced security reviews by a wide margin this year. We document the most common LLM misconfigurations, RAG pipeline exposures, and AI agent privilege escalation patterns observed across engagements.",
    readTime: "14 min read",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    heroImageAlt: "Abstract AI neural network visualization",
    publishedDate: "March 2025",
    isoDate: "2025-03-17",
    sources: [
      "OWASP Top 10 for LLM Applications v1.1",
      "Google Cloud Threat Horizons Report H1 2025",
      "NIST AI Risk Management Framework (AI RMF 1.0)",
      "Gartner AI Security Survey 2025",
      "MITRE ATLAS (Adversarial Threat Landscape for AI Systems)",
    ],
    content: [
      {
        type: "p",
        text: "The speed of enterprise GenAI adoption in 2024 and 2025 created a predictable security gap. According to Gartner's 2025 AI security survey, 68% of organisations that deployed LLM-integrated applications did so without a formal security review of the deployment architecture. The same survey found that 41% of security teams had no visibility into which AI models and services were being used across their organisation. The attack surface expanded faster than the controls that should accompany it.",
      },
      {
        type: "p",
        text: "This report draws on MITRE ATLAS, OWASP LLM Top 10, Google's Threat Horizons reporting, and our own assessment work to document the most commonly exploited patterns in enterprise AI deployments observed in 2025.",
      },
      {
        type: "h2",
        text: "Shadow AI: The Ungoverned Deployment Problem",
      },
      {
        type: "p",
        text: "The most prevalent finding in enterprise AI security assessments this year was not a specific technical vulnerability but a governance failure: employees deploying AI tools and integrations outside of any IT or security review process. Gartner found that large enterprises had an average of 74 distinct AI tools in use, of which only 31 were sanctioned by IT. The remaining 43 were shadow deployments, many of them browser extensions, third-party integrations, or SaaS products that had added LLM features without updating their data processing agreements.",
      },
      {
        type: "p",
        text: "The security implications are significant. Shadow AI tools often receive sensitive internal data — customer records pasted into a chatbot for summarisation, code containing credentials uploaded for review, internal documents sent to an AI writing assistant. Most of these tools are not covered by corporate data handling policies, and many transmit data to third-party model providers under the provider's own terms rather than the enterprise's data processing agreements.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80",
        alt: "Server infrastructure representing AI deployment environment",
        caption: "Enterprise AI deployments have outpaced security governance, creating broad ungoverned attack surface.",
      },
      {
        type: "h2",
        text: "RAG Pipeline Authorisation Failures",
      },
      {
        type: "p",
        text: "Retrieval-Augmented Generation (RAG) allows LLM applications to retrieve relevant documents from internal knowledge bases before generating a response. The pattern is powerful but introduces a critical security requirement: the retrieval layer must enforce the same access controls as direct document access. In practice, most RAG deployments we assessed were not meeting this requirement.",
      },
      {
        type: "p",
        text: "The most common pattern: a RAG system that indexes all documents in a SharePoint or Confluence instance and allows any authenticated user to query across the entire corpus, regardless of their individual document permissions. An employee with access to general company policies could retrieve excerpts from board meeting minutes, M&A documentation, or HR records by crafting sufficiently specific queries — not because the LLM was exploited, but because the retrieval layer had no per-user permission model.",
      },
      {
        type: "code",
        lang: "python",
        code: `# Bad: retrieval without access control
def retrieve_documents(query: str, vector_store) -> list[str]:
    results = vector_store.similarity_search(query, k=5)
    return [doc.page_content for doc in results]
    # Returns documents regardless of who is asking

# Better: enforce caller identity at retrieval time
def retrieve_documents(
    query: str,
    vector_store,
    user_id: str,
    permission_service: PermissionService,
) -> list[str]:
    results = vector_store.similarity_search(query, k=20)
    # Filter to only docs the caller is authorised to read
    authorised = [
        doc for doc in results
        if permission_service.can_read(user_id, doc.metadata["source_id"])
    ]
    return [doc.page_content for doc in authorised[:5]]`,
      },
      {
        type: "h2",
        text: "Prompt Injection at Scale",
      },
      {
        type: "p",
        text: "Google's Threat Horizons H1 2025 report documented the first confirmed use of prompt injection in financially motivated attacks against enterprise applications. The attack pattern involved injecting instructions into documents processed by enterprise LLM pipelines — specifically, contract review and email summarisation workflows — to redirect outputs in ways that influenced downstream business decisions.",
      },
      {
        type: "p",
        text: "MITRE ATLAS catalogued 23 confirmed prompt injection incidents in 2025 where the injection succeeded in causing unintended tool execution by an AI agent. The highest-severity cases involved agents with access to email sending, calendar management, or internal ticketing systems — tools that allow an injection to have real-world consequences beyond just returning incorrect text.",
      },
      {
        type: "callout",
        variant: "warn",
        text: "Prompt injection in agentic pipelines is categorically different from prompt injection in conversational chatbots. When an injected instruction can trigger a tool call — sending an email, creating a calendar event, querying a database — the impact surface extends well beyond incorrect text generation. Audit every tool exposed to your LLM agents and apply least-privilege before deploying agentic workflows.",
      },
      {
        type: "h2",
        text: "Model and API Key Exposure",
      },
      {
        type: "p",
        text: "IBM X-Force found OpenAI, Anthropic, and AWS Bedrock API keys in 12% of the public repositories they scanned as part of their credential exposure monitoring programme. The exposure rate for AI provider keys grew faster than any other credential category in 2025, driven by the volume of developers experimenting with LLM integrations and committing .env files or hardcoded keys to public repositories.",
      },
      {
        type: "p",
        text: "Exposed API keys carry two distinct risks: cost abuse (using the key to run inference at the victim's expense) and data access (using the key to access fine-tuned models, uploaded files, or conversation history stored by the provider). Both have been observed in the wild in 2025.",
      },
      {
        type: "code",
        lang: "bash",
        code: `# Find exposed AI provider credentials in git history
# (run against your own repositories as part of your security programme)

# Gitleaks with AI provider rules
gitleaks detect --source . --log-opts="--all" 2>&1 | grep -E "openai|anthropic|bedrock|cohere|huggingface"

# Patterns that indicate AI key exposure:
# sk-[a-zA-Z0-9]{48}              OpenAI API key
# sk-ant-[a-zA-Z0-9-_]{95}        Anthropic API key
# AKIA[0-9A-Z]{16}                AWS access key (may be Bedrock)

# If found: rotate immediately, then check provider usage logs for abuse`,
      },
      {
        type: "h2",
        text: "AI in the Hands of Attackers",
      },
      {
        type: "p",
        text: "CrowdStrike's GTR 2025 documented a meaningful increase in AI-assisted social engineering. The most impactful technique was not sophisticated jailbreaking of public models but rather the use of deepfake audio in targeted vishing (voice phishing) calls. Several high-value business email compromise cases in 2025 were preceded by a vishing call using an AI-generated voice cloned from publicly available audio of a target executive — a technique that CrowdStrike attributes to at least four distinct financially motivated threat groups.",
      },
      {
        type: "table",
        headers: ["AI-Assisted Attack Technique", "Threat Actor Adoption", "Primary Target"],
        rows: [
          ["AI-generated phishing content", "Broad (both nation-state and criminal)", "All sectors"],
          ["Deepfake audio vishing", "4+ criminal groups documented (CrowdStrike)", "Finance approval workflows"],
          ["LLM-assisted vulnerability research", "Nation-state actors primarily", "Critical software"],
          ["Automated spear-phishing personalisation", "Growing across mid-tier actors", "Executive targets"],
          ["AI-generated malware variants", "Limited (evasion quality inconsistent)", "EDR evasion attempts"],
        ],
      },
      {
        type: "h2",
        text: "What Good AI Security Governance Looks Like",
      },
      {
        type: "ol",
        items: [
          "Maintain an AI tool inventory. You cannot govern what you have not counted. Implement a lightweight approval process for new AI tool adoption that captures what data the tool receives and what its data handling terms are.",
          "Apply data classification before deploying RAG. Only ingest data into a knowledge base at a sensitivity level appropriate for the broadest user group that will query it. Use separate knowledge bases for different trust levels.",
          "Treat all LLM agent tool access as privileged. Apply least-privilege to every tool exposed to an LLM agent. An agent that only needs to read documents should not have write access. An agent that only needs internal data should not have internet access.",
          "Rotate AI provider API keys on a schedule and monitor usage. Set spend alerts and flag unusual inference volume. A sudden spike in API usage on a development key is an indicator of key abuse.",
          "Test AI-integrated applications for prompt injection before production deployment. This requires manual testing by someone familiar with the attack class — automated scanners do not reliably detect indirect injection via retrieved content.",
        ],
      },
    ],
  },

  // ─── 3. GRC Regulatory Shifts 2025 ────────────────────────────────────────
  {
    slug: "grc-regulatory-shifts-2025",
    year: 2025,
    tag: "GRC & Compliance",
    title: "Regulatory Shifts in 2025: NIS2, DORA, and What Auditors Are Actually Checking",
    excerpt:
      "Three major regulatory frameworks came into force or matured significantly in 2025. We break down the practical impact on security teams, what actually changed, what the auditors are checking, and where organisations are still falling short.",
    readTime: "12 min read",
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80",
    heroImageAlt: "Compliance documents and legal frameworks on a desk",
    publishedDate: "May 2025",
    isoDate: "2025-05-05",
    sources: [
      "ENISA NIS2 Implementation Report 2025",
      "European Banking Authority DORA RTS (Regulatory Technical Standards)",
      "SEC Cybersecurity Disclosure Rules Final Guidance 2025",
      "NCSC Cyber Assessment Framework v3.2",
      "PwC Global Digital Trust Insights 2025",
    ],
    content: [
      {
        type: "p",
        text: "2025 was the year that several years of regulatory drafting and consultation turned into enforcement reality. NIS2 hit its October 2024 national transposition deadline and member state regulators began supervisory activity in early 2025. DORA's compliance deadline of January 2025 meant that EU financial entities faced their first full year under the regulation's ICT risk management requirements. In the US, the SEC's updated cybersecurity disclosure rules moved from guidance to enforcement action. This report synthesises the practical compliance implications for security teams.",
      },
      {
        type: "h2",
        text: "NIS2: From Directive to Enforcement Reality",
      },
      {
        type: "p",
        text: "The NIS2 Directive replaced the original NIS Directive and significantly expanded its scope. Where NIS covered seven essential service sectors, NIS2 covers eighteen. The directive introduced a two-tier entity classification — essential entities and important entities — with different supervisory regimes for each. Essential entities face proactive supervision (regulators can initiate inspections without a triggering incident). Important entities face reactive supervision (supervision follows reported incidents or complaints).",
      },
      {
        type: "p",
        text: "ENISA's implementation report found that as of Q1 2025, 22 of 27 EU member states had completed national transposition. The five that had not were facing infringement proceedings. Enforcement activity began almost immediately after transposition in several member states, with supervisory authorities issuing information requests to entities in the energy and digital infrastructure sectors.",
      },
      {
        type: "table",
        headers: ["NIS2 Requirement", "Key Obligation", "Common Gap Found in Practice"],
        rows: [
          [
            "Art. 21 - Risk management measures",
            "Implement proportionate technical and organisational security measures across 10 defined domains",
            "Vulnerability management for OT/ICS systems not meeting the same standards as IT",
          ],
          [
            "Art. 23 - Incident reporting",
            "Early warning within 24h, notification within 72h, final report within 1 month",
            "No documented incident classification procedure to determine NIS2 reportability threshold",
          ],
          [
            "Art. 20 - Governance",
            "Management bodies must approve and oversee cybersecurity risk management",
            "Board-level cybersecurity accountability not formally established in governance documents",
          ],
          [
            "Art. 21(2)(d) - Supply chain security",
            "Security measures addressing supply chain risks including vendor relationships",
            "Third-party vendor security assessments not conducted or not documented",
          ],
        ],
      },
      {
        type: "h2",
        text: "The 24-Hour Early Warning Requirement",
      },
      {
        type: "p",
        text: "The NIS2 incident reporting timeline is the requirement most organisations are least prepared for. A 24-hour early warning to the national competent authority or CSIRT, followed by a 72-hour notification, requires a detection-to-decision process that most security teams have not formally designed.",
      },
      {
        type: "p",
        text: "The early warning at 24 hours does not require a complete picture of the incident. It requires: confirmation that a significant incident has occurred, an initial characterisation of the incident type, and an indication of whether the incident is suspected to be malicious. The difficulty is establishing internally — within 24 hours of discovery — that a given event meets the NIS2 threshold for a significant incident.",
      },
      {
        type: "code",
        lang: "text",
        code: `NIS2 Significant Incident Criteria (Article 23(3)):

An incident is "significant" if it:
  (a) has caused or is capable of causing severe operational disruption
      of the services or financial loss for the entity concerned; OR
  (b) has affected or is capable of affecting other natural or legal
      persons by causing considerable material or non-material damage.

Practical decision checklist (complete within 24h of discovery):
  [ ] Has the incident caused or could it cause service disruption?
  [ ] Has personal data been affected? (triggers parallel GDPR notification)
  [ ] Has the incident affected other organisations (supply chain)?
  [ ] Is the incident likely to be malicious (vs. accidental/technical fault)?
  [ ] Does the incident involve critical or important systems (per your NIS2 scope)?

If YES to any of (a) or (b): file early warning to national CSIRT within 24h.`,
      },
      {
        type: "h2",
        text: "DORA: What Financial Entities Needed to Build",
      },
      {
        type: "p",
        text: "The Digital Operational Resilience Act applies to a wide range of EU financial entities: banks, insurance companies, investment firms, crypto-asset service providers, and critically, their critical ICT third-party service providers. DORA's January 2025 compliance deadline meant that most entities spent 2024 in a frantic implementation sprint.",
      },
      {
        type: "p",
        text: "The EBA's regulatory technical standards specify the substance of DORA's five pillars in more detail than the regulation itself. The requirements that generated the most implementation work were: the ICT risk management framework (Pillar 1), the TLPT (Threat-Led Penetration Testing) programme for significant entities (Pillar 4), and the ICT third-party risk management framework with its requirement for a maintained register of all ICT service provider contracts (Pillar 5).",
      },
      {
        type: "callout",
        variant: "info",
        text: "DORA's TLPT requirement mandates threat-led penetration testing for significant financial entities on at least a three-year cycle. The tests must be conducted by qualified testers, cover production systems including live customer-facing infrastructure, and follow a structured methodology (TIBER-EU or equivalent national framework). This is a meaningfully higher bar than standard penetration testing and many institutions underestimated the lead time for procurement and preparation.",
      },
      {
        type: "h2",
        text: "SEC Cybersecurity Disclosure Rules: Enforcement Activity Begins",
      },
      {
        type: "p",
        text: "The SEC's cybersecurity disclosure rules, adopted in July 2023, required public companies to disclose material cybersecurity incidents within four business days and to include annual disclosures about cybersecurity risk management, strategy, and governance in 10-K filings. 2025 saw the first enforcement actions under the rules.",
      },
      {
        type: "p",
        text: "The initial enforcement focus was on two failure patterns: disclosure timeliness (incidents that were not disclosed within the four-day window) and disclosure quality (annual disclosures that described security programmes at a level of generality that provided no substantive information about actual governance and risk management practices). PwC's Global Digital Trust Insights 2025 found that 61% of CISO respondents at public companies had not yet established a formal process for determining materiality of cybersecurity incidents within the required four-day window.",
      },
      {
        type: "h2",
        text: "What Auditors Are Actually Checking in 2025",
      },
      {
        type: "p",
        text: "Based on feedback from clients who have been through NIS2 supervisory engagements and DORA readiness assessments in 2025, the practical focus of regulatory scrutiny has been on three areas that map to the most common implementation gaps:",
      },
      {
        type: "ul",
        items: [
          "Evidence of management involvement in cybersecurity governance. Regulators want meeting minutes, board reports, and written policies signed by named senior individuals — not just a policy document that states 'the board is responsible for cybersecurity'.",
          "Third-party and supply chain risk documentation. A register of critical suppliers with their security assessment status, contract references to security obligations, and evidence that the assessments were actually conducted.",
          "Incident response capability evidence. Documented and tested incident response plans, with test records (tabletop exercises, simulations, or actual incident post-mortems) demonstrating that the plan works in practice.",
        ],
      },
      {
        type: "h2",
        text: "Common Implementation Gaps and Fixes",
      },
      {
        type: "table",
        headers: ["Gap", "Regulatory Reference", "Practical Fix"],
        rows: [
          [
            "No documented NIS2 incident reporting procedure",
            "NIS2 Art. 23",
            "Create a one-page decision tree: is this incident significant? If yes, who calls the CSIRT? Practise it in a tabletop.",
          ],
          [
            "Board not receiving regular cybersecurity reporting",
            "NIS2 Art. 20 / DORA Art. 5",
            "Quarterly board-level cybersecurity dashboard with three metrics: threat exposure, control health, open incidents.",
          ],
          [
            "No third-party ICT service register",
            "DORA Art. 28",
            "Inventory all ICT service contracts. Classify each by criticality. Ensure contracts include DORA-required provisions.",
          ],
          [
            "No formal materiality determination process for SEC disclosure",
            "SEC Rule 13a-1 / 15d-1",
            "Define materiality criteria in writing (revenue impact threshold, data sensitivity, operational disruption). Get legal sign-off. Test in a simulation.",
          ],
        ],
      },
      {
        type: "p",
        text: "The common thread across all three regulatory frameworks is that documentation and governance evidence matter as much as technical controls. A technically strong security programme that cannot produce written evidence of board oversight, incident reporting procedures, and third-party risk management will fail a regulatory review even if the underlying controls are sound. Build your compliance programme to produce evidence as a natural by-product of doing the work, not as a separate documentation exercise before an audit.",
      },
    ],
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getAllInsightSlugs(): string[] {
  return insights.map((i) => i.slug);
}
