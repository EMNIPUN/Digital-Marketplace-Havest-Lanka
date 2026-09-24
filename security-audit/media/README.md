# Media & Evidence Assets

This folder contains all visual evidence, screenshots, tool export reports, and architecture diagrams linked within the security markdown reports.

### File Naming Convention:
To keep everything organized and easy to track across group members, please follow this naming pattern:

* **Member 1 Findings:** `m1-v01-poc.png`, `m1-v02-poc.png`, ...
* **Member 2 Findings:** `m2-v01-poc.png`, `m2-v02-poc.png`, ...
* **Member 3 Findings:** `m3-v01-poc.png`, `m3-v02-poc.png`, ...
* **Member 4 Findings:** `m4-v01-poc.png`, `m4-v02-poc.png`, ...
* **Selected 7 Fixes (Before vs After):** `selected-v01-fix.png`, `selected-v02-fix.png`, ...
* **OAuth Architecture / Sequence:** `oauth-flow-diagram.png`, `oauth-login-demo.png`
* **Automated Scan Reports:** `zap-scan-summary.png`, `npm-audit-report.png`

### Linking in Markdown:
From `member-X/vulnerabilities.md`:
```markdown
![M1-V01 Proof of Concept](../media/m1-v01-poc.png)
```

From `selected-7-vulnerabilities.md` or `README.md`:
```markdown
![Architecture Diagram](./media/oauth-flow-diagram.png)
```
