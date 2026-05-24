export interface ServiceItem {
  title: string;
  description: string;
}

export interface Service {
  slug: string;
  tag: string;
  title: string;
  category: "service" | "solution";
  shortDescription: string;
  heroDescription: string;
  items: ServiceItem[];
  metaDescription: string;
  keywords: string[];
}

export const services: Service[] = [
  // ── SERVICES ──────────────────────────────────────────────────────────────
  {
    slug: "offensive-security",
    tag: "01",
    title: "Offensive Security",
    category: "service",
    shortDescription:
      "Attack-driven assessments that expose real risk before adversaries do.",
    heroDescription:
      "We simulate the full range of threat actor techniques, from opportunistic scanning to targeted multi-stage intrusion, to expose what a real attacker would find and exploit. Every engagement is scoped around your actual risk, delivered by senior engineers, not automated tooling.",
    metaDescription:
      "ctfwithai offensive security services: web, mobile, network and cloud penetration testing, red team operations, and social engineering assessments conducted by senior practitioners.",
    keywords: [
      "penetration testing",
      "web application pentest",
      "red team assessment",
      "network penetration testing",
      "cloud security testing",
      "mobile app pentest",
      "social engineering",
      "offensive security services",
    ],
    items: [
      {
        title: "Web & API Penetration Testing",
        description:
          "Systematic security testing of web applications, single-page apps, REST and GraphQL APIs. Coverage spans authentication flaws, injection vulnerabilities, broken access control, business logic weaknesses, and client-side attack surfaces, mapped to OWASP Top 10 and beyond.",
      },
      {
        title: "Mobile Application Security Testing",
        description:
          "Deep security evaluation of iOS and Android applications using OWASP MASVS methodology. Includes static and dynamic analysis, reverse engineering, local data storage review, inter-process communication abuse, and backend API assessment.",
      },
      {
        title: "Network & Infrastructure Pentest",
        description:
          "External, internal, and wireless network assessments that mirror real attacker behaviour. Identifies system misconfigurations, unpatched software, weak authentication, exposed services, and lateral movement paths through your environment.",
      },
      {
        title: "Cloud Security Assessment",
        description:
          "Configuration and penetration testing across AWS, Azure, and Google Cloud environments. Evaluated against CIS Benchmarks and frameworks including ISO 27017 and SOC 2, covering IAM misconfigurations, storage exposure, and insecure serverless or container deployments.",
      },
      {
        title: "Red Team Operations",
        description:
          "Full-scope adversary simulation targeting your people, processes, and technology using MITRE ATT&CK tactics. Measures your actual prevention, detection, and response capabilities rather than just the presence of controls.",
      },
      {
        title: "Social Engineering Assessment",
        description:
          "Simulated phishing, vishing, smishing, and physical security testing with measurable risk outcomes. Validates the effectiveness of existing awareness programmes and surfaces gaps before a real attacker exploits them.",
      },
    ],
  },
  {
    slug: "defensive-security",
    tag: "02",
    title: "Defensive Security",
    category: "service",
    shortDescription:
      "Build detection, response, and resilience into your security stack.",
    heroDescription:
      "Knowing where you're exposed is only half the equation. We help you close the gap by building the detection logic, response capability, and engineering discipline needed to contain threats before they become incidents. From source code to SOC, we cover the defensive side end to end.",
    metaDescription:
      "ctfwithai defensive security services: source code review, SIEM implementation, managed detection and response, incident response, digital forensics, and smart contract audits.",
    keywords: [
      "defensive security",
      "SIEM implementation",
      "managed detection and response",
      "incident response",
      "digital forensics",
      "source code review",
      "smart contract audit",
      "MDR services",
    ],
    items: [
      {
        title: "Secure Source Code Review",
        description:
          "Manual code review combined with SAST tooling across multiple languages and frameworks. Identifies vulnerabilities before they reach production, including authentication issues, injection points, cryptographic weaknesses, and insecure dependencies, with findings delivered directly into your development pipeline.",
      },
      {
        title: "SIEM Implementation & Tuning",
        description:
          "Deployment and configuration of Splunk, Microsoft Sentinel, and other platforms, including custom detection rules, alert tuning, and playbook automation. We reduce false-positive noise and ensure your SIEM surfaces threats that matter.",
      },
      {
        title: "Managed Detection & Response",
        description:
          "24/7 monitoring and investigation by senior analysts covering endpoint, cloud, and network telemetry. Backed by defined SLAs, with a median 15-minute response on critical incidents. You get a team that acts, not just alerts.",
      },
      {
        title: "Incident Response & Digital Forensics",
        description:
          "Round-the-clock incident response with dedicated engineers for containment, eradication, and recovery. Covers malware analysis, memory and disk forensics, attacker timeline reconstruction, and post-incident reporting for legal, regulatory, or insurance purposes.",
      },
      {
        title: "Smart Contract Security Audit",
        description:
          "Manual auditing of blockchain smart contracts for security flaws, economic exploits, reentrancy vulnerabilities, access control failures, and cryptographic weaknesses. Covers Solidity and multiple EVM and non-EVM platforms with detailed finding documentation.",
      },
      {
        title: "Threat Intelligence Integration",
        description:
          "Operationalise threat intelligence within your existing SIEM and SOAR stack. We map IOCs, actor TTPs, and threat feeds directly to your detection logic so your team hunts with context rather than raw alerts.",
      },
    ],
  },
  {
    slug: "grc-compliance",
    tag: "03",
    title: "GRC & Compliance",
    category: "service",
    shortDescription:
      "Practical compliance advisory built around your business, not a generic checklist.",
    heroDescription:
      "Compliance doesn't have to mean bloated documentation and checkbox exercises. We help organisations achieve meaningful security posture improvements while satisfying regulatory and contractual obligations, working with your team to implement frameworks that reflect how your business actually operates.",
    metaDescription:
      "ctfwithai GRC and compliance services: ISO 27001 implementation, SOC 2 readiness, PCI DSS advisory, GDPR and HIPAA support, third-party risk management, and virtual CISO services.",
    keywords: [
      "GRC compliance",
      "ISO 27001 implementation",
      "SOC 2 readiness",
      "PCI DSS advisory",
      "GDPR compliance",
      "HIPAA security",
      "virtual CISO",
      "third-party risk management",
    ],
    items: [
      {
        title: "ISO 27001 Implementation",
        description:
          "End-to-end support for ISO 27001 certification, from initial gap analysis and risk treatment planning through policy development, control implementation, and preparation for the external audit. We work with your team rather than delivering a documentation dump.",
      },
      {
        title: "SOC 2 Readiness",
        description:
          "Structured readiness programme covering all five Trust Services Criteria. Gap assessment, control design, evidence collection guidance, and audit preparation support for both Type I and Type II, regardless of your current maturity level.",
      },
      {
        title: "PCI DSS Advisory",
        description:
          "Scoping, gap assessment, and remediation roadmap for organisations handling cardholder data. Advisory support across all twelve PCI DSS requirements with practical implementation guidance that minimises scope without compromising security.",
      },
      {
        title: "GDPR & HIPAA Support",
        description:
          "Data protection compliance advisory for organisations subject to GDPR, HIPAA, or both. Covers data mapping, DPIA preparation, breach notification procedures, security safeguard implementation, and ongoing compliance maintenance.",
      },
      {
        title: "Third-Party Risk Management",
        description:
          "Structured programme for assessing and managing the security risk posed by vendors, suppliers, and technology partners. Includes questionnaire design, evidence review, on-site or remote assessment, and continuous monitoring for high-risk relationships.",
      },
      {
        title: "Virtual CISO (vCISO)",
        description:
          "Fractional senior security leadership for organisations that need strategic direction without a full-time hire. Covers security strategy, board reporting, risk programme management, policy governance, and oversight of technical security functions.",
      },
    ],
  },
  {
    slug: "security-training",
    tag: "04",
    title: "Security Training",
    category: "service",
    shortDescription:
      "Capability building from the ground up: technical, cultural, and strategic.",
    heroDescription:
      "Security awareness without technical depth doesn't stop breaches. Neither does technical depth without organisational buy-in. Our training programmes address both, from hands-on labs for engineers to board-level risk briefings, customised to your environment, your threat model, and your people.",
    metaDescription:
      "ctfwithai security training: technical cybersecurity labs, security awareness programmes, AppSec training, executive briefings, digital rights education, and youth and women in security programmes.",
    keywords: [
      "cybersecurity training",
      "security awareness programme",
      "AppSec training",
      "secure coding training",
      "executive cybersecurity briefing",
      "digital rights education",
      "women in cybersecurity",
      "hands-on security labs",
    ],
    items: [
      {
        title: "Technical Cybersecurity Training",
        description:
          "Hands-on, lab-based training for developers, DevOps engineers, and security practitioners. Covers secure coding, cloud security configuration, threat hunting techniques, and tooling, with exercises based on real-world attack scenarios rather than theoretical content.",
      },
      {
        title: "Security Awareness Programmes",
        description:
          "Organisation-wide security culture initiatives combining phishing simulations, microlearning modules, video content, and policy reinforcement. Includes compliance mapping, metrics dashboards, and ongoing programme management to demonstrate measurable improvement.",
      },
      {
        title: "Executive & Board Briefings",
        description:
          "Strategic security sessions for C-suite and board audiences covering the current threat landscape, regulatory obligations, and cyber risk quantification in business terms. Designed to drive informed decision-making rather than technical explanation.",
      },
      {
        title: "Secure Development (AppSec) Training",
        description:
          "Language-specific secure coding instruction aligned to OWASP standards. Covers threat modelling workshops, security requirements definition, and secure development lifecycle integration, delivered for the languages and frameworks your team actually uses.",
      },
      {
        title: "Digital Rights & Cyber Safety",
        description:
          "Specialist training for journalists, activists, NGO workers, and high-risk individuals covering operational security, secure communication tools, encryption practices, device hardening, and threat modelling in hostile environments.",
      },
      {
        title: "Youth & Women in Security",
        description:
          "Equity-focused programmes designed to build cybersecurity capability in underrepresented communities. Includes career-pathway workshops, hackathons, bootcamps, and mentorship tracks for young people and women entering the field.",
      },
    ],
  },

  // ── SOLUTIONS ─────────────────────────────────────────────────────────────
  {
    slug: "managed-soc",
    tag: "01",
    title: "Managed SOC",
    category: "solution",
    shortDescription:
      "Round-the-clock security operations covering detection, triage, response, and compliance reporting from a single senior team.",
    heroDescription:
      "Most organisations have tools. What they lack is the human expertise to run them continuously, tune them accurately, and act on findings fast enough to matter. ctfwithai's Managed SOC puts senior analysts on your environment 24/7, covering every infrastructure layer with defined SLAs and an in-house forensic team ready to engage the moment a breach is confirmed.",
    metaDescription:
      "ctfwithai Managed SOC: 24/7 monitoring and triage, SIEM and SOAR management, EDR/XDR telemetry, proactive threat hunting, incident response, and compliance reporting delivered by senior analysts.",
    keywords: [
      "managed SOC",
      "security operations center",
      "24/7 monitoring",
      "SIEM management",
      "SOAR automation",
      "EDR XDR monitoring",
      "threat hunting",
      "managed detection and response",
    ],
    items: [
      {
        title: "24/7 Monitoring & Triage",
        description:
          "Continuous analyst coverage across every infrastructure layer including network, endpoint, cloud, and identity. Alerts are enriched and evaluated by humans, not just forwarded. False positives are suppressed before they hit your team, and critical triage completes within a median five minutes.",
      },
      {
        title: "SIEM & SOAR Platform Management",
        description:
          "Deployment, configuration, and continuous tuning of your SIEM and SOAR stack across Splunk, Microsoft Sentinel, Elastic Security, IBM QRadar, Wazuh, and others. Includes custom detection rule development and automated response playbooks that reduce dwell time without generating alert fatigue.",
      },
      {
        title: "EDR / XDR Telemetry Coverage",
        description:
          "Endpoint, cloud-workload, and extended-detection telemetry monitoring via CrowdStrike, SentinelOne, Microsoft Defender XDR, and equivalent platforms. Behavioural detection identifies threats that signature-based tools miss, with automated containment triggered on confirmed malicious activity.",
      },
      {
        title: "Proactive Threat Hunting",
        description:
          "Weekly hypothesis-driven hunts through your telemetry looking for threats that bypassed automated detection. Hunting hypotheses are informed by current threat intelligence, sector-specific actor activity, and MITRE ATT&CK coverage gaps identified in your environment.",
      },
      {
        title: "Incident Response & DFIR",
        description:
          "When a breach is confirmed, our in-house forensic team engages within 15 minutes. Covers containment, eradication, malware analysis, memory and disk forensics, attacker timeline reconstruction, and post-incident reporting suitable for legal, regulatory, or insurance use.",
      },
      {
        title: "Compliance & Executive Reporting",
        description:
          "Monthly audit-ready reports mapped to ISO 27001, SOC 2, PCI DSS, HIPAA, GDPR, and NIS2. Includes detection metrics, incident summaries, coverage heatmaps, and evidence packages that reduce the overhead of your next compliance audit.",
      },
    ],
  },
  {
    slug: "threat-intelligence",
    tag: "02",
    title: "Threat Intelligence",
    category: "solution",
    shortDescription:
      "Adversary visibility mapped to your specific exposure, not generic feeds.",
    heroDescription:
      "Generic threat intelligence is noise. We deliver targeted intelligence that tells you which actors are interested in organisations like yours, what they're doing right now, and which vulnerabilities in your environment they're actively exploiting. Senior analysts, dark web access, and strategic reporting rather than automated alerts.",
    metaDescription:
      "ctfwithai threat intelligence services: dark web monitoring, brand and executive protection, APT profiling, vulnerability intelligence, and incident-driven threat support.",
    keywords: [
      "threat intelligence",
      "dark web monitoring",
      "brand protection",
      "APT profiling",
      "vulnerability intelligence",
      "cyber threat intelligence",
      "executive protection",
      "threat actor profiling",
    ],
    items: [
      {
        title: "Continuous Managed Threat Intelligence",
        description:
          "Full-spectrum coverage across dark web forums, ransomware leak sites, Telegram channels, credential databases, IOC feeds, and APT activity reports. Delivered through a dedicated analyst, portal access, SIEM/SOAR integration, and recurring strategic briefings.",
      },
      {
        title: "Dark Web Exposure Assessment",
        description:
          "A targeted investigation across dark web markets, underground forums, and breach databases to identify compromised credentials, leaked data, and references to your organisation. Delivered within two to four weeks with actionable evidence and takedown support.",
      },
      {
        title: "Brand & Executive Protection",
        description:
          "Continuous monitoring for phishing sites impersonating your brand, counterfeit mobile applications, social media impersonation accounts, and fraudulent job postings targeting your employees or leadership. Includes takedown coordination on confirmed threats.",
      },
      {
        title: "Vulnerability & Exploit Intelligence",
        description:
          "CVE analysis mapped to your actual infrastructure, identifying which vulnerabilities are actively weaponised, have public exploits available, or are being traded in underground markets. Patch prioritisation recommendations based on real adversary behaviour.",
      },
      {
        title: "Threat Actor & APT Profile Report",
        description:
          "An in-depth intelligence dossier on specific adversaries relevant to your sector, documenting their infrastructure, targeting patterns, tooling, TTPs, and detection strategies. Aligned to MITRE ATT&CK for direct operationalisation in your SIEM.",
      },
      {
        title: "Incident-Driven Threat Intelligence",
        description:
          "Emergency intelligence support during active breaches. Rapid actor attribution, leak-site surveillance, ransom negotiation context, and post-incident analysis to inform containment decisions and prevent recurrence.",
      },
    ],
  },
  {
    slug: "ai-llm-pentesting",
    tag: "03",
    title: "AI & LLM Pentesting",
    category: "solution",
    shortDescription:
      "Purpose-built security testing for GenAI products and AI-driven infrastructure.",
    heroDescription:
      "AI systems introduce attack surfaces that conventional security testing frameworks were never designed to handle. We assess large language model applications, retrieval-augmented generation pipelines, autonomous AI agents, and model supply chains against the latest adversarial techniques before your users or regulators find the gaps.",
    metaDescription:
      "ctfwithai AI and LLM penetration testing: prompt injection, RAG pipeline security, AI agent testing, red team simulation, model supply chain review, and secure AI development training.",
    keywords: [
      "LLM penetration testing",
      "AI security testing",
      "prompt injection",
      "RAG pipeline security",
      "AI red team",
      "OWASP LLM Top 10",
      "AI agent security",
      "GenAI security",
    ],
    items: [
      {
        title: "LLM Application Pentest",
        description:
          "Complete security assessment of GenAI-powered features including chatbots, copilots, and AI-augmented workflows. Coverage includes OWASP LLM Top 10, prompt injection, data extraction, system prompt leakage, and web and API layer vulnerabilities surrounding the model.",
      },
      {
        title: "RAG Pipeline Security Assessment",
        description:
          "Focused evaluation of retrieval-augmented generation architectures. Tests for indirect prompt injection via ingested documents, cross-tenant data leakage in shared vector stores, embedding manipulation, and retrieval bypass techniques.",
      },
      {
        title: "AI Agent & Plugin Security Testing",
        description:
          "Purple-team evaluation of autonomous agents and tool-using systems. Assesses excessive agency, function-calling abuse, unsafe tool chaining, and privilege escalation paths that emerge when LLMs are given access to external systems and APIs.",
      },
      {
        title: "AI Red Team & Adversary Simulation",
        description:
          "Multi-week black-box engagement simulating external adversaries targeting your AI infrastructure. Uses objective-based methodology with multi-vector chained attacks and full MITRE ATLAS coverage to expose systemic risks beyond individual model vulnerabilities.",
      },
      {
        title: "AI Supply Chain & Model File Review",
        description:
          "Security audit of model hosting infrastructure, serialised model files, and third-party AI dependencies. Covers pickle and safetensors remote code execution risks, HuggingFace dependency validation, and insecure model serving configurations.",
      },
      {
        title: "Secure AI SDLC Workshops",
        description:
          "Hands-on security training for engineering and product teams building AI systems. Covers threat modelling for LLM applications, secure prompt engineering patterns, abuse-case analysis, and integrating AI security checks into your development lifecycle.",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const servicesList = services.filter((s) => s.category === "service");
export const solutionsList = services.filter((s) => s.category === "solution");
