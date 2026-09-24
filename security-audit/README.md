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
├── vulnerabilities.md                 <- Master log of all discovered vulnerabilities with PoC & details
├── selected-7-vulnerabilities.md      <- 7 chosen vulnerabilities for code remediation & OAuth implementation
└── media/                             <- Proof-of-concept screenshots, tool scan reports, diagrams
    ├── .gitkeep
    └── README.md
```

---

## 🎯 Assignment Roadmap

- [ ] **Step 1: Vulnerability Discovery** – Identify distinct vulnerabilities across the application using SAST, DAST (OWASP ZAP), dependency checks, and code review (logged in [`vulnerabilities.md`](./vulnerabilities.md)).
- [ ] **Step 2: Select 7 Distinct Vulnerabilities** – Pick at least 7 distinct vulnerabilities across different OWASP Top 10 categories to fix (detailed in [`selected-7-vulnerabilities.md`](./selected-7-vulnerabilities.md)).
- [ ] **Step 3: Remediation & Git Commits** – Apply code-level fixes with detailed commit messages on this branch.
- [ ] **Step 4: OAuth 2.0 / OpenID Connect Implementation** – Integrate OAuth/OIDC for authentication/feature update.
- [ ] **Step 5: Final Report & Video Walkthrough** – Compile the PDF report and 20-minute presentation video.

---

## 🖼️ Media & Evidence Guidelines
Store all scan logs, screenshots, and visual PoCs inside the [`media/`](./media) folder.  
Link them directly in the markdown files using relative paths:
```markdown
![PoC Description](./media/screenshot-name.png)
```
