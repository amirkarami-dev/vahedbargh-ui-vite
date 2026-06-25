# web — Vahedbargh frontend (React 19 + Vite)

The new frontend. Rebuild of `../old-ui` on a modern stack. See the root [AGENTS.md](../AGENTS.md) for all rules and the migration plan.

## Stack
React 19 · Vite · TypeScript · **Ant Design v5 only** · TanStack React Query (server state) · Zustand (UI state) · ECharts (charts) · motion/react (animation) · i18next (fa/eng, RTL).

## Run
```bash
pnpm install
cp .env.example .env   # then set VITE_API_URL / VITE_API_SOCKET
pnpm dev               # http://localhost:3005
```
The .NET API must run separately — see [../api/CLAUDE.md](../api/CLAUDE.md).

## Scripts
`pnpm dev` · `pnpm build` · `pnpm preview` · `pnpm typecheck` · `pnpm test` · `pnpm lint` · `pnpm format`

## Migrate a screen
Use the `/migrate-feature` skill — one domain at a time from `old-ui`.
