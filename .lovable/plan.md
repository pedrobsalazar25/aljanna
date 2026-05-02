## Problem

The currency conversion (USD → VES) is broken because both calls to `api.allorigins.win` are failing (`Failed to fetch`). That public CORS proxy is down/unreliable. The BCV rate APIs themselves work — we just can't reach them from the browser due to CORS.

## Fix

Move the rate fetching to a **Lovable Cloud edge function** (server-side). No CORS proxy needed, plus we can chain multiple fallback sources cleanly.

### Steps

1. **Enable Lovable Cloud** (if not already enabled) — gives us serverless edge functions and secret storage at no extra setup cost.

2. **Create edge function `get-bcv-rate`** that:
   - Tries `https://pydolarve.org/api/v2/dollar?page=bcv` first
   - Falls back to `https://bcv-api.rafnixg.dev/rates/`
   - Falls back to `https://ve.dolarapi.com/v1/dolares/oficial`
   - Returns `{ rate: number, source: string }` on success
   - Returns `{ error: "...", fallback: true }` with HTTP 200 if all sources fail (so the frontend doesn't crash)
   - Adds 5-minute in-memory caching to avoid hammering the upstream APIs

3. **Update `src/context/CurrencyContext.tsx`**:
   - Replace the two `api.allorigins.win` calls with a single call to the edge function via the Supabase client
   - On success → set `bcvRate`
   - On failure → keep `bcvRate = null` (USD pricing keeps working; the VES toggle gracefully shows USD until rate loads)
   - Add a `localStorage` cache of the last known rate + timestamp so users get an instant rate on reload (refresh in background)

4. **Surface staleness in the UI** (small touch): in `TopNav` where the BCV rate is displayed, if the cached rate is older than 24h, append a subtle "(actualizando...)" hint.

### Files affected

- `supabase/functions/get-bcv-rate/index.ts` (new)
- `supabase/config.toml` (register function, public — no JWT required)
- `src/context/CurrencyContext.tsx` (swap fetch logic + add localStorage cache)
- `src/components/TopNav.tsx` (minor — staleness hint, optional)

### Why this is better than the current setup

| Current | After |
|---|---|
| Depends on `allorigins.win` (down today) | Direct server-to-server, no proxy |
| 2 sources | 3 sources with clean fallback |
| No caching → refetches every page load | 5-min server cache + localStorage |
| Silent failure | Graceful degradation + stale-rate hint |

No API keys needed — all three rate sources are public and free.
