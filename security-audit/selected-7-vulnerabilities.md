# Selected 7 Distinct Vulnerabilities & Remediation Plan

**Course:** SE4030 – Secure Software Development  
**Project:** Digital Marketplace for Farmers and Sellers (Harvest Lanka)  
**Total Identified Pool:** 28 Vulnerabilities (7 per team member)  
**Selected for Remediation:** 7 Distinct Vulnerabilities  

---

## 🎯 Selection Rationale & Criteria

The 7 vulnerabilities below were selected from the 28 identified by the team based on:
1. **Diversity of Vulnerability Classes:** Spanning multiple distinct OWASP Top 10 categories (Authentication, Broken Access Control, Injection, Cryptographic Failures, Security Misconfiguration, Insecure Design).
2. **Business & Security Impact:** Addressing critical/high severity risks that directly endanger farmer & buyer financial data, bidding integrity, and platform access.
3. **Feasibility of Demonstration:** Clear before/after proofs of concept suitable for the viva and YouTube walkthrough video.

---

## 📊 Summary of Selected 7 Vulnerabilities

| # | Selected Vuln ID | Original ID | Vulnerability Title | OWASP Category | Severity | Responsible Member | Fix Status |
|---|---|---|---|---|---|---|:---:|
| 1 | `SEL-01` | `M1-Vxx` | [Title 1 - e.g. Broken Authentication / Insecure JWT] | A07:2021 | High | Member 1 | [ ] Pending |
| 2 | `SEL-02` | `M2-Vxx` | [Title 2 - e.g. IDOR on Bidding / Order Endpoints] | A01:2021 | Critical | Member 2 | [ ] Pending |
| 3 | `SEL-03` | `M3-Vxx` | [Title 3 - e.g. NoSQL Injection in Product Search / Login] | A03:2021 | Critical | Member 3 | [ ] Pending |
| 4 | `SEL-04` | `M3-Vxx` | [Title 4 - e.g. Stored XSS in Crop Reviews / Listings] | A03:2021 | High | Member 3 | [ ] Pending |
| 5 | `SEL-05` | `M4-Vxx` | [Title 5 - e.g. Sensitive Data Exposure / Hardcoded Secrets] | A02:2021 | High | Member 4 | [ ] Pending |
| 6 | `SEL-06` | `M4-Vxx` | [Title 6 - e.g. Missing Security Headers / CORS Wildcard] | A05:2021 | Medium | Member 4 | [ ] Pending |
| 7 | `SEL-07` | `M1-Vxx` | [Title 7 - e.g. Lack of Rate Limiting on Sensitive Auth Routes] | A04:2021 | Medium | Member 1 | [ ] Pending |

---

## 🛠️ Detailed Remediation Specifications

<!-- ===================================================================== -->
### Vulnerability 1: [SEL-01 Title]
- **Original Reference:** `Member X - Finding Y`
- **OWASP Category:** `...`
- **Affected File(s):** `...`
- **Git Commit Hash:** `[To be added after commit]`

#### Problem Statement & Vulnerable Code
```javascript
// BEFORE (Vulnerable Code Snippet)
```

#### Remediation Implemented
```javascript
// AFTER (Secured Code Snippet)
```

#### Verification & Proof of Fix
![Fix Evidence 1](./media/selected-v01-fix.png)

---

### Vulnerability 2: [SEL-02 Title]
- **Original Reference:** `Member X - Finding Y`
- **OWASP Category:** `...`
- **Affected File(s):** `...`
- **Git Commit Hash:** `[To be added after commit]`

#### Problem Statement & Vulnerable Code
```javascript
// BEFORE (Vulnerable Code Snippet)
```

#### Remediation Implemented
```javascript
// AFTER (Secured Code Snippet)
```

#### Verification & Proof of Fix
![Fix Evidence 2](./media/selected-v02-fix.png)

---

### Vulnerability 3: [SEL-03 Title]
- **Original Reference:** `...`
- **OWASP Category:** `...`
- **Affected File(s):** `...`
- **Git Commit Hash:** `...`

#### Problem Statement & Vulnerable Code
```javascript
// BEFORE
```

#### Remediation Implemented
```javascript
// AFTER
```

#### Verification & Proof of Fix
![Fix Evidence 3](./media/selected-v03-fix.png)

---

### Vulnerability 4: [SEL-04 Title]
- **Original Reference:** `...`
- **OWASP Category:** `...`
- **Affected File(s):** `...`
- **Git Commit Hash:** `...`

#### Problem Statement & Vulnerable Code
```javascript
// BEFORE
```

#### Remediation Implemented
```javascript
// AFTER
```

#### Verification & Proof of Fix
![Fix Evidence 4](./media/selected-v04-fix.png)

---

### Vulnerability 5: [SEL-05 Title]
- **Original Reference:** `...`
- **OWASP Category:** `...`
- **Affected File(s):** `...`
- **Git Commit Hash:** `...`

#### Problem Statement & Vulnerable Code
```javascript
// BEFORE
```

#### Remediation Implemented
```javascript
// AFTER
```

#### Verification & Proof of Fix
![Fix Evidence 5](./media/selected-v05-fix.png)

---

### Vulnerability 6: [SEL-06 Title]
- **Original Reference:** `...`
- **OWASP Category:** `...`
- **Affected File(s):** `...`
- **Git Commit Hash:** `...`

#### Problem Statement & Vulnerable Code
```javascript
// BEFORE
```

#### Remediation Implemented
```javascript
// AFTER
```

#### Verification & Proof of Fix
![Fix Evidence 6](./media/selected-v06-fix.png)

---

### Vulnerability 7: [SEL-07 Title]
- **Original Reference:** `...`
- **OWASP Category:** `...`
- **Affected File(s):** `...`
- **Git Commit Hash:** `...`

#### Problem Statement & Vulnerable Code
```javascript
// BEFORE
```

#### Remediation Implemented
```javascript
// AFTER
```

#### Verification & Proof of Fix
![Fix Evidence 7](./media/selected-v07-fix.png)

---

## 🔐 OAuth 2.0 / OpenID Connect Implementation Plan
- **Grant Type:** Authorization Code Flow with PKCE (or OpenID Connect)
- **Identity Provider (IdP):** Google OAuth 2.0 / Firebase Auth / WSO2 IS
- **Integration Target:** Single Sign-On (SSO) for Farmer / Buyer Login & Secure Profile Retrieval
- **Architecture Diagram:**
```text
[ Browser / Client ] ---> (1) Redirect to Google OAuth Consent Screen
[ Browser / Client ] <--- (2) Authorization Code returned via Callback
[ Backend Server   ] <--- (3) Exchange Code for ID & Access Token
[ Backend Server   ] ---> (4) Validate Token & Issue Application JWT Session
```
