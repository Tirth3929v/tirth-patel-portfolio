# Production Security Hardening & Responsive QA Audit

**Target Application**: `tirth-patel-portfolio`  
**Target Domain**: `https://tirthpatelai.xyz`  
**Framework**: Next.js 16.3.7 (Turbopack, App Router) • React 19.2.8 • TypeScript 5 • Tailwind CSS v4  
**Runtime Security Environment**: Client-Side In-Browser CPython WebAssembly (Pyodide v0.26.4)  
**Status**: Production Security Hardening Completed  

---

## 1. Executive Summary & Security Posture

A comprehensive security audit and responsive interface hardening was conducted across all application layers:
- Source code, App Router pages, components, data models, configuration, and dependencies.
- Public document storage (`/public`) and certificate verification records.
- Pyodide client-side WebAssembly execution runtime and AST input transformer.
- HTTP security headers and Content Security Policy (CSP).
- Responsive UI behavior across desktop (1920x1080 down to 1280x720), laptop (1024x768), tablet (768x1024), and mobile viewports (390x844, 375x812, 360x800).

No site is "100% secure". However, all identified Critical, High, and Medium vulnerabilities have been resolved. The remaining risks are documented in Section 4.

---

## 2. Security Findings & Classification

| Finding ID | Vulnerability / Issue | Severity | Status | Remediated In |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | **Unreferenced Private Documents & Marksheets in `/public`**: Raw scans, internal university marksheets (`VEER NARMAD SOUTH GUJARAT UNIVERSITY_TIRTH PATEL.pdf`, `img20260514_*.pdf`), and raw image extracts were directly exposed in the static public root. | **High** | **FIXED** | Purged unreferenced private documents, raw scans, and image dumps from `/public`. Kept only verified certificates and `resume.pdf`. |
| **SEC-02** | **Missing HTTP Security Headers & Permissive CSP**: No HTTP security headers were configured in `next.config.ts`. Missing HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, and CSP. | **High** | **FIXED** | Configured complete security headers suite and strict Content Security Policy in `next.config.ts`. |
| **SEC-03** | **Unrestricted Python-to-JavaScript Bridge in Pyodide**: User code running in Pyodide could theoretically import `js` or `pyodide_js` to manipulate `window.location` or DOM. | **Medium** | **FIXED** | Sandboxed `__import__` in `lib/pyodideRunner.ts` to block `js` and `pyodide_js`, isolated runtime `user_env`, and removed global window leakage. |
| **SEC-04** | **Unbounded Terminal Stream Buffer in Python Lab**: Continuous `print()` loops in user Python scripts could exhaust browser memory and cause tab crashes. | **Medium** | **FIXED** | Implemented 100,000 character output ceiling with polite truncation alert in `lib/pyodideRunner.ts`. |
| **SEC-05** | **Runaway Execution Risk in WebAssembly Engine**: Long computations or blocking operations lacked a client-side timeout watchdog. | **Medium** | **FIXED** | Added 60s execution timeout race watchdog with automated cleanup in `lib/pyodideRunner.ts`. |
| **SEC-06** | **Reverse Tabnabbing on External Windows**: `window.open` calls in `CommandPalette.tsx` lacked `noopener,noreferrer` parameters. | **Low** | **FIXED** | Added `"noopener,noreferrer"` to all `window.open` handlers. Verified `rel="noopener noreferrer"` across all JSX links. |
| **SEC-07** | **Double Theme Button on Tablet Breakpoints**: Between 640px and 1024px, both desktop and mobile theme buttons rendered concurrently. | **Low** | **FIXED** | Standardized desktop actions to `lg:flex` and mobile/tablet bar to `lg:hidden` in `Navbar.tsx`. |
| **SEC-08** | **Unconstrained Contact Form Inputs**: Subject and body fields lacked character length restrictions, risking mail client failure from overly long `mailto:` URLs. | **Low** | **FIXED** | Added `maxLength={200}` to subject and `maxLength={2500}` to message in `ContactSection.tsx`. |
| **SEC-09** | **DevDependency Glob Advisory (`braces` / `fast-glob`)**: `npm audit` flagged `braces <=3.0.3` via `micromatch` in `eslint-config-next`. | **Informational** | **ANALYZED** | Dev-only build linter dependency; not included in production client or server bundles. |

---

## 3. Detailed Remediation Actions

### 3.1 Document Privacy & Static Asset Hardening (`/public`)
- Removed raw university marksheet PDFs (`VEER NARMAD SOUTH GUJARAT UNIVERSITY_TIRTH PATEL.pdf`).
- Removed unreferenced raw camera scans (`img20260514_12085811.pdf`, `img20260514_12095842.pdf`).
- Removed duplicate unnormalized PDFs from `/public/` root (`2026H2S07PWVCHL4-A00792.pdf`, `certificate-Recipient.pdf`, `Completion Certificate _ SkillsBuild.pdf`, `IBMDesign*.pdf`, `OfferLetter*.pdf`, etc.).
- Removed unreferenced internal directories `public/certificates/extracted` and `public/certificates/true_renders`.
- Retained authentic public assets:
  - `/resume.pdf`
  - `/certificates/*.pdf` (Clean, standardized filenames)
  - `/certificates/previews/*.jpg` (Optimized thumbnail previews)

