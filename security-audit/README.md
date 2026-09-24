# Security Audit & Remediation Dashboard
**Course:** SE4030 – Secure Software Development  
**Project:** Digital Marketplace for Farmers and Sellers (Harvest Lanka)  
**Branch:** `security-audit-remediation`

---

## 👥 Group Information

| Member Name | Student Registration No | Role |
| :--- | :--- | :--- |
| **RAJAPAKSHA R W V C V** | **IT23152878** | Team Member |
| **KUMBUKAGE S S** | **IT23155534** | Team Member |
| **EKANAYAKE E M N D** | **IT23283930** | Team Member |
| **CROOS E D** | **IT23314238** | Team Member |

---

## 📁 Directory Structure

```text
security-audit/
├── README.md                          <- Main audit overview & assignment dashboard
├── vulnerabilities.md                 <- Master log of all 16 discovered vulnerabilities with PoC & details
├── selected-7-vulnerabilities.md      <- 7 chosen vulnerabilities for code remediation & OAuth implementation
└── media/                             <- Proof-of-concept screenshots, tool scan reports, diagrams
    ├── .gitkeep
    └── README.md
```

---

## 📋 Master Vulnerability Inventory (16 Findings Discovered)

All findings are documented in detail with root cause, affected files, PoC, and remediation in [`vulnerabilities.md`](./vulnerabilities.md).

| # | Vulnerability Title | OWASP Top 10 Category | Severity | Detection Technique | Selected to Fix? |
|---|---|---|---|---|:---:|
| 1 | **Critical Password Reset Bypass (Promise Truthiness Bug)** | A07:2021 – Auth Failures | Critical (9.8) | Static Code Review | [ ] |
| 2 | **Missing JWT Cryptographic Signature Verification** | A07:2021 – Auth Failures | Critical (9.1) | Static Code Review | [ ] |
| 3 | **Unauthenticated Administrative Data Exfiltration** | A01:2021 – Broken Access Control | Critical (9.1) | Architectural Route Audit | [ ] |
| 4 | **Unauthenticated Arbitrary Account Deactivation** | A01:2021 – Broken Access Control | High (8.6) | Route & Logic Audit | [ ] |
| 5 | **IDOR & Unauthenticated Deletion of User Accounts** | A01:2021 – Broken Access Control | High (8.5) | Static Code Review | [ ] |
| 6 | **IDOR & Unauthenticated CRUD on Bid Posts** | A01:2021 – Broken Access Control | High (8.5) | Architectural Route Audit | [ ] |
| 7 | **Privilege Escalation via Mass Assignment (Register as Admin)** | A01:2021 – Broken Access Control | High (8.5) | Static Code Review | [ ] |
| 8 | **Unrestricted File Upload & Remote Stored XSS** | A04:2021 – Insecure Design | High (8.2) | Static Code Review | [ ] |
| 9 | **Hardcoded Secrets Leaked in Git History (Gmail App Password)** | A02:2021 – Cryptographic Failures | High (7.5) | Git History Scan | [ ] |
| 10 | **Sensitive Data Exposure: Password Hash Returned in API Responses** | A02:2021 – Cryptographic Failures | High (7.5) | Data Flow Analysis | [ ] |
| 11 | **Unverified Payment Webhook (Payment Forgery)** | A08:2021 – Integrity Failures | High (7.5) | Logic Review | [ ] |
| 12 | **Known Critical & High Vulnerabilities in Third-Party Packages** | A06:2021 – Outdated Components | Critical / High | SCA (`npm audit`) | [ ] |
| 13 | **Insecure Session Cookie Flags (Missing HttpOnly & Secure)** | A05:2021 – Security Misconfiguration | Medium (6.5) | Static Code Review | [ ] |
| 14 | **Weak Cryptographic PRNG in OTP Generation (`Math.random`)** | A02:2021 – Cryptographic Failures | Medium (5.3) | Static Code Review | [ ] |
| 15 | **Regular Expression Denial of Service (ReDoS)** | A03:2021 – Injection | Medium (5.3) | Static Code Review | [ ] |
| 16 | **Missing HTTP Security Headers & Absence of Rate Limiting** | A05:2021 & A04:2021 | Medium (5.3) | Architecture Review | [ ] |

---

## 🎯 Assignment Roadmap

- [x] **Step 1: Vulnerability Discovery** – Conducted thorough multi-vector security assessment (SCA, Git secret scan, SAST, architectural logic review) producing 16 documented vulnerabilities across 7 OWASP Top 10 categories.
- [ ] **Step 2: Selection of 7 Distinct High-Impact Vulnerabilities** – Select the 7 primary vulnerabilities to remediate.
- [ ] **Step 3: Code Remediation & Verifiable Git Commits** – Refactor source code with defensive fixes and detailed commit messages.
- [ ] **Step 4: OAuth 2.0 / OpenID Connect Integration** – Implement Google OAuth 2.0 / OIDC authentication flow.
- [ ] **Step 5: Final Report (PDF) & YouTube Demonstration Video** – Compile documentation and video walkthrough.

---

## 🖼️ Media & Evidence Guidelines
Store all scan logs, screenshots, and visual PoCs inside the [`media/`](./media) folder.  
Link them directly in the markdown files using relative paths:
```markdown
![PoC Description](./media/screenshot-name.png)
```
