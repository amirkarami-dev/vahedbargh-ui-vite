# AGENTS.md — واحد برق (vahedbargh) monorepo

Monorepo for **Vahedbargh** — a Persian/Farsi **RTL** SaaS platform for managing electrical‑connection engineering projects (project lifecycle, engineer assignments, tariffs, accounting, support). Three apps live side by side at the repo root:

| Folder | What it is | Status | Scoped docs |
|--------|-----------|--------|-------------|
| `api/` | **.NET 9** ASP.NET Core Web API — Clean Architecture + CQRS (MediatR) + SignalR | **Source of truth. DO NOT modify.** | [api/CLAUDE.md](api/CLAUDE.md) |
| `old-ui/` | Legacy frontend — **React 17 / CRA**, Redux + redux‑saga, antd v5 **mixed with** MUI + reactstrap | **Reference only.** Read to copy logic; never edit. | [old-ui/AGENTS.md](old-ui/AGENTS.md), [old-ui/src/store/AGENTS.md](old-ui/src/store/AGENTS.md) |
| `web/` | **NEW** frontend being built — **React 19 + Vite**, antd‑only, Zustand + React Query | **Where all new work happens.** | _this file_ |

## The mission

Rebuild **everything** in `old-ui/` into `web/` with a modern stack, **preserving exact logic, functionality, and the backend contract**. Same screens, same roles, same API calls, same Persian RTL UX — new foundations.

**Locked tech decisions (do not deviate without asking):**

| Concern | Decision |
|---------|----------|
| Framework / bundler | React **19** + **Vite** |
| Language | **TypeScript** (`.tsx`/`.ts`), `strict` mode. (`old-ui` is plain JS; the port adds types — derive them from the .NET DTOs and observed response shapes.) |
| Package manager | **pnpm** |
| UI components | **Ant Design v5 ONLY.** No MUI, no reactstrap, no Bootstrap. Every legacy MUI/reactstrap screen is re‑expressed in antd. |
| Server state (data from the API) | **TanStack React Query** |
| Client/UI state | **Zustand** |
| Charts | **ECharts** (`echarts` + `echarts-for-react`) — the single charting lib. Drop apexcharts / chartist / chartjs / sparklines. |
| Animation / motion | **`motion/react`** (Framer Motion) |
| Backend (`api/`) | **Unchanged.** The frontend adapts to it, never the reverse. |

> **Don't** introduce a state library, UI kit, or charting lib outside this table. **Don't** "improve" business logic during the port — replicate it, then note any bug separately.

## Repo structure

```
vahedbargh-ui-vite/
├── api/        # .NET 9 backend — DO NOT TOUCH (see api/CLAUDE.md)
├── old-ui/     # legacy React 17 CRA — reference only, DO NOT EDIT
├── web/        # NEW React 19 + Vite app — all new work here
└── AGENTS.md   # this file
```

Inside `web/` use a **feature‑first** layout (mirror the old-ui domains, not its Redux folder shape):

```
web/src/
├── app/                # app shell: providers, router, query client, theme/ConfigProvider
├── routes/             # route table + role guard (replaces old-ui routes/)
├── features/<domain>/  # one folder per business domain (electProjects, accounting, support…)
│   ├── api/            # React Query hooks (useElectProjects, useUpsertElectProject…)
│   ├── components/     # antd screens/forms for this domain
│   ├── columns/        # antd Table column defs (the *ColumnsAnt.js equivalent, now .tsx)
│   └── types.ts        # domain types/enums
├── shared/
│   ├── api/            # axios instance + interceptors + endpoint constants + http helpers
│   ├── components/     # reusable antd components (PersianDatePicker, MapComp, Upload…)
│   ├── hooks/          # cross-cutting hooks
│   ├── lib/            # signalr, i18n, utils, file-url builders
│   └── stores/         # Zustand stores (layout, auth-ui, menu)
├── locales/            # fa/ + eng/ translation.json
├── assets/             # fonts (IRANSansXFaNum), images
└── styles/             # global.css, theme tokens
```

