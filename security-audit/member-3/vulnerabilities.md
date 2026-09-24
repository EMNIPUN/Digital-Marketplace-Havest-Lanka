# Member 3 - Vulnerability Assessment Report
**Auditor / Member Name:** [Member 3 Name]  
**Student ID:** [ITxxxxxx]  
**Assigned Focus Area:** Injection Flaws (NoSQL, XSS), Input Validation & Sanitization  

---

## Summary of Findings (7 Vulnerabilities)

| Vuln ID | Title | OWASP Category | Severity | Detection Tool |
|---|---|---|---|---|
| `M3-V01` | *[Vulnerability Title 1]* | A03:2021 - Injection | High | ZAP / Manual |
| `M3-V02` | *[Vulnerability Title 2]* | A03:2021 - Injection | High | Code Review |
| `M3-V03` | *[Vulnerability Title 3]* | A03:2021 - Injection | Medium | Postman |
| `M3-V04` | *[Vulnerability Title 4]* | A03:2021 - Injection | High | Code Review |
| `M3-V05` | *[Vulnerability Title 5]* | A08:2021 - Software & Data Integrity Failures | Medium | Code Review |
| `M3-V06` | *[Vulnerability Title 6]* | A03:2021 - Injection | Medium | ZAP / Manual |
| `M3-V07` | *[Vulnerability Title 7]* | A03:2021 - Injection | High | Manual / ZAP |

---

## Detailed Vulnerability Reports

<!-- ===================================================================== -->
### Vulnerability M3-V01: [Title]
- **OWASP Category:** A03:2021 – Injection (e.g. NoSQL Injection / Stored XSS)
- **Severity:** High / Critical / Medium / Low (CVSS v3: X.X)
- **Detection Method:** [e.g., OWASP ZAP / Postman / Code Review]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Detailed description of what the vulnerability is and why it exists in the codebase.]

#### 2. Proof of Concept (PoC) & Exploitation Steps
1. Submit crafted payload (e.g. `{"$ne": null}` or `<script>...`).
2. Observe unescaped execution or authentication bypass.

![M3-V01 PoC Evidence](../media/m3-v01-poc.png)

#### 3. Impact Assessment
- **Confidentiality:** [High / Medium / Low]
- **Integrity:** [High / Medium / Low]
- **Availability:** [High / Medium / Low]
- **Business Impact:** [Describe potential business risk]

#### 4. Recommended Remediation
[Provide code logic or architectural steps to fix this vulnerability.]

---

<!-- ===================================================================== -->
### Vulnerability M3-V02: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M3-V02 PoC Evidence](../media/m3-v02-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M3-V03: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M3-V03 PoC Evidence](../media/m3-v03-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M3-V04: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M3-V04 PoC Evidence](../media/m3-v04-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M3-V05: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M3-V05 PoC Evidence](../media/m3-v05-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M3-V06: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M3-V06 PoC Evidence](../media/m3-v06-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]

---

<!-- ===================================================================== -->
### Vulnerability M3-V07: [Title]
- **OWASP Category:** [Category]
- **Severity:** [Severity]
- **Detection Method:** [Tool / Technique]
- **Affected File / Endpoint:** `...`

#### 1. Vulnerability Description
[Description]

#### 2. Proof of Concept (PoC) & Evidence
![M3-V07 PoC Evidence](../media/m3-v07-poc.png)

#### 3. Impact Assessment
[Impact details]

#### 4. Recommended Remediation
[Remediation details]
