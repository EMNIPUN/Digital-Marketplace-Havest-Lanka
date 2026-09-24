# Member 4 - Vulnerability Assessment Report
**Auditor / Member Name:** [Member 4 Name]  
**Student ID:** [ITxxxxxx]  
**Assigned Focus Area:** Security Misconfiguration, Insecure Dependencies, Sensitive Data Exposure & Headers  

---

## Summary of Findings (7 Vulnerabilities)

| Vuln ID | Title | OWASP Category | Severity | Detection Tool |
|---|---|---|---|---|
| `M4-V01` | *[Vulnerability Title 1]* | A05:2021 - Security Misconfiguration | Medium | ZAP / Code Review |
| `M4-V02` | *[Vulnerability Title 2]* | A06:2021 - Vulnerable & Outdated Components | High | npm audit / OWASP Dep-Check |
| `M4-V03` | *[Vulnerability Title 3]* | A02:2021 - Cryptographic Failures / Secret Exposure | Critical | GitLeaks / Grep |
| `M4-V04` | *[Vulnerability Title 4]* | A05:2021 - Security Misconfiguration | Medium | ZAP / Curl |
| `M4-V05` | *[Vulnerability Title 5]* | A09:2021 - Security Logging & Monitoring Failures | Low/Med | Code Review |
| `M4-V06` | *[Vulnerability Title 6]* | A05:2021 - Security Misconfiguration | Medium | ZAP / Browser DevTools |
| `M4-V07` | *[Vulnerability Title 7]* | A06:2021 - Vulnerable Components | High | npm audit |

---

## Detailed Vulnerability Reports

<!-- ===================================================================== -->
### Vulnerability M4-V01: [Title]
- **OWASP Category:** A05:2021 – Security Misconfiguration
- **Severity:** High / Critical / Medium / Low (CVSS v3: X.X)
- **Detection Method:** [e.g., OWASP ZAP / npm audit / Code Review]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Detailed description of what the vulnerability is and why it exists in the codebase.]

#### 2. Proof of Concept (PoC) & Exploitation Steps
1. Execute tool scan or trigger endpoint.
2. Observe sensitive header absence, exposed stack traces, or vulnerable dependencies.

![M4-V01 PoC Evidence](../media/m4-v01-poc.png)

#### 3. Impact Assessment
- **Confidentiality:** [High / Medium / Low]
- **Integrity:** [High / Medium / Low]
- **Availability:** [High / Medium / Low]
- **Business Impact:** [Describe potential business risk]

#### 4. Recommended Remediation
[Provide code logic or architectural steps to fix this vulnerability.]

---

<!-- ===================================================================== -->
### Vulnerability M4-V02: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M4-V02 PoC Evidence](../media/m4-v02-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M4-V03: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M4-V03 PoC Evidence](../media/m4-v03-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M4-V04: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M4-V04 PoC Evidence](../media/m4-v04-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M4-V05: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M4-V05 PoC Evidence](../media/m4-v05-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M4-V06: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M4-V06 PoC Evidence](../media/m4-v06-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M4-V07: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M4-V07 PoC Evidence](../media/m4-v07-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]
