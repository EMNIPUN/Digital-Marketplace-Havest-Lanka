# Comprehensive Vulnerability Assessment Log

**Project:** Digital Marketplace for Farmers and Sellers (Harvest Lanka)  
**Course:** SE4030 – Secure Software Development  
**Branch:** `security-audit-remediation`  
**Assessment Methodologies Employed:**
- **SCA (Software Composition Analysis):** Automated dependency auditing (`npm audit`)
- **Secret Scanning:** Git commit history analysis & configuration auditing
- **Static Application Security Testing (SAST) & Manual Code Review:** Architectural data flow tracing, route authorization auditing, and OWASP Top 10 mapping

---

## 📋 Comprehensive Vulnerability Master Index

| Vuln ID | Vulnerability Title | OWASP Top 10 (2021) Category | Severity (CVSS v3) | Detection Method | Affected File / Endpoint |
|---|---|---|---|---|---|
| `VULN-01` | **Critical Password Reset Bypass (Promise Truthiness Bug)** | A07: Identification & Auth Failures | **Critical (9.8)** | Static Code Review | `UserData.js:153` (`POST /user/reset-password`) |
| `VULN-02` | **Missing JWT Verification in Session Validation** | A07: Identification & Auth Failures | **Critical (9.1)** | Static Code Review | `CheckAuth.js:4-10` (`GET /check-auth`) |
| `VULN-03` | **Unauthenticated Administrative Data Exfiltration** | A01: Broken Access Control | **Critical (9.1)** | Architectural Route Audit | `adminRoutes.js:33` (`GET /api/admin/getallaccounts`) |
| `VULN-04` | **Unauthenticated Arbitrary Account Deactivation** | A01: Broken Access Control | **High (8.6)** | Route & Logic Audit | `DeactivateAccount.js` (`POST /api/admin/deactivate`) |
| `VULN-05` | **IDOR & Unauthenticated Deletion on User Accounts** | A01: Broken Access Control | **High (8.5)** | Static Code Review | `UserData.js:80` (`DELETE /user/del`) |
| `VULN-06` | **IDOR & Unauthenticated CRUD on Bid Posts** | A01: Broken Access Control | **High (8.5)** | Architectural Route Audit | `BidPost.controller.js` (`DELETE/PUT /api/BidPost/:id`) |
| `VULN-07` | **Privilege Escalation via Mass Assignment (Register as Admin)** | A01: Broken Access Control | **High (8.5)** | Static Code Review | `UserRegistration.js:18,48` (`POST /user/register`) |
| `VULN-08` | **Unrestricted File Upload & Remote Stored XSS** | A04: Insecure Design | **High (8.2)** | Static Code Review | `UserRegistration.js:7-14`, `UserData.js:41-48` |
| `VULN-09` | **Hardcoded Secrets Leaked in Git History (Gmail App Password)** | A02: Cryptographic Failures | **High (7.5)** | Git History Scan | Commit `1ee655b` in `Mail.js` |
| `VULN-10` | **Sensitive Data Exposure: Password Hash Leakage in API Responses** | A02: Cryptographic Failures | **High (7.5)** | Data Flow Analysis | `UserRegistration.js:54`, `UserData.js:71` |
| `VULN-11` | **Unverified Payment Webhook (Payment Forgery)** | A08: Software & Data Integrity Failures | **High (7.5)** | Logic Review | `payment.controller.js:5-18` (`POST /api/notify`) |
| `VULN-12` | **Known Critical & High Vulnerabilities in Third-Party Packages** | A06: Vulnerable & Outdated Components | **Critical / High** | SCA (`npm audit`) | `Backend/package.json`, `frontend/package.json` |
| `VULN-13` | **Insecure Session Cookie Configuration (Missing HttpOnly & Secure Flags)** | A05: Security Misconfiguration | **Medium (6.5)** | Code Review | `Login.js:30-34` (`POST /login`) |
| `VULN-14` | **Weak Cryptographic PRNG in OTP Generation (`Math.random`)** | A02: Cryptographic Failures | **Medium (5.3)** | Static Code Review | `ValidateMail.js:77` (`POST /user/otp/send`) |
| `VULN-15` | **Regular Expression Denial of Service (ReDoS) via Unsanitized Regex** | A03: Injection | **Medium (5.3)** | Static Code Review | `payment.controller.js:78`, `UserData.js:114` |
| `VULN-16` | **Missing HTTP Security Headers & Global Rate Limiting** | A05: Security Misconfiguration | **Medium (5.3)** | Architecture Review | `index.js:1-76` |