## Commands (run inside `web/`)

```bash
pnpm install        # install deps
pnpm dev            # Vite dev server (HMR)
pnpm build          # type-check + production build
pnpm preview        # serve the production build
pnpm typecheck      # tsc --noEmit
pnpm test           # vitest (unit/component, the modern jest+RTL replacement)
pnpm lint           # eslint
pnpm format         # prettier --write
```

Backend commands live in [api/CLAUDE.md](api/CLAUDE.md) (`dotnet run --project Src/Api`, EF migrations, etc.). Run the API separately; the web app talks to it over HTTP + SignalR.

---

## Migration map — old → new

| Legacy (`old-ui/`) | New (`web/`) |
|--------------------|--------------|
| CRA + `react-scripts` + craco + `--openssl-legacy-provider` | Vite |
| Redux + redux‑saga (26 slices) | React Query (server data) + Zustand (UI state) — **no redux, no sagas** |
| `connect(mapStateToProps, mapDispatchToProps)` | hooks: `useQuery`/`useMutation` + `useStore()` |
| `store/<feature>/{actionTypes,actions,reducer,saga}.js` | `features/<domain>/api/*.ts` (query hooks) |
| MUI `@mui/x-data-grid` (5 screens) | antd `<Table>` |
| reactstrap / bootstrap (forms, auth, dashboard) | antd `<Form>`, `<Card>`, `<Layout>`, `<Modal>` |
| MUI `ThemeProvider` + emotion RTL cache (`index.js`) | antd `<ConfigProvider direction="rtl" theme={{token}}>` |
| apexcharts / chartist / chartjs / sparklines | ECharts |
| `process.env.REACT_APP_*` | `import.meta.env.VITE_*` (see env table below) |
| `react-router-dom` v5 (`Switch`, custom `Authmiddleware`) | `react-router-dom` v6/v7 (`Routes`, a `<RequireRole>` guard) |
| `*Ant.js` suffix = "the antd rewrite" | In `web/` everything is antd already — drop the suffix, keep the column‑def split |

**Env var rename (Vite requires the `VITE_` prefix + `import.meta.env`):**

| old-ui | web |
|--------|-----|
| `REACT_APP_API_URL` | `VITE_API_URL` |
| `REACT_APP_API_SOCKET` | `VITE_API_SOCKET` |
| `REACT_APP_DEFAULTAUTH` | `VITE_DEFAULTAUTH` |

---

## State management — the decision rule

> **Does the data come from the API?** → React Query. **Is it pure UI/ephemeral?** → Zustand. Never put server data in Zustand or UI flags in React Query.

From the legacy store (26 slices), the split is already known:

- **React Query (server‑cache, ~19 slices):** ElectProjects, ElectProjectProcesses, Channels, Users, Engineers, Calendar, Accounting, Supports, EngPayment, Quotas, Commons, QuarterTariffs, Payment, RequestDemo, Account/register, ForgetPassword, Profile, ReqRegister, ChangePassword. → one query‑hook module per domain under `features/<domain>/api/`.
- **Zustand (pure UI, 2 slices):** `Layout` (sidebar/theme/viewport, light‑dark `data-theme`) and `AppMenus` (nav structure derived from routes).
- **Auth (`Login`) is hybrid:** the **JWT session** (token in `localStorage.authUser`) is the integration contract — keep it as the source the axios/SignalR layers read. Put only the *UI* bits (login form loading/error) in a small Zustand `auth-ui` store. Expose current user/roles via a `useAuth()` hook backed by the stored token (decode with `jwt-decode`).

React Query conventions: stable `queryKey` arrays (`['electProjects', {page, pageSize, search}]`), `useMutation` + `invalidateQueries` for writes, surface the Persian success/error strings from responses via antd `message`/`notification`.

---

## API integration contract — **PRESERVE EXACTLY**

The backend is frozen, so the wire format is law. Rebuild this layer in `web/src/shared/api/` faithfully (port from [old-ui/src/helpers](old-ui/src/helpers)). Verified details:

