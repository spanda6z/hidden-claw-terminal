# HIDDEN CLAW

Solana market intelligence terminal — **intelligence first, execution optional**.

## Live today

- Pump.fun launches, trending, curves
- Deployer / creator wallets
- Signal tiers (CRITICAL / HIGH / WATCH / INFO)
- SOL price (DexScreener)
- Local execution strategy config (no on-chain orders yet)
- Browser watchlist

## Stack

- Next.js 16 · React 19 · Tailwind 4
- Public APIs: Pump.fun · DexScreener

## Run locally

```bash
npm install
npm run dev
```

## Deploy (Vercel)

1. Import `spanda6z/hidden-claw-terminal`
2. Framework: Next.js
3. No required env vars for core live feeds
4. Optional later: `NEXT_PUBLIC_SOLANA_RPC`, Helius for deeper graphs

## Paths

| Path | Purpose |
|------|---------|
| `/` | Landing + live strip |
| `/risk` → `/terms` → `/access` | Onboarding |
| `/terminal` | Command center |
| `/terminal/scanner` | Live launches |
| `/terminal/wallets` | Deployer wallets |
| `/terminal/execution` | Strategy rules (local) |

## Philosophy

Understand the footprint. Then decide.
