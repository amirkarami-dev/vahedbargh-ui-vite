---
name: migrate-feature
description: "Use when migrating one feature/domain from old-ui (React 17 / Redux-saga) to web/ (React 19 + Vite, antd-only, Zustand + React Query). Repeatable per-domain procedure that preserves logic, the API contract, RTL, roles, and i18n. Trigger phrases: migrate <domain>, port <page>, rebuild <feature> in web."
---

# Migrate one feature: old-ui → web/

Port a single business domain (e.g. `electProjects`, `accounting`, `support`) from `old-ui/` into `web/` with **identical logic and backend behavior**, on the new stack. Read the root [AGENTS.md](../../../AGENTS.md) first — the locked tech decisions and the API contract there are non-negotiable.

**Scope one domain per run.** ElectProjects is large — split it by role variant (Edc / Eng / Section / PanelMaker / Process…) across runs.

## Checklist (create one todo per step)

1. **Map the legacy feature.** In `old-ui/src/`, locate: the page folder under `pages/<Domain>/`, its Redux slice `store/<feature>/{actionTypes,actions,reducer,saga}.js`, the endpoints it uses in `helpers/url_helper.js` + `helpers/backend_helper.js`, its route(s) + allowed roles in `routes/allRoutes.js`, its column files (`*ColumnsAnt.js`, `columns.js`, `checklist-columns.js`…), and any enums in `models/types/` or `common/`. List every API call and every user action — this is the parity spec.

2. **Port the endpoints (if not already done).** Add the domain's endpoint constants + one typed wrapper fn per endpoint into `web/src/shared/api/` (mirroring `url_helper`/`backend_helper`). Wrappers call the shared axios helpers (`get/post/put/del/postAttach/getImageFile`) — never axios directly. **Preserve query-string shapes, multipart `postAttach` for uploads, and the exact paths.**

3. **Build React Query hooks** under `features/<domain>/api/`. One `useXxx` query per GET, one `useXxxMutation` per write. Stable `queryKey`s. On mutation success → `invalidateQueries` the relevant keys and surface the Persian success string via antd `message`. Replace every saga side-effect with a hook — **no redux, no sagas**.

4. **Identify client state.** Almost always there is none (it was server data). If the screen has genuine UI-only state (open modal, selected tab, filter draft), use local `useState` or a small Zustand store under `shared/stores/` — only for `Layout`/`AppMenus`-style truly-UI state.

5. **Rebuild the UI in antd.** Re-express the screen with antd components — `Table` (column defs in `features/<domain>/columns/*.tsx`), `Form` + `Form.useForm()`, `Modal`, `Card`, `Upload` (multipart via `postAttach`). **Remove all MUI / reactstrap / bootstrap.** Keep the Persian labels and the exact field/validation behavior. RTL is global via `ConfigProvider` — don't add per-component RTL hacks.

6. **Charts → ECharts; motion → `motion/react`.** If the screen had apex/chartist/chartjs, re-author as an ECharts `option`. Add subtle `motion/react` entrance/transition only where it aids UX.

7. **Wire the route + role guard.** Add the route to `web/src/routes/` with the **same path and the same allowed-roles list** from `allRoutes.js`, under the correct layout (VerticalLayout vs NonAuthLayout) and behind the `<RequireRole>` guard.

8. **i18n.** Add every new user-facing string to **both** `web/src/locales/fa/translation.json` and `eng/translation.json`. Reuse existing keys where they exist in old-ui's translations.

9. **Verify parity.** Run `pnpm lint` and `pnpm build` (type-check). Then exercise the screen against a running `api/` (`dotnet run --project Src/Api`): every API call fires with the right shape, JWT header is attached, role gating matches, RTL/Persian renders, uploads work. Diff behavior against the old-ui screen.

10. **Report.** Summarize: endpoints ported, hooks added, screens built, route+roles wired, libs dropped. Flag any legacy bug you preserved (don't fix silently) and any endpoint that behaved unexpectedly.

## Guardrails

- **Logic parity over cleanup.** Replicate behavior first; propose improvements separately.
- **Never edit `api/` or `old-ui/`.** `old-ui/` is read-only reference; `api/` is frozen.
- **The auth/SignalR contract is law:** `localStorage.authUser` `{accessToken, refreshToken}`, `Authorization: Bearer`, `x-access-token` refresh-on-response, hubs `/frontnotif` + `/meet`. Don't refactor it per-feature.
- **antd-only, React Query (server), Zustand (UI).** No new state/UI/chart libraries.
- **Env:** `import.meta.env.VITE_*`, not `process.env.REACT_APP_*`.