---

## 🔎 Detailed Vulnerability Records

<!-- ===================================================================== -->
### Vulnerability VULN-01: Critical Password Reset Bypass via Promise Truthiness
- **OWASP Category:** A07:2021 – Identification and Authentication Failures
- **Severity Level:** Critical (CVSS v3.1: 9.8 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H`)
- **Detection Method:** Manual Source Code Review & Static Analysis
- **Affected File & Endpoint:** `Backend/src/controllers/userManagement/UserData.js` (lines 135–167) | `POST /user/reset-password`

#### 1. Description & Root Cause
In `UserData.js`, `IsOTPValidated` is declared as an `async` function. In JavaScript, invoking an `async` function without the `await` keyword returns an unresolved `Promise` object. Because objects in JavaScript are always truthy (`Boolean(new Promise(...)) === true`), the condition:
```javascript
if (IsOTPValidated(email)) { ... }
```
evaluates to `true` unconditionally, regardless of whether any OTP was ever generated or validated.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. An attacker sends a `POST` request to `/user/reset-password` containing:
   ```json
   {
     "email": "target_user@harvestlanka.com",
     "password": "AttackerControlledPassword123!"
   }
   ```
2. The server executes `if (IsOTPValidated(email))`, which evaluates to `true`.
3. The password hash in MongoDB is overwritten immediately, resulting in complete account takeover without OTP verification.

#### 3. Security Impact
- **Confidentiality:** High
- **Integrity:** High
- **Availability:** High
- **Impact Summary:** Complete account takeover of any user (farmers, shop owners, administrators) without credential knowledge or email access.

#### 4. Remediation Strategy
1. Await the function result: `const isValid = await IsOTPValidated(email);`.
2. Delete or invalidate the OTP record immediately upon consumption (one-time use).

---

<!-- ===================================================================== -->
### Vulnerability VULN-02: Missing JWT Verification in Session Validation
- **OWASP Category:** A07:2021 – Identification and Authentication Failures
- **Severity Level:** Critical (CVSS v3.1: 9.1 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`)
- **Detection Method:** Static Code Review
- **Affected File & Endpoint:** `Backend/src/controllers/userManagement/CheckAuth.js` (lines 3–11) | `GET /check-auth`

#### 1. Description & Root Cause
The `CheckAuth` controller is responsible for informing the frontend whether a user's session is valid. The code only checks if the cookie string exists:
```javascript
const token = req.cookies.token;
if (!token) return res.status(401).json({ loggedIn: false });
return res.status(200).json({ loggedIn: true });
```
It **never** calls `jwt.verify(token, process.env.JWT_SECRET)`. Anyone who supplies any random string in the `token` cookie is treated as authenticated.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. In a web browser with cookies set to `token=fake-token-value`, navigate to protected frontend routes.
2. `GET /check-auth` returns `{ "loggedIn": true }`.
3. The frontend router grants access through the `CheckAuth` guard.

#### 3. Security Impact
- **Confidentiality:** High
- **Integrity:** Medium
- **Availability:** Low
- **Impact Summary:** Complete bypass of frontend session verification.

#### 4. Remediation Strategy
Verify the token cryptographically on the server using `jwt.verify(token, process.env.JWT_SECRET)` and return the decoded user identity.

---

