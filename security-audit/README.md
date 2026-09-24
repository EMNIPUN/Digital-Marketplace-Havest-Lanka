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
├── vulnerabilities.md                 <- Master log of all 20 discovered vulnerabilities with PoC & details
├── selected-7-vulnerabilities.md      <- 7 chosen vulnerabilities for code remediation & OAuth implementation
├── media/                             <- Proof-of-concept screenshots, tool scan reports, diagrams
│   ├── .gitkeep
│   └── README.md
└── reports/                           <- Automated tool audit outputs
    └── dependency-check/
        ├── dependency-check-report.html  (Interactive HTML SCA Dashboard)
        ├── backend-audit.json            (Raw Backend Vulnerability Dataset)
        └── frontend-audit.json           (Raw Frontend Vulnerability Dataset)
```

---

## 📋 Master Vulnerability Inventory (20 Detailed Findings Discovered)

All findings are documented in detail with root cause, affected files, PoC, and remediation in [`vulnerabilities.md`](./vulnerabilities.md).

| # | Vulnerability Title | OWASP Top 10 Category | Severity | Detection Technique | Selected to Fix? |
|---|---|---|---|---|:---:|
| 1 | **Critical Password Reset Bypass (Promise Truthiness Bug)** | A07:2021 – Auth Failures | Critical (9.8) | Static Code Review | [ ] |
| 2 | **Missing JWT Cryptographic Signature Verification** | A07:2021 – Auth Failures | Critical (9.1) | Static Code Review | [ ] |
| 3 | **Unauthenticated Administrative Data Exfiltration** | A01:2021 – Broken Access Control | Critical (9.1) | Architectural Route Audit | [ ] |
| 4 | **Arbitrary File Overwrite & Symlink Path Traversal (`tar`)** | A06:2021 – Outdated Components | Critical (9.1) | OWASP Dependency-Check | [ ] |
| 5 | **Frontend Prototype Pollution (`swiper`)** | A06:2021 – Outdated Components | Critical (9.1) | OWASP Dependency-Check | [ ] |
| 6 | **Unauthenticated Arbitrary Account Deactivation** | A01:2021 – Broken Access Control | High (8.6) | Route & Logic Audit | [ ] |
| 7 | **IDOR & Unauthenticated Deletion on User Accounts** | A01:2021 – Broken Access Control | High (8.5) | Static Code Review | [ ] |
| 8 | **IDOR & Unauthenticated CRUD on Bid Posts** | A01:2021 – Broken Access Control | High (8.5) | Architectural Route Audit | [ ] |
| 9 | **Privilege Escalation via Mass Assignment (Register as Admin)** | A01:2021 – Broken Access Control | High (8.5) | Static Code Review | [ ] |
| 10 | **Unrestricted File Upload & Remote Stored XSS** | A04:2021 – Insecure Design | High (8.2) | Static Code Review | [ ] |
| 11 | **OS Command Injection via `systeminformation` on Windows** | A06:2021 – Outdated Components | High (8.2) | OWASP Dependency-Check | [ ] |
| 12 | **Unauthenticated RCE via Deserialization (`react-router`)** | A06:2021 – Outdated Components | High (8.1) | OWASP Dependency-Check | [ ] |
| 13 | **Hardcoded Secrets Leaked in Git History (Gmail App Password)** | A02:2021 – Cryptographic Failures | High (7.5) | Git History Scan | [ ] |
| 14 | **Sensitive Data Exposure: Password Hash Returned in API Responses** | A02:2021 – Cryptographic Failures | High (7.5) | Data Flow Analysis | [ ] |
| 15 | **Unverified Payment Webhook (Payment Forgery)** | A08:2021 – Integrity Failures | High (7.5) | Logic Review | [ ] |
| 16 | **SMTP Command Injection & File Read in `nodemailer`** | A06:2021 – Outdated Components | High (7.5) | OWASP Dependency-Check | [ ] |
| 17 | **Insecure Session Cookie Flags (Missing HttpOnly & Secure)** | A05:2021 – Security Misconfiguration | Medium (6.5) | Static Code Review | [ ] |
| 18 | **Weak Cryptographic PRNG in OTP Generation (`Math.random`)** | A02:2021 – Cryptographic Failures | Medium (5.3) | Static Code Review | [ ] |
| 19 | **Regular Expression Denial of Service (ReDoS)** | A03:2021 – Injection | Medium (5.3) | Static Code Review | [ ] |
| 20 | **Missing HTTP Security Headers & Absence of Rate Limiting** | A05:2021 & A04:2021 | Medium (5.3) | Architecture Review | [ ] |

---

## 🎯 Assignment Roadmap

- [x] **Step 1: Vulnerability Discovery** – Conducted multi-vector security assessment (SCA, Dependency-Check, Git secret scan, SAST, architectural logic review) producing 20 itemized vulnerabilities across 7 OWASP Top 10 categories.
- [ ] **Step 2: Selection of 7 Distinct High-Impact Vulnerabilities** – Select the 7 primary vulnerabilities across diverse OWASP categories to remediate.
- [ ] **Step 3: Code Remediation & Verifiable Git Commits** – Refactor source code with defensive fixes and detailed commit messages.
- [ ] **Step 4: OAuth 2.0 / OpenID Connect Integration** – Implement Google OAuth 2.0 / OIDC authentication flow.
- [ ] **Step 5: Final Report (PDF) & YouTube Demonstration Video** – Compile documentation and video walkthrough.
