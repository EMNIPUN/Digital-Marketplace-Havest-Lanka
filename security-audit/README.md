# Security Audit & Remediation Dashboard
**Course:** SE4030 – Secure Software Development  
**Project:** Digital Marketplace for Farmers and Sellers (Harvest Lanka)  
**Branch:** `security-audit-remediation`

---

## 📌 Overview

This directory contains the complete security assessment documentation for the group assignment. 
Each team member discovers and documents **7 distinct vulnerabilities** (total: **28 vulnerabilities**), from which **7 primary vulnerabilities** are selected for full code remediation and demonstration.

---

## 📁 Directory Structure

```text
security-audit/
├── README.md                                    <- Main audit overview and consolidated tracking table
├── media/                                       <- Proof-of-concept screenshots, tool scan reports, diagrams
├── RAJAPAKSHA-R-W-V-C-V-IT23152878/
│   └── vulnerabilities.md                       <- 7 vulnerabilities identified by RAJAPAKSHA R W V C V (IT23152878)
├── KUMBUKAGE-S-S-IT23155534/
│   └── vulnerabilities.md                       <- 7 vulnerabilities identified by KUMBUKAGE S S (IT23155534)
├── EKANAYAKE-E-M-N-D-IT23283930/
│   └── vulnerabilities.md                       <- 7 vulnerabilities identified by EKANAYAKE E M N D (IT23283930)
├── CROOS-E-D-IT23314238/
│   └── vulnerabilities.md                       <- 7 vulnerabilities identified by CROOS E D (IT23314238)
└── selected-7-vulnerabilities.md                <- 7 chosen vulnerabilities for implementation & fix
```

---

## 👥 Team Members & Contribution Matrix

| Name with Initials | IT Number | Folder | Assigned Focus Area | Vulnerabilities Documented | Status |
| :--- | :--- | :--- | :--- | :---: | :--- |
| **RAJAPAKSHA R W V C V** | **IT23152878** | [`RAJAPAKSHA-R-W-V-C-V-IT23152878/`](./RAJAPAKSHA-R-W-V-C-V-IT23152878/vulnerabilities.md) | Authentication, Session Management & JWT Security | 7 / 7 | In Progress |
| **KUMBUKAGE S S** | **IT23155534** | [`KUMBUKAGE-S-S-IT23155534/`](./KUMBUKAGE-S-S-IT23155534/vulnerabilities.md) | Access Control, Authorization, IDOR & API Security | 7 / 7 | In Progress |
| **EKANAYAKE E M N D** | **IT23283930** | [`EKANAYAKE-E-M-N-D-IT23283930/`](./EKANAYAKE-E-M-N-D-IT23283930/vulnerabilities.md) | Injection Flaws (NoSQL, XSS), Input Validation & Sanitization | 7 / 7 | In Progress |
| **CROOS E D** | **IT23314238** | [`CROOS-E-D-IT23314238/`](./CROOS-E-D-IT23314238/vulnerabilities.md) | Security Misconfigurations, Dependencies, Secrets & Headers | 7 / 7 | In Progress |

---

## 📋 Master Inventory (28 Vulnerabilities Candidate Pool)

> **Note:** Populate this table as members log findings in their respective markdown files.

| # | Vulnerability Name | OWASP Top 10 Category | Severity | Discovered By | Selected for Fix? |
|---|---|---|---|---|:---:|
| 1 | *Finding 1* | A07:2021 - Identification & Auth | High | RAJAPAKSHA R W V C V (IT23152878) | [ ] |
| 2 | *Finding 2* | | | RAJAPAKSHA R W V C V (IT23152878) | [ ] |
| 3 | *Finding 3* | | | RAJAPAKSHA R W V C V (IT23152878) | [ ] |
| 4 | *Finding 4* | | | RAJAPAKSHA R W V C V (IT23152878) | [ ] |
| 5 | *Finding 5* | | | RAJAPAKSHA R W V C V (IT23152878) | [ ] |
| 6 | *Finding 6* | | | RAJAPAKSHA R W V C V (IT23152878) | [ ] |
| 7 | *Finding 7* | | | RAJAPAKSHA R W V C V (IT23152878) | [ ] |
| 8 | *Finding 1* | A01:2021 - Broken Access Control | High | KUMBUKAGE S S (IT23155534) | [ ] |
| 9 | *Finding 2* | | | KUMBUKAGE S S (IT23155534) | [ ] |
| 10 | *Finding 3* | | | KUMBUKAGE S S (IT23155534) | [ ] |
| 11 | *Finding 4* | | | KUMBUKAGE S S (IT23155534) | [ ] |
| 12 | *Finding 5* | | | KUMBUKAGE S S (IT23155534) | [ ] |
| 13 | *Finding 6* | | | KUMBUKAGE S S (IT23155534) | [ ] |
| 14 | *Finding 7* | | | KUMBUKAGE S S (IT23155534) | [ ] |
| 15 | *Finding 1* | A03:2021 - Injection | High | EKANAYAKE E M N D (IT23283930) | [ ] |
| 16 | *Finding 2* | | | EKANAYAKE E M N D (IT23283930) | [ ] |
| 17 | *Finding 3* | | | EKANAYAKE E M N D (IT23283930) | [ ] |
| 18 | *Finding 4* | | | EKANAYAKE E M N D (IT23283930) | [ ] |
| 19 | *Finding 5* | | | EKANAYAKE E M N D (IT23283930) | [ ] |
| 20 | *Finding 6* | | | EKANAYAKE E M N D (IT23283930) | [ ] |
| 21 | *Finding 7* | | | EKANAYAKE E M N D (IT23283930) | [ ] |
| 22 | *Finding 1* | A05:2021 - Security Misconfiguration | Medium | CROOS E D (IT23314238) | [ ] |
| 23 | *Finding 2* | | | CROOS E D (IT23314238) | [ ] |
| 24 | *Finding 3* | | | CROOS E D (IT23314238) | [ ] |
| 25 | *Finding 4* | | | CROOS E D (IT23314238) | [ ] |
| 26 | *Finding 5* | | | CROOS E D (IT23314238) | [ ] |
| 27 | *Finding 6* | | | CROOS E D (IT23314238) | [ ] |
| 28 | *Finding 7* | | | CROOS E D (IT23314238) | [ ] |

---

## 🎯 Final 7 Selected Vulnerabilities for Remediation

See [selected-7-vulnerabilities.md](./selected-7-vulnerabilities.md) for full technical breakdown, proof-of-concept, source code before/after diffs, and remediation commits.

---

## 🖼️ Media & Evidence Guidelines
Place all scan reports, terminal outputs, and proof-of-concept screenshots into the [`media/`](./media) folder.  
Reference them in markdown as:
```markdown
![PoC Description](../media/filename.png)
```