<!-- ===================================================================== -->
### Vulnerability VULN-03: Unauthenticated Administrative Data Exfiltration
- **OWASP Category:** A01:2021 – Broken Access Control
- **Severity Level:** Critical (CVSS v3.1: 9.1 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`)
- **Detection Method:** Architectural Route Audit
- **Affected File & Endpoint:** `Backend/src/routes/userManagement/adminRoutes.js` (line 33) & `GetAllAccounts.js` | `GET /api/admin/getallaccounts`

#### 1. Description & Root Cause
The route `/api/admin/getallaccounts` queries the database for all user records via `User.find()` and returns the entire array in JSON format. The route has **zero authentication or role-checking middleware**.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. An unauthenticated attacker sends a `GET` request to:
   `http://localhost:8005/api/admin/getallaccounts`
2. The server responds with `200 OK` containing all registered users, their full names, email addresses, phone numbers, NIC numbers, roles, and bcrypt password hashes.

#### 3. Security Impact
- **Confidentiality:** High
- **Integrity:** None
- **Availability:** None
- **Impact Summary:** Total data breach of all user credentials, personally identifiable information (PII), and national identity card (NIC) numbers.

#### 4. Remediation Strategy
Enforce strict authentication and role-based access control middleware (`verifyToken` + `requireAdmin`) on all `/api/admin/*` routes.

---

<!-- ===================================================================== -->
### Vulnerability VULN-04: Unauthenticated Arbitrary Account Deactivation
- **OWASP Category:** A01:2021 – Broken Access Control
- **Severity Level:** High (CVSS v3.1: 8.6 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:H`)
- **Detection Method:** Route & Logic Audit
- **Affected File & Endpoint:** `Backend/src/routes/userManagement/adminRoutes.js` (line 36) & `DeactivateAccount.js` | `POST /api/admin/deactivate`

#### 1. Description & Root Cause
`POST /api/admin/deactivate` takes an array of `userIds` from `req.body` and sets `user.status = false`, preventing affected users from logging in. The endpoint lacks any authentication or admin role verification.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. Send a POST request to `/api/admin/deactivate` with body:
   ```json
   { "userIds": ["6614a9...", "6614b1..."] }
   ```
2. The server deactivates all targeted accounts immediately.

#### 3. Security Impact
- **Integrity:** High
- **Availability:** High
- **Impact Summary:** Denial of service across the entire platform by locking out legitimate users and administrators.

#### 4. Remediation Strategy
Protect the endpoint with admin-only middleware and log all account status changes in an immutable audit log.

---

<!-- ===================================================================== -->
### Vulnerability VULN-05: IDOR & Unauthenticated Deletion on User Accounts
- **OWASP Category:** A01:2021 – Broken Access Control
- **Severity Level:** High (CVSS v3.1: 8.5 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:H`)
- **Detection Method:** Static Code Review
- **Affected File & Endpoint:** `Backend/src/controllers/userManagement/UserData.js` (lines 80–98) | `DELETE /user/del`

#### 1. Description & Root Cause
In `DeleteUserById`, the application reads `userId` from `req.body` and executes `User.findByIdAndDelete(userId)`. There is no token validation, no session extraction, and no authorization check.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. An attacker sends a `DELETE` request to `/user/del` with:
   ```json
   { "userId": "<victim_user_id>" }
   ```
2. The victim's user account is permanently deleted from MongoDB.

#### 3. Security Impact
- **Integrity:** High
- **Availability:** High
- **Impact Summary:** Permanent loss of user accounts and associated records.

#### 4. Remediation Strategy
Derive the user ID solely from a validated JWT session token (`req.user.id`) rather than accepting untrusted IDs from request parameters or bodies.

---

<!-- ===================================================================== -->
### Vulnerability VULN-06: IDOR & Unauthenticated CRUD on Bid Posts
- **OWASP Category:** A01:2021 – Broken Access Control
- **Severity Level:** High (CVSS v3.1: 8.5 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:H/A:H`)
- **Detection Method:** Architectural Route Audit
- **Affected File & Endpoint:** `Backend/src/routes/farmerManagement/BidPost.routes.js` | `DELETE/PUT /api/BidPost/:bitpostId`

#### 1. Description & Root Cause
In `BidPost.routes.js`, `updateBitPost` and `deleteBitPost` allow direct modification and deletion of any farmer's produce bid post. No authentication middleware is mounted, and the controller does not verify that the requester is the owner of the bid post.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. Send `DELETE /api/BidPost/663c1a...` without any authorization headers or cookies.
2. The bid post is deleted from MongoDB.

#### 3. Security Impact
- **Integrity:** High
- **Availability:** High
- **Impact Summary:** Tampering with marketplace prices, deleting competitors' bids, and marketplace disruption.

#### 4. Remediation Strategy
Mount authentication middleware and verify that `bidPost.farmerId.toString() === req.user.id` before executing updates or deletes.

---

<!-- ===================================================================== -->
### Vulnerability VULN-07: Privilege Escalation via Mass Assignment
- **OWASP Category:** A01:2021 – Broken Access Control
- **Severity Level:** High (CVSS v3.1: 8.5 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N`)
- **Detection Method:** Static Code Review
- **Affected File & Endpoint:** `Backend/src/controllers/userManagement/UserRegistration.js` (lines 18, 48) | `POST /user/register`

#### 1. Description & Root Cause
In `registerUser`:
```javascript
let { email, name, number, password, NIC, role = "farmer", status } = req.body;
...
const newUser = new User({ email, name, number, password: hashedPassword, role, displayPicture, status, NIC });
```
The application accepts `role` directly from untrusted client input.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. Submit a registration request with:
   ```json
   {
     "email": "hacker@test.com",
     "password": "Password123!",
     "name": "Attacker",
     "number": "+94771234567",
     "role": "admin"
   }
   ```
2. The user is saved to MongoDB with `role: "admin"`.

#### 3. Security Impact
- **Confidentiality:** High
- **Integrity:** High
- **Impact Summary:** Immediate elevation of privilege to platform administrator.

#### 4. Remediation Strategy
Hardcode the default role to `"farmer"` or `"shopOwner"` during public registration; administrative accounts must only be provisioned by existing administrators.

---

<!-- ===================================================================== -->
### Vulnerability VULN-08: Unrestricted File Upload & Remote Stored XSS
- **OWASP Category:** A04:2021 – Insecure Design / Arbitrary File Upload
- **Severity Level:** High (CVSS v3.1: 8.2 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:H/I:L/A:L`)
- **Detection Method:** Static Code Review
- **Affected File & Endpoint:** `UserRegistration.js:7–14`, `UserData.js:41–48` | `POST /user/register` & `PUT /user/update`

#### 1. Description & Root Cause
Multer is configured using `multer.diskStorage` without a `fileFilter`, without MIME type validation, and without `limits.fileSize`. The server saves files directly into `./uploads/` with original extensions, and `index.js` serves `./uploads/` statically.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. Upload an HTML file or SVG containing `<script>alert(document.cookie)</script>` as the `displayPicture` field.
2. The file is saved to `/uploads/<timestamp>.html`.
3. Visiting `http://localhost:8005/uploads/<timestamp>.html` executes arbitrary JavaScript in the victim's browser session.

#### 3. Security Impact
- **Confidentiality:** High
- **Integrity:** Medium
- **Impact Summary:** Cross-Site Scripting (XSS), session hijacking, and storage exhaustion DoS.

#### 4. Remediation Strategy
Validate file extensions (allowlist: `.jpg`, `.jpeg`, `.png`), enforce strict MIME type checking (`image/jpeg`, `image/png`), set a maximum file size limit (e.g., 2MB), and serve user uploads with `Content-Disposition: attachment` or from an isolated domain/bucket.

---

<!-- ===================================================================== -->
### Vulnerability VULN-09: Hardcoded Secrets Leaked in Git History
- **OWASP Category:** A02:2021 – Cryptographic Failures
- **Severity Level:** High (CVSS v3.1: 7.5 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`)
- **Detection Method:** Git History Audit (`git log -S "SMTP_PASS" -p`)
- **Affected File & Commit:** Commit `1ee655bce93071d89dfb0f60ee1acead2a60a926` in `Backend/src/controllers/userManagement/smtp/Mail.js`

#### 1. Description & Root Cause
In commit `1ee655b`, the Gmail App Password `pass: 'xcbr yhvi bbdf uben'` was committed directly to source control for account `harvestlanka904@gmail.com`. Even though later committed to read from `process.env.SMTP_PASS`, the secret remains visible in the repository's git tree.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. Run `git log -p -S "xcbr"` on the repository.
2. The application password for the official organizational email is exposed in cleartext.

#### 3. Security Impact
- **Confidentiality:** High
- **Impact Summary:** Compromise of organizational email service, enabling attackers to send fraudulent emails, phishing, or OTP interception.

#### 4. Remediation Strategy
Revoke the exposed Google App Password immediately in Google Account Security settings. Purge the secret from git history using `git-filter-repo` or BFG Repo-Cleaner.

---

<!-- ===================================================================== -->
### Vulnerability VULN-10: Password Hash Exposure in API Responses
- **OWASP Category:** A02:2021 – Cryptographic Failures / Sensitive Data Exposure
- **Severity Level:** High (CVSS v3.1: 7.5 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N`)
- **Detection Method:** Data Flow Analysis
- **Affected File & Endpoint:** `UserRegistration.js:54`, `UserData.js:71` | `POST /user/register` & `PUT /user/update`

#### 1. Description & Root Cause
When registering or updating a user, the entire Mongoose document is serialized and returned:
```javascript
res.status(201).json({ message: "User registered successfully", user: newUser });
```
This payload includes the `password` field containing the bcrypt hash.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. Register a user or update user profile.
2. Inspect the HTTP response body: the bcrypt hash is returned to the client.

#### 3. Security Impact
- **Confidentiality:** High
- **Impact Summary:** Attackers can perform offline dictionary/rainbow table attacks against the leaked hashes.

#### 4. Remediation Strategy
Use Mongoose `select: false` on the password schema field or sanitize the returned object using `user.toObject()` and `delete userObj.password`.

---

<!-- ===================================================================== -->
### Vulnerability VULN-11: Unverified Payment Webhook (Payment Forgery)
- **OWASP Category:** A08:2021 – Software and Data Integrity Failures
- **Severity Level:** High (CVSS v3.1: 7.5 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N`)
- **Detection Method:** Static Logic Review
- **Affected File & Endpoint:** `Backend/src/controllers/financeManagement/payment.controller.js` (lines 5–18) | `POST /api/notify`

#### 1. Description & Root Cause
`notifyPayment` accepts arbitrary payment data from `req.body` and saves it as a valid payment in MongoDB without validating HMAC checksum signatures or merchant secrets.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. Send a POST request to `/api/notify` with fake order IDs, arbitrary high payment amounts, and `"status_code": 2`.
2. The payment is recorded as completed in the database.

#### 3. Security Impact
- **Integrity:** High
- **Impact Summary:** Financial fraud, order fulfillment without actual monetary transfer.

#### 4. Remediation Strategy
Implement cryptographic HMAC signature verification (e.g., PayHere MD5/SHA256 signature hash check) to verify authenticity.

---

<!-- ===================================================================== -->
### Vulnerability VULN-12: Known Critical & High Vulnerabilities in Third-Party Packages
- **OWASP Category:** A06:2021 – Vulnerable and Outdated Components
- **Severity Level:** Critical / High
- **Detection Method:** Software Composition Analysis (`npm audit --registry=https://registry.npmjs.org/`)
- **Affected Packages:** `Backend/package.json` (29 vulnerabilities: 2 critical, 21 high) & `frontend/package.json` (31 vulnerabilities: 3 critical, 19 high)

#### 1. Description & Root Cause
- **Backend:**
  - `tar <=7.5.20` (**Critical**, GHSA-34x7-hfp2-rc4v): Arbitrary File Creation/Overwrite via Hardlink Path Traversal through `node-pre-gyp` / `bcrypt`.
  - `systeminformation <=5.31.6` (**High**, GHSA-wphj-fx3q-84ch): Command Injection vulnerability in `fsSize()` on Windows.
  - `nodemailer <=9.1.0` (**High**, GHSA-c7w3-x93f-qmm8): SMTP command injection & arbitrary file read.
- **Frontend:**
  - `swiper 6.5.1–12.1.1` (**Critical**, GHSA-hmx5-qpq5-p643): Prototype pollution.
  - `react-router <=7.17.0` (**High**, GHSA-49rj-9fvp-4h2h): Arbitrary constructor invocation leading to unauthenticated RCE via `turbo-stream`.

#### 2. Security Impact
- **Confidentiality:** High
- **Integrity:** High
- **Availability:** High
- **Impact Summary:** Potential remote code execution and prototype pollution across client and server environments.

#### 3. Remediation Strategy
Upgrade vulnerable dependencies via `npm audit fix` and replace abandoned/vulnerable packages with safe versions.

---

<!-- ===================================================================== -->
### Vulnerability VULN-13: Insecure Cookie Flags (Missing HttpOnly & Secure)
- **OWASP Category:** A05:2021 – Security Misconfiguration
- **Severity Level:** Medium (CVSS v3.1: 6.5 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N`)
- **Detection Method:** Static Code Review
- **Affected File & Endpoint:** `Backend/src/controllers/userManagement/Login.js` (lines 30–34) | `POST /login`

#### 1. Description & Root Cause
In `Login.js`:
```javascript
res.cookie("token", token, {
    secure: false,
    sameSite: "Strict",
    maxAge: 60 * 60 * 24 * 1000
});
```
The cookie is set with `secure: false` and omits `httpOnly: true`.

#### 2. Proof of Concept (PoC) & Steps to Reproduce
1. In the browser console, executing `document.cookie` reveals the authentication JWT token. Any client-side XSS vulnerability can steal the token.

#### 3. Security Impact
- **Confidentiality:** High
- **Impact Summary:** Token theft and persistent session hijacking via Cross-Site Scripting.

#### 4. Remediation Strategy
Enforce `httpOnly: true`, `secure: process.env.NODE_ENV === "production"`, and `sameSite: "Strict"`.

---

<!-- ===================================================================== -->
### Vulnerability VULN-14: Weak Cryptographic PRNG in OTP Generation (`Math.random`)
- **OWASP Category:** A02:2021 – Cryptographic Failures
- **Severity Level:** Medium (CVSS v3.1: 5.3 - `CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N`)
- **Detection Method:** Static Code Review
- **Affected File & Endpoint:** `Backend/src/controllers/userManagement/ValidateMail.js` (line 77)

#### 1. Description & Root Cause
In `generateOTP`:
```javascript
const otp = Math.floor(100000 + Math.random() * 900000).toString();
```
`Math.random()` is not cryptographically secure and uses the predictable XorShift128+ algorithm in Node.js V8. Furthermore, `validateOTP` has no attempt rate limiting, allowing brute-force attempts on 6-digit codes.

#### 2. Security Impact
- **Confidentiality:** High
- **Integrity:** High
- **Impact Summary:** Predictable OTP tokens allowing password reset interception.

#### 4. Remediation Strategy
Use Node.js crypto module: `crypto.randomInt(100000, 999999).toString()`, and limit invalid OTP attempts to a maximum of 3 before invalidation.

---

<!-- ===================================================================== -->
### Vulnerability VULN-15: Regular Expression Denial of Service (ReDoS)
- **OWASP Category:** A03:2021 – Injection
- **Severity Level:** Medium (CVSS v3.1: 5.3 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H`)
- **Detection Method:** Static Code Review
- **Affected File & Endpoint:** `payment.controller.js:78`, `UserData.js:114` | `GET /api/prices/:name`, `GET /user/q?search=...`

#### 1. Description & Root Cause
User input is passed directly to `new RegExp(userInput, 'i')` without escaping regex meta-characters. Attackers can supply catastrophic backtracking patterns or syntax errors that cause unhandled exceptions or event loop stalls.

#### 2. Security Impact
- **Availability:** High
- **Impact Summary:** Denial of service via event loop blocking.

#### 4. Remediation Strategy
Sanitize regex inputs using an escape function (e.g., `lodash.escapeRegExp` or custom escape regex) before instantiation.

---

<!-- ===================================================================== -->
### Vulnerability VULN-16: Missing HTTP Security Headers & Absence of Rate Limiting
- **OWASP Category:** A05:2021 – Security Misconfiguration & A04:2021 – Insecure Design
- **Severity Level:** Medium (CVSS v3.1: 5.3 - `CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L`)
- **Detection Method:** Architectural Code Review
- **Affected File:** `Backend/src/index.js` (lines 1–76)

#### 1. Description & Root Cause
The Express server has no `helmet` middleware installed, resulting in missing standard security headers (`Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Strict-Transport-Security`). Additionally, no rate limiting is attached to authentication routes (`/login`, `/user/register`, `/user/otp/send`), enabling automated credential stuffing and brute-force attacks.

#### 2. Security Impact
- **Confidentiality:** Low
- **Integrity:** Low
- **Availability:** Medium
- **Impact Summary:** Increased exposure to clickjacking, MIME sniffing, and brute-force authentication attacks.

#### 4. Remediation Strategy
Mount `helmet()` and `express-rate-limit` globally and configure stricter limiters on authentication endpoints.
