# Migration status — old-ui → web

Living tracker for the React 19 + Vite rebuild. See the root [AGENTS.md](../AGENTS.md) for rules and [/migrate-feature](../.claude/skills/migrate-feature/SKILL.md) for the per-screen process.

**Legend:** ✅ done · 🟡 partial · ⬜ not started

---

## Foundation — ✅ complete
- ✅ Vite + React 19 + TypeScript (pnpm)
- ✅ Ant Design v5 only + global `ConfigProvider` (RTL · brand `#004943` · IRANSansXFaNum font)
- ✅ TanStack React Query (server state) + Zustand (UI state)
- ✅ Router + role guard (`RequireRole`)
- ✅ i18n (`fa` default + `eng`)
- ✅ API layer — axios + JWT (`Bearer`, `x-access-token` refresh, 401→login) + Persian error mapping
- ✅ SignalR helper (`/frontnotif`, `/meet`)
- ✅ Role-based, grouped sidebar menu (from `allRoutes.js`)
- ✅ Code-split (lazy routes + vendor chunks; xlsx & Stimulsoft loaded on demand)
- ✅ Shared component structure (see AGENTS.md → "Shared vs feature")

## Auth — 🟡
- ✅ Login (`/Identity/Login`)
- ✅ SMS 2FA (`/Identity/LoginByCode`)
- ✅ Logout (`/Identity/Logout`)
- ✅ **User profile** (`/profile`) — identity + roles + change password (`/Identity/ChangePassword`); header link added
- ⬜ Register / RequestRegister / Forgot password — _Skote demo pages in old-ui (fake endpoints); real tenant signup is `/Clients/Signup`. Skipped unless needed._
- 🟡 RequestDemo (login demo modal) — login kept clean, modal not ported yet

## Screens (by domain)
- ✅ **BaseInfo / Engineers** — list · filters (name + geo + signature) · add/edit drawer · license history · files
- ✅ **Dashboard** — role-aware redesign: welcome hero · real KPIs from GetUserInfo (unread/invoice/payment) · invoice-vs-payment chart · quick-action grid (role-filtered) · announcements · Metabase embed (Administrator). App-wide light/dark/system theme + redesigned header (theme switch · fullscreen · notification badge · avatar menu)
- 🟡 **ElectProjects** — ✅ **main list complete**: filters · pagination · edit · files · delete · submit-to-elect · payment & docs SMS · assign engineer (ProjectProcess, read-only) · panel-maker · stop · expandable children · ✅ **Edc variant** (ElectAdmin: same list, role-gated columns + request-edit modal) · ✅ **PanelMaker variant** (panel list: submit-panel + serial · file-number edit · files · form#3 & checklist view). _Eng/Section list variants were inactive (unrouted) in old-ui._
- ✅ **ElectProjectProcess** — ✅ **Eng (Engineer)**: accept · files · defect · approve · form#3 / checklist / ERT editors · details · EDC report. ✅ **Admin/Section assign** (engineer picker · multi-select · save). ✅ **Edc (ElectAdmin)** (EDC checklist · file edit · status/defect). ✅ **List (Admin/Section assignment mgmt)**: delete assignment · accept · change engineer · main/sub toggle · status filter. _ListView was disabled in old-ui._
- ✅ **Projects / CreateProject** — ✅ **CreateProject** (ElectAdmin single-step form). ✅ **Projects** (Admin/Section 5-step wizard: request type · technical/building-group/ERT/sub-counts · landlord/supervisor · location+**address textarea**+coords · permit upload → Upsert). _Map simplified to lat/lng inputs. `Locations` (shared) now carries an optional address field; `isAccessCity`/section preselect driven by `GetUserInfo.idSection`._
- ✅ **Accounting** — transactions (filters + Excel) · invoices · engInvoices · payment · engPayment (role tabs). _TP = separate public page._
- ✅ **EngPayment** — task selector · create-list (date range) · editable deductions table + invoice expand · approve · Excel/grouped/bank-file exports (Accountant)
- ✅ **EngWork** — work figures (quarter + engineer filters) · quota-burn (insert + inline-edit + approve, Admin)
- ✅ **Support** — list · filters · stats · create ticket · quick-reply · ticket thread · close · files (attach/list/delete)
- ✅ **UserFiles** (standalone `/userFile` "My files" page — type select · upload · download · delete, scoped to the current user)
- ✅ **Reports** — electProjects · engInvoices · engineers (Stimulsoft engine + .mrt templates, role-gated)
- ✅ **Users** — admin CRUD (list + search · add with email/password/role · edit + active toggle · delete). _Route was disabled in old-ui; re-enabled (Administrator)._
- ▫️ **Auctions** — _not an active route in old-ui (unrouted); skipped._
- ▫️ **PipingPlan** — _removed per user (not needed)._
- ✅ Public: `/tp` (PaymentPublic — amount + send-to-bank → token → auto-post to gateway) · `/ep` (ProjectPublic — info lookup by `?e=` + bank-return message). _Anonymous (NonAuthLayout). Public file upload omitted (old-ui referenced `getCurrentUser().sid`, broken anonymously)._

## Shared / reusable (built so far)
- ✅ `Locations` (province/city/section, antd) · `PersianDatePicker` · `PageFallback`
- ✅ geo data + `cityName` helpers · enums (`engGradeType`, `workPermitType`, `userFileType`) + `getEnums`
- ✅ `userFiles` feature (`UserFilesDialog`, reusable)
- ✅ file dialogs/upload (`ProjectFilesDialog`, `UserFilesDialog`, MyFiles) · ✅ xlsx export (lazy) · ✅ Stimulsoft reports · masked inputs → plain validated inputs · map → lat/lng inputs (leaflet not added)

## Decisions / notes
- **Dates:** keep **solar (Persian)** — backend save accepts only `SolarMembershipDate`; list shows backend Persian dates.
- **Charts:** ECharts only. **Motion:** `motion/react`.
- **Backend (`api/`):** frozen — frontend adapts to it.

---

## Next up
1. **Support** (small — list + ticket) — proves the read+detail pattern.
2. **ElectProjects** (large — the core domain).
