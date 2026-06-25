# AGENTS.md — src/store (Redux + redux-saga)

Scoped guidance for state code. Applies to everything under `src/store/`. See the root [AGENTS.md](../../AGENTS.md) for project-wide rules. To scaffold a new feature, use the `/new-redux-feature` skill.

## The 4-file feature pattern
Every feature folder (`src/store/<feature>/`) contains exactly: `actionTypes.js`, `actions.js`, `reducer.js`, `saga.js`. The `engineers` feature is the canonical, correct reference — copy its shape, not `appMenu` (a broken stub whose action types are all identical and whose saga is empty).

- **actionTypes.js** — async ops come as a triple of *distinct* strings: `X`, `X_SUCCESS`, `X_FAIL`.
- **actions.js** — plain action creators; data/error rides on `payload`.
- **reducer.js** — `INIT_STATE` always has `loading`, `error`, `success`. Request → `loading:true`; success/fail → `loading:false`. Default-export the reducer. Note the repo idiom of pulling types via `require("./actionTypes")` at the top of reducers/sagas.
- **saga.js** — workers use `try { yield call(api) ; yield put(success) } catch { yield put(fail) }`; watcher uses `takeEvery`/`takeLatest`; default-export the watcher generator.

## Wiring (3 roots — easy to forget)
A new feature is invisible until registered in all three:
- [reducers.js](reducers.js) → `combineReducers`
- [sagas.js](sagas.js) → `yield all([... yourSaga()])`
- [actions.js](actions.js) → re-export

## Rules
- Sagas call functions from [helpers/backend_helper.js](../helpers/backend_helper.js) — never axios/`api_helper` directly. Add new endpoints to `url_helper.js` + `backend_helper.js` first.
- The Redux key in a component's `mapStateToProps` must match the name in `combineReducers` (e.g. `state.Engineers`).
- User-facing success/error strings are Persian and surface through the `success`/`error` slice fields.
- No semicolons; `arrowParens: avoid`; absolute imports from `src/`.
