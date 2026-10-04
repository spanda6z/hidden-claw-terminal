# HIDDEN CLAW — Real Signals Setup

## What works out of the box

**Pump.fun launches** stream from the public frontend API — **no API key required**.

- `GET /api/signals/pumpfun` — latest launches, scored
- `GET /api/signals/status` — health check
- Terminal → **PUMP.FUN** — live table (polls every 8s)

## Optional upgrades (when you return)

### 1. Helius (recommended)
1. Create account at https://dashboard.helius.dev
2. Copy API key
3. In Vercel → Project → Settings → Environment Variables:
   ```
   HELIUS_API_KEY=your_key_here
   ```
4. Redeploy

Enables later: wallet tracking, tx parse, pump program subscribe.

### 2. Solana Tracker (optional)
1. https://docs.solanatracker.io
2. Set `SOLANA_TRACKER_API_KEY` in Vercel
3. Redeploy

## Local

```bash
cp .env.example .env.local
npm run dev
```

## Verify

```bash
curl localhost:3000/api/signals/status
curl localhost:3000/api/signals/pumpfun?limit=5
```

## Notes

- Security/elite/dev tiers are heuristic until wallet graph is connected.
- This does **not** execute trades.
- Rate limits: keep poll ≥5–8s.