- **axios instance**: `baseURL = import.meta.env.VITE_API_URL`.
- **Auth token storage**: `localStorage.authUser` = JSON `{ accessToken, refreshToken }`. **Keep this key and shape** — SignalR and interceptors depend on it.
- **Request interceptor**: if `authUser.accessToken` exists, set `Authorization: Bearer <accessToken>`.
- **Response interceptor (success *and* error)**: if the response carries an `x-access-token` (and `x-refresh-token`) header, write the refreshed tokens back into `localStorage.authUser`. Header names are **case‑sensitive**.
- **401 handling**: hard redirect to `/login` (no silent refresh‑retry flow exists — don't invent one).
- **HTTP helpers to reproduce**: `get(url, config)`, `post(url, data, config)`, `put(url, data, config)`, `del(url, config)`, `postAttach(url, formData)` (**multipart**, used for every file upload), `getImageFile(url, config)` (uses **`fetch`**, not axios; returns `"data:image/png;base64," + body`).
- **Endpoints**: ~**81** constants in `url_helper.js` (`GET_/POST_/UPSERT_/UPDATE_/DELETE_` + `SCREAMING_SNAKE` + `_URL`/`_API`). Port them into a typed endpoint map; keep one wrapper fn per endpoint (the `backend_helper.js` pattern). React Query hooks call the wrappers, **never axios directly**.
- **Backend route shape**: `/api/v1.0/[controller]/[action]`. Controller families: Clients, ElectProjects, ElectProjectProcesses, Engineers, Identity, MetaBase, Notification, QuarterTariffs, Quotas, RequestDemo, Routes, Supports, Transactions, Users.
- **SignalR** (`@microsoft/signalr`): base `import.meta.env.VITE_API_SOCKET`. Hubs: **`/frontnotif`** (listens for `"NewMessage"` → refetch current user) and **`/meet`**. Build with `accessTokenFactory: () => <accessToken>`, `skipNegotiation: true`, `transport: WebSockets (1)`, `.withAutomaticReconnect()`. The token factory must read the token **dynamically** on each (re)connect.

---

## Routing & roles

React Router v6/v7. Reproduce the v5 route map and the role gate exactly.

**Roles (7):** `Administrator`, `Engineer`, `Employee`, `Accountant`, `PanelMaker`, `ElectAdmin`, `Section` — defined in [old-ui/src/common/enums/rolesType.js](old-ui/src/common/enums/rolesType.js) (Persian labels). Port as a typed enum.

**Guard behavior (port from [old-ui Authmiddleware](old-ui/src/routes/middleware/Authmiddleware.js)):**
- No `authUser` in localStorage + protected route → redirect `/login` (preserve return‑to location).
- Authenticated but **none** of the user's roles ∈ the route's allowed roles → redirect `/dashboard`.
- Match → render inside the layout.

**Public routes:** `/login`, `/logout`, `/register`, `/forgot-password`, `/request-register`, `/submit-sms`, `/tp` (public transaction), `/ep` (public project) → **NonAuthLayout**.
**Protected routes** → **VerticalLayout**. `/` redirects to `/dashboard`. Per‑route role lists are in [old-ui/src/routes/allRoutes.js](old-ui/src/routes/allRoutes.js) — copy them verbatim (e.g. `/projects/ElectProjectsPanelMaker` → `PanelMaker` only; `/accounting/EngPayment` → `Accountant`).

---

## UI conventions (antd‑only)

- **Tables**: antd `<Table>`. Keep the legacy **column‑definitions‑in‑a‑separate‑file** habit — e.g. `features/electProjects/columns/projectColumns.tsx` (was `ProjectColumnsAnt.js`), plus per‑concern files (`checklistColumns`, `commentColumns`). It keeps screens readable.
- **Forms**: antd `<Form>` + `Form.useForm()`. Replace `availity-reactstrap-validation`/`redux-form` with antd validation rules.
- **Theme & brand**: brand teal is **`#004943`**. Set it **once** globally:
  ```tsx
  <ConfigProvider direction="rtl" theme={{ token: { colorPrimary: '#004943', borderRadius: 8, fontFamily: 'IRANSansXFaNum' } }}>
  ```
  Don't hardcode the hex in components — read `colorPrimary`/CSS vars. Layout gradients (`--logo-grad-start #003430` → `--logo-grad-end #004943`, `--icon-btn-color`) stay as CSS variables on the layout wrapper; keep the light/dark `data-theme` toggle (use antd `theme.darkAlgorithm` for dark).
- **RTL**: set `direction="rtl"` **globally** on `ConfigProvider` (antd flips margins/floats natively) + `<html dir="rtl">`. Drop the legacy `stylis-plugin-rtl`/emotion cache and the hand‑written `rtl/*.scss` partials — antd handles it.
- **Font**: **IRANSansXFaNum** (woff/woff2, weights 100–900), legacy‑aliased as `"Roboto"`. Ship the font files under `web/src/assets/fonts/` with `@font-face`, set it as antd `fontFamily`. Persian numerals matter — keep this font.
- **Layout**: rebuild `VerticalLayout` (Header / Sidebar / Footer / Rightbar, glassmorphism, sticky 70px header) and `NonAuthLayout` (bare passthrough) using antd `<Layout>`, `<Menu>`, `<Button>`. Source: [old-ui/src/components/VerticalLayout](old-ui/src/components/VerticalLayout).

## i18n

`i18next` + `react-i18next`. Languages: **`fa`** (default, primary) and **`eng`**. Language persisted in `localStorage['I18N_LANGUAGE']`, key separator `.`. **Every new user‑facing string must be added to BOTH `locales/fa/translation.json` and `locales/eng/translation.json`.** Use `const { t } = useTranslation()` → `t('project.NullStage')`. (Note: old-ui only *exposes* `fa` in its switcher though `eng` exists — decide per product whether to surface the switcher.)

## Charts & motion

- **Charts → ECharts only.** Use `echarts-for-react` (`<ReactECharts option={…} />`). The legacy `pages/AllCharts/*` demos (apex/chartist/chartjs/sparkline) are a **gallery, not product** — only port the charts actually used in **Dashboard** (e.g. radial/earnings/top‑cities/activity) and Reports, re‑authored as ECharts options. Don't port the demo gallery.
- **Motion → `motion/react`.** Use it for page/route transitions, list/card entrance, and any micro‑interaction. Keep it subtle and RTL‑aware.

## Domain feature checklist (what to migrate from `old-ui/src/pages`)

Auth (login/register/forgot/SMS‑OTP/profile) · Dashboard (charts) · **ElectProjects** family — the largest: ElectProjects, ElectProjectsEdc, ElectProjectsEng, ElectProjectSection, ElectProjectsPanelMaker, ElectProjectProcess(+Edc/+Eng/+List/+ListView) · CreateProject / Projects · **Accounting** (invoices, engInvoices, payment, transactions, TP) + EngPayment · **EngWork** (work + quota‑burn) · **Support** (+ Ticket) · UserFiles · Reports (electProjects / engInvoices / engineers) · BaseInfo/engineers · Users · Auctions · PipingPlan (react‑drawio) · Learning. Migrate domain‑by‑domain using the `/migrate-feature` skill.

## Libraries — keep vs. replace vs. drop

- **Keep (no antd equivalent):** `react-multi-date-picker` + `react-date-object` (Persian/Jalali calendar — wrap as a shared `PersianDatePicker`), `react-leaflet` + `leaflet` (`MapComp`), `xlsx` (accounting Excel export), `react-drawio` (PipingPlan), `jwt-decode`, `@microsoft/signalr`.
- **Replace with antd:** MUI DataGrid → antd `Table`; reactstrap/bootstrap → antd; filepond uploads → antd `Upload` (use `postAttach` multipart under the hood); imask/antd‑mask‑input → antd `Input` + a mask util or keep `react-imask` if needed.
- **Drop (dead in old-ui):** `jszip`, `@toast-ui/react-chart`, and the redundant chart libs (apexcharts, chartist, chartjs, sparklines).

## New-app conventions

- **Imports:** path alias **`@/` → `web/src`** (set in `vite.config.ts` + `tsconfig.json`), mirroring old-ui's `baseUrl: ./src`. Write `@/shared/api`, `@/features/electProjects/...` — no `../../..` chains.
- **Types:** `strict: true`. Port `old-ui/src/models/types/*` (17 enums) and `common/enums/*` (roles, inspection params) to typed `enum`/`as const`. Type each endpoint's request/response.
- **Naming:** components `PascalCase.tsx`, hooks `useXxx.ts`, query hooks colocated in `features/<domain>/api/`, Zustand stores `xxxStore.ts`, column defs `xxxColumns.tsx`.
- **Lint/format:** ESLint **flat config** (`eslint.config.js`) + Prettier, enforced once in config. (old-ui used no‑semicolons + `arrowParens: avoid`; match it or take Prettier defaults — just be consistent.)
- **Feedback / toasts:** wrap the tree in antd **`<App>`** and use `App.useApp()` → `message` / `notification` (configured `rtl: true`, short duration — same as old-ui's `notification.config({ duration: 1, rtl: true })`). Success/error copy comes from the API's **Persian** response strings — surface them, don't write new copy.
- **Numbers & currency:** amounts are Toman/Rial with Persian digit grouping (old-ui used `react-number-format`). Keep a shared formatter and preserve Persian numerals where the legacy screen showed them.
- **Dates:** Persian/Jalali via the shared `PersianDatePicker` (`react-multi-date-picker` + `react-date-object`); send each endpoint the date format the backend expects (check the legacy saga/helper).
- **React 19:** `Suspense` + React Query for loading states; an error boundary at the route/layout level. Reach for `use`/actions sparingly — **parity first**.

## Migration sequence (do in this order)

1. **Scaffold `web/`** — Vite + React 19 + TS, antd + global `ConfigProvider` (RTL · `#004943` · IRANSansXFaNum), React Query client + Devtools, router shell, i18n (fa/eng), fonts, `@/` alias.
2. **Shared API layer** — port the axios instance + interceptors + endpoint map + http helpers + SignalR. This unblocks every feature; verify the JWT / refresh‑header / 401 contract end‑to‑end.
3. **Auth + app shell** — login, the role guard, the 7 roles, VerticalLayout + NonAuthLayout, the Zustand `layout`/`menu` stores. Yields a navigable, gated skeleton.
4. **Domains, one at a time** via `/migrate-feature` — prove the pattern on a small domain (Support or Engineers), then ElectProjects (split by role variant), Accounting, EngWork, Reports, then the rest.

## Definition of done (per domain & overall)

- `pnpm lint`, `pnpm typecheck`, `pnpm build` all clean.
- Every legacy API call reproduced with the **same path + shape**; `Bearer` header attached; uploads multipart via `postAttach`.
- Route paths **and allowed‑roles** identical to `allRoutes.js`; guard redirects (`/login`, `/dashboard`) match.
- Zero `@mui/*`, `reactstrap`, `bootstrap` imports; charts are ECharts; motion via `motion/react`.
- New user‑facing strings added to **both** `locales/fa` and `locales/eng`; RTL + Persian render correctly.
- Behavior **diffed against the old-ui screen** — parity confirmed; any preserved legacy bug flagged, not silently fixed.

## Golden rules

1. **Logic parity first.** Port behavior exactly; if you spot a real bug, leave it working as‑is and flag it separately — don't fix silently mid‑migration.
2. **Never touch `api/`.** Adapt the frontend to the backend contract.
3. **antd‑only, React Query for server data, Zustand for UI** — no exceptions without asking.
4. **Both locale files, every string.** RTL everywhere.
5. **Preserve the auth/SignalR contract byte‑for‑byte** (`localStorage.authUser`, `Bearer`, `x-access-token` refresh, hub names).
