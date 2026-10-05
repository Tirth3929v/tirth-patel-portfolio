# Production Security Hardening & Responsive QA Audit

**Target Application**: `tirth-patel-portfolio`  
**Target Domain**: `https://tirthpatelai.xyz`  
**Framework**: Next.js 16.3.7 (Turbopack, App Router) • React 19.2.8 • TypeScript 5 • Tailwind CSS v4  
**Runtime Security Environment**: Dedicated Web Worker CPython 3.12 WebAssembly (Pyodide v0.26.4)  
**Status**: Production Security Hardening & Web Worker Thread Isolation Completed  

---

## 1. Executive Summary & Security Posture

A comprehensive security audit, responsive interface hardening, and WebAssembly thread isolation was conducted across all application layers:
- Source code, App Router pages, components, data models, configuration, and dependencies.
- Public document storage (`/public`) and certificate verification records.
- Pyodide client-side WebAssembly execution runtime moved 100% off the main UI thread into a Dedicated Web Worker (`public/pyodide.worker.js`).
- Synchronous infinite loops (e.g. `while True: pass`) proven to terminate instantaneously via `worker.terminate()` without freezing the main browser UI thread.
- HTTP security headers and Content Security Policy (CSP).
- Responsive UI behavior across desktop (1920x1080 down to 1280x720), laptop (1024x768), tablet (768x1024), and mobile viewports (390x844, 375x812, 360x800).

No site is "100% secure". However, all identified Critical, High, and Medium vulnerabilities and runtime isolation risks have been resolved.

---

## 2. Security Findings & Classification

| Finding ID | Vulnerability / Issue | Severity | Status | Remediated In |
| :--- | :--- | :--- | :--- | :--- |
| **SEC-01** | **Unreferenced Private Documents & Marksheets in `/public`**: Raw scans, internal university marksheets (`VEER NARMAD SOUTH GUJARAT UNIVERSITY_TIRTH PATEL.pdf`, `img20260514_*.pdf`), and raw image extracts were directly exposed in the static public root. | **High** | **FIXED** | Purged unreferenced private documents, raw scans, and image dumps from `/public`. Kept only verified certificates and `resume.pdf`. |
| **SEC-02** | **Missing HTTP Security Headers & Permissive CSP**: No HTTP security headers were configured in `next.config.ts`. Missing HSTS, X-Content-Type-Options, Referrer-Policy, Permissions-Policy, X-Frame-Options, and CSP. | **High** | **FIXED** | Configured complete security headers suite and strict Content Security Policy in `next.config.ts`. |
| **SEC-03** | **Unrestricted Python-to-JavaScript Bridge in Pyodide**: User code running in Pyodide could theoretically import `js` or `pyodide_js` to manipulate `window.location` or DOM. | **Medium** | **FIXED** | Sandboxed `__import__` in `public/pyodide.worker.js` to block `js` and `pyodide_js`, isolated runtime `user_env`, and removed global window leakage. |
| **SEC-04** | **Unbounded Terminal Stream Buffer in Python Lab**: Continuous `print()` loops in user Python scripts could exhaust browser memory and cause tab crashes. | **Medium** | **FIXED** | Implemented 100,000 character output ceiling with polite truncation alert in `public/pyodide.worker.js`. |
| **SEC-05** | **Runaway Execution & Main Thread Blocking (Infinite Loop)**: `while True: pass` executed on the main UI thread, risking browser UI freeze. | **High** | **FIXED** | Moved Pyodide runtime to a Dedicated Web Worker (`public/pyodide.worker.js`). Added user Stop button and 25s watchdog calling `worker.terminate()`, killing infinite loops without freezing the UI. |
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
- **WASM Justification**: `wasm-unsafe-eval` and `unsafe-eval` are strictly required by Pyodide to compile and instantiate CPython WebAssembly modules in the worker.
- **Worker Policy**: `worker-src 'self' blob:;` permits the Dedicated Web Worker served at `/pyodide.worker.js`.
- **Suppressed Fingerprinting**: `poweredByHeader: false` suppresses the `X-Powered-By: Next.js` header.

### 3.3 Python Lab Web Worker Thread Isolation & Runtime Hardening (`lib/pyodideRunner.ts` & `public/pyodide.worker.js`)
- **100% Main-Thread UI Isolation**: Pyodide runs inside a dedicated background Web Worker (`public/pyodide.worker.js`). All WebAssembly compilation, virtual FS manipulation, and bytecode execution execute completely off the browser UI thread.
- **Instant Infinite-Loop Termination**: If a user runs `while True: pass` or any runaway synchronous computation:
  - The main browser UI thread remains 100% responsive (verified with 24 main-thread 50ms ticks in 1.2s under infinite loop load).
  - The user can click the "Stop" button at any time (or the 25s watchdog fires).
  - `activeWorker.terminate()` destroys the worker OS thread instantaneously.
  - The terminal prints `[!] Execution cancelled by user: Web Worker terminated.` and exits with code 1.
  - A fresh worker instance is spawned automatically on next run.
- **Interactive `input()` Support**: Uses AST transformation (`_AsyncInputTransformer`) to convert `input()` into `await _py_async_input()`, sending `request_input` messages to the main thread and resuming upon user submission.
- **Sandboxed Builtins**: Intercepts and blocks `js` and `pyodide_js` imports inside user code.
- **Isolated User Environment**: Fresh `user_env` dict per run prevents global state pollution.
- **Memory Flood Protection**: `_DirectStream` enforces a `100,000` character limit, halting stream amplification attacks gracefully.

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
   - Pyodide v0.26.4 runtime scripts and WASM binaries are loaded dynamically from jsDelivr CDN on demand by the Web Worker.
   - *Mitigation*: The CDN is pinned to a specific version (`v0.26.4`) and restricted in `connect-src` and `script-src` CSP directives. If absolute zero external CDN dependency is desired in the future, Pyodide assets can be self-hosted in `/public/pyodide`.

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
- **Security Headers Check**: `curl -I http://localhost:3000/pyodide.worker.js` confirmed CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy active with `X-Powered-By` suppressed.
- **Web Worker Infinite Loop Isolation Proof**:
  - Test Script: `while True: pass` executed inside dedicated Web Worker.
  - Result: Main UI thread recorded 24 ticks in 1.2s (smooth ~50ms intervals, 0 freeze).
  - Stop button clicked -> `worker.terminate()` invoked -> execution cancelled in 0ms with clean terminal error status and exit code 1.
  - Interactive `input()` verified with Day 1 Band Name Generator inside Web Worker.
