# AGENTS.md — واحد برق (vahedbargh-ui)

Persian/Farsi **RTL** admin dashboard for managing electricity-connection projects (electricity unit / "واحد برق"). Create-React-App (React 17) + Redux/redux-saga, RTL-first UI.

## Commands

```bash
npm start            # dev server (uses --openssl-legacy-provider — required for Node 17+)
npm run start:3005   # dev server on port 3005, loads .env
npm run build        # production build (default .env)
npm run build:dev | build:local | build:prod   # build with .env.development / .env.local / .env.production
npm run lint         # eslint .
npm run format       # prettier --write
npm test             # react-scripts test (jest)
```

- Scripts run `react-scripts` directly. `@craco/craco`/`craco-swc` are installed but **not wired into scripts** — don't add a craco step unless you also change `package.json`.
- `--openssl-legacy-provider` is mandatory (old webpack + modern Node). Don't remove it.

## Code style — non-negotiable

- **No semicolons.** Enforced by ESLint (`semi: never`) and Prettier (`semi: false`). Never add trailing semicolons.
- Prettier: `arrowParens: avoid` → write `x => ...` not `(x) => ...`.
- **Functional components + hooks** only (no class components in new code).
- Absolute imports from `src/` are enabled ([jsconfig.json](jsconfig.json), `baseUrl: ./src`) — e.g. `import { get } from "helpers/api_helper"`.
- Match the surrounding file: double quotes, 2-space indent.

## Architecture

### State: Redux + redux-saga, one folder per feature
Each feature in [src/store/](src/store/) has exactly **4 files**: `actionTypes.js`, `actions.js`, `reducer.js`, `saga.js`. Async flow is `GET_X` → saga `call()`s the API → dispatches `GET_X_SUCCESS` / `GET_X_FAIL`. Wire new features into the roots: [src/store/reducers.js](src/store/reducers.js), [src/store/sagas.js](src/store/sagas.js), [src/store/actions.js](src/store/actions.js). Connect components with `connect(mapStateToProps, mapDispatchToProps)`.

### API: three-layer helper stack
1. [src/helpers/url_helper.js](src/helpers/url_helper.js) — endpoint path constants.
2. [src/helpers/backend_helper.js](src/helpers/backend_helper.js) — one wrapper fn per endpoint.
3. [src/helpers/api_helper.js](src/helpers/api_helper.js) — axios instance + `get/post/put/del/postAttach/getImageFile`.

Sagas call `backend_helper` functions, never axios directly. JWT lives in `localStorage.authUser` as `{ accessToken, refreshToken }`; the axios request interceptor injects `Authorization: Bearer`, and `401` redirects to `/login`. Error messages from interceptors are Persian strings. Base URL comes from `REACT_APP_API_URL`.

Real-time: [src/helpers/signalr_helper.js](src/helpers/signalr_helper.js) (`@microsoft/signalr`, `REACT_APP_API_SOCKET`).

### Routing: [src/routes/allRoutes.js](src/routes/allRoutes.js)
React Router v5, role-based. Public `authRoutes` vs protected `userRoutes`; [src/routes/middleware/Authmiddleware.js](src/routes/middleware/Authmiddleware.js) gates on `localStorage.authUser` and role. Roles: Administrator, Engineer, Employee, Accountant, PanelMaker, ElectAdmin, Section.

### UI libraries — prefer Ant Design for new work
**antd v5** is dominant in pages (Form, Table, Modal, ConfigProvider). MUI v5 is used for data grids (`@mui/x-data-grid`) and some layout (Accordion/Grid), so newer pages often **mix antd + MUI**. reactstrap/bootstrap appears in older/auth pages. When adding pages, prefer **antd**; only touch MUI/reactstrap when editing existing code that already uses them.

- **`*Ant.js` suffix = the antd rewrite** of an older component — prefer it. List/table screens keep their column defs in a per-page `ProjectColumnsAnt.js`; `GridFilesAnt.js` is the antd version of `GridFiles.js`.
- Brand color is teal `#004943`, exposed as SCSS/CSS vars (`$brand`, `--logo-grad-end`, `--icon-btn-color`). Use the var; don't hardcode the hex.

RTL: `stylis-plugin-rtl` + emotion cache, MUI `direction: rtl`, antd `ConfigProvider direction`. Keep everything RTL-first.

### i18n: [src/i18n.js](src/i18n.js)
`i18next` + `react-i18next`, languages `fa` (default) and `eng`, key separator `.`. Translations in [src/locales/fa/translation.json](src/locales/fa/translation.json) and `eng/translation.json`. Use `const { t } = useTranslation()` then `t("project.NullStage")`. **Add every new user-facing string to both locale files.**

### Dates
Persian dates: `react-multi-date-picker` + `react-date-object` (see `components/Common/PersianDatePicker.js`). `moment` for Gregorian/legacy.

## Folder map (src/)
`pages/` feature screens (ElectProjects, ElectProjectProcesses, Accounting, Authentication…) · `components/` reusable UI (`Common/`, `CommonForBoth/`, `VerticalLayout/`) · `store/` redux features (+ scoped [src/store/AGENTS.md](src/store/AGENTS.md)) · `helpers/` api/auth/signalr/url · `common/` enums + static data · `locales/` translations · `routes/` routing · `assets/` images + scss (RTL).

## Environment
`.env`, `.env.development`, `.env.local`, `.env.production`. Key vars: `REACT_APP_API_URL`, `REACT_APP_API_SOCKET`, `REACT_APP_DEFAULTAUTH=jwt`. Firebase vars exist but aren't core. The committed `.env` points at `localhost:6989` — set your own API URL locally.