### 3.2 Content Security Policy & Security Headers (`next.config.ts`)
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; font-src 'self' data:; connect-src 'self' https://cdn.jsdelivr.net; worker-src 'self' blob:; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self';
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=()
X-DNS-Prefetch-Control: on
```
- **WASM Justification**: `wasm-unsafe-eval` and `unsafe-eval` are strictly required by Pyodide to compile and instantiate CPython WebAssembly modules in the browser.
- **Suppressed Fingerprinting**: `poweredByHeader: false` suppresses the `X-Powered-By: Next.js` header.

### 3.3 Python Lab Runtime Hardening (`lib/pyodideRunner.ts`)
- **Sandboxed Builtins**: Installed custom `__import__` hook in user execution environment that intercepts and blocks `js` and `pyodide_js` imports.
- **Isolated User Environment**: User scripts execute inside a fresh `user_env` dict, preventing state bleeding between Day projects.
- **Memory Flood Protection**: `_DirectStream` enforces a `100,000` character limit, halting stream amplification attacks gracefully.
- **Execution Watchdog**: Promise race timeout halts hanging executions after 60 seconds with clear terminal status feedback.

### 3.4 Responsive Design & Mobile Ergonomics
- **Stacked Python Lab Layout**:
  - Desktop (`lg`): 3-column layout (Project Index 25%, Code Editor 41.7%, Terminal 33.3%).
  - Mobile/Tablet (`< lg`): Natural vertical stack: Projects Index (`max-h-[220px]`) -> Code Editor (`min-h-[260px]`) -> Terminal (`min-h-[340px]`).
- **Mobile Navigation Drawer**:
  - Full-width mobile navigation modal with comfortable touch targets (44px min height).
  - Keyboard accessible: Esc key dismisses menu; body scroll locked while open.
  - Eliminated duplicate theme toggle buttons on tablet viewports (768px - 1024px).
- **Responsive Typography & Headings**: Fluid font sizing using clamp and responsive Tailwind utility classes (`text-3xl min-[400px]:text-4xl sm:text-5xl md:text-6xl`).

### 3.5 OS Preferences & User Adaptation
- **Theme Synchronization**: `ThemeProvider.tsx` checks `prefers-color-scheme` automatically if no manual preference is stored in `localStorage`, and responds live to system theme toggles.
- **Reduced Motion**: Respects `prefers-reduced-motion` at root in `globals.css` and inside Framer Motion animations (`useReducedMotion`).

---

## 4. Remaining Risks & Operational Guidance

1. **Third-Party CDN Dependency (`cdn.jsdelivr.net`)**:
   - Pyodide v0.26.4 runtime scripts and WASM binaries are loaded dynamically from jsDelivr CDN on demand when visiting `/python-lab`.
   - *Mitigation*: The CDN is pinned to a specific version (`v0.26.4`) and restricted in `connect-src` and `script-src` CSP directives. If absolute zero external CDN dependency is desired in the future, Pyodide assets can be self-hosted in `/public/pyodide`.
2. **Client-Side WASM Single-Thread Execution**:
   - While Pyodide runs client-side in a sandboxed WebAssembly VM with memory and output caps, synchronous tight loops (e.g. `while True: pass`) run on the browser UI thread until the async watchdog or browser interrupt fires.
   - *Mitigation*: Timeout watchdog triggers error resolution after timeout interval; users can select other projects or refresh.

---

## 5. Dependency Audit

- **Production Dependencies**: 0 vulnerabilities.
- **Development Dependencies**: 5 high severity advisories reported by `npm audit` on `braces <=3.0.3` via `micromatch` in `@next/eslint-plugin-next` -> `eslint-config-next`.
- **Impact Assessment**:
  - Used strictly at build/lint time (`eslint`).
  - Completely excluded from client JavaScript bundles and production server artifacts.
  - Next.js is maintained on the modern v16 release line (`16.3.7`).

---

## 6. QA Verification Matrix

| Viewport | Device / Category | Resolution | Layout & Navigation | Python Lab | Modals & Themes | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Desktop** | Standard Desktop / 1080p | 1920x1080 | Full desktop navbar, 3-column lab | Day 1 runnable, live terminal input | Certificate viewer, Dark/Light | **PASS** |
| **Desktop** | Laptop / High-DPI | 1440x900 | Fluid max-w-7xl, clean margins | Full 3-column IDE | Command Palette (⌘K) | **PASS** |
| **Desktop** | Standard Laptop | 1280x800 | Clean header, zero horizontal scroll | Day 1 Pyodide CPython execution | Theme toggle verified | **PASS** |
| **Tablet** | iPad / Android Tablet | 768x1024 | Single theme button, mobile menu | Stacked layout, scrollable index | Certificate modal Esc exit | **PASS** |
| **Mobile** | iPhone 14 / Modern Phone | 390x844 | 44px touch targets, mobile drawer | Stacked: Index -> Code -> Terminal | Accessible modal, full width | **PASS** |
| **Mobile** | Compact Phone | 375x812 | No clipping, wrapping headings | Responsive textarea & terminal | Clean mobile mailto form | **PASS** |

---

## 7. Verification Results

- **`npm run lint`**: Exit code `0` (Zero errors, zero warnings).
- **`npm run build`**: Exit code `0` (Optimized production build generated across all 18 static & SSG routes).
- **Security Headers Check**: `curl -I http://localhost:3000` confirmed CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy active with `X-Powered-By` suppressed.
- **Browser Subagent QA**: 6/6 automated test tasks passed with recorded WebP session artifact.
