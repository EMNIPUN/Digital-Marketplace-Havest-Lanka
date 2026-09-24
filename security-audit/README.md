# Security Audit & Remediation Dashboard
**Course:** SE4030 – Secure Software Development  
**Project:** Digital Marketplace for Farmers and Sellers (Harvest Lanka)  
**Branch:** `security-audit-remediation`

---

## 📌 Overview

This directory contains the complete security assessment documentation for the group assignment. 
Each of the 4 team members discovers and documents **7 distinct vulnerabilities** (total: **28 vulnerabilities**), from which **7 primary vulnerabilities** are selected for full code remediation and demonstration.

---

## 📁 Directory Structure

```text
security-audit/
├── README.md                          <- Main audit overview and consolidated tracking table
├── media/                             <- Proof-of-concept screenshots, tool scan reports, diagrams
├── member-1/
│   └── vulnerabilities.md             <- 7 vulnerabilities identified by Member 1
├── member-2/
│   └── vulnerabilities.md             <- 7 vulnerabilities identified by Member 2
├── member-3/
│   └── vulnerabilities.md             <- 7 vulnerabilities identified by Member 3
├── member-4/
│   └── vulnerabilities.md             <- 7 vulnerabilities identified by Member 4
└── selected-7-vulnerabilities.md      <- 7 chosen vulnerabilities for implementation & fix
```

---

## 👥 Team Members & Contribution Matrix

| Member | Name | Student ID | Focus Area / Module | Vulnerabilities Documented | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Member 1** | [Member 1 Name] | [ITxxxxxx] | Authentication, JWT, Session Management | 7 / 7 | Pending Review |
| **Member 2** | [Member 2 Name] | [ITxxxxxx] | API Endpoints, Authorization & Access Control (IDOR) | 7 / 7 | Pending Review |
| **Member 3** | [Member 3 Name] | [ITxxxxxx] | Injection (NoSQL, XSS) & Input Validation | 7 / 7 | Pending Review |
| **Member 4** | [Member 4 Name] | [ITxxxxxx] | Security Misconfigurations, Headers, Secrets & Dependencies | 7 / 7 | Pending Review |

---

## 📋 Master Inventory (28 Vulnerabilities Candidate Pool)

> **Note:** Populate this table as members log findings in their respective markdown files.

| # | Vulnerability Name | OWASP Top 10 Category | Severity | Discovered By | Selected for Fix? |
|---|---|---|---|---|:---:|
| 1 | *Member 1 - Finding 1* | A01/A02/... | High/Med/Low | Member 1 | [ ] |
| 2 | *Member 1 - Finding 2* | | | Member 1 | [ ] |
| 3 | *Member 1 - Finding 3* | | | Member 1 | [ ] |
| 4 | *Member 1 - Finding 4* | | | Member 1 | [ ] |
| 5 | *Member 1 - Finding 5* | | | Member 1 | [ ] |
| 6 | *Member 1 - Finding 6* | | | Member 1 | [ ] |
| 7 | *Member 1 - Finding 7* | | | Member 1 | [ ] |
| 8 | *Member 2 - Finding 1* | | | Member 2 | [ ] |
| 9 | *Member 2 - Finding 2* | | | Member 2 | [ ] |
| 10 | *Member 2 - Finding 3* | | | Member 2 | [ ] |
| 11 | *Member 2 - Finding 4* | | | Member 2 | [ ] |
| 12 | *Member 2 - Finding 5* | | | Member 2 | [ ] |
| 13 | *Member 2 - Finding 6* | | | Member 2 | [ ] |
| 14 | *Member 2 - Finding 7* | | | Member 2 | [ ] |
| 15 | *Member 3 - Finding 1* | | | Member 3 | [ ] |
| 16 | *Member 3 - Finding 2* | | | Member 3 | [ ] |
| 17 | *Member 3 - Finding 3* | | | Member 3 | [ ] |
| 18 | *Member 3 - Finding 4* | | | Member 3 | [ ] |
| 19 | *Member 3 - Finding 5* | | | Member 3 | [ ] |
| 20 | *Member 3 - Finding 6* | | | Member 3 | [ ] |
| 21 | *Member 3 - Finding 7* | | | Member 3 | [ ] |
| 22 | *Member 4 - Finding 1* | | | Member 4 | [ ] |
| 23 | *Member 4 - Finding 2* | | | Member 4 | [ ] |
| 24 | *Member 4 - Finding 3* | | | Member 4 | [ ] |
| 25 | *Member 4 - Finding 4* | | | Member 4 | [ ] |
| 26 | *Member 4 - Finding 5* | | | Member 4 | [ ] |
| 27 | *Member 4 - Finding 6* | | | Member 4 | [ ] |
| 28 | *Member 4 - Finding 7* | | | Member 4 | [ ] |

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
