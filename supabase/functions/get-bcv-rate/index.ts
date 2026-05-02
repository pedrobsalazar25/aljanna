import { corsHeaders } from "@supabase/supabase-js/cors";

interface CacheEntry {
  rate: number;
  source: string;
  fetchedAt: number;
}

let cache: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

async function tryPydolarve(): Promise<number | null> {
  try {
    const res = await fetch("https://pydolarve.org/api/v2/dollar?page=bcv", {
      headers: { "User-Agent": "Mozilla/5.0" },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const price = data?.monitors?.usd?.price;
    if (typeof price === "number") return price;
    if (typeof price === "string") return parseFloat(price);
    return null;
  } catch (e) {
    console.error("pydolarve failed:", e);
    return null;
  }
}

async function tryRafnixg(): Promise<number | null> {
  try {
    const res = await fetch("https://bcv-api.rafnixg.dev/rates/");
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data?.dollar === "number") return data.dollar;
    return null;
  } catch (e) {
    console.error("rafnixg failed:", e);
    return null;
  }
}

async function tryDolarApi(): Promise<number | null> {
  try {
    const res = await fetch("https://ve.dolarapi.com/v1/dolares/oficial");
    if (!res.ok) return null;
    const data = await res.json();
    if (typeof data?.promedio === "number") return data.promedio;
    return null;
  } catch (e) {
    console.error("dolarapi failed:", e);
    return null;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Serve from cache when fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return new Response(
      JSON.stringify({ rate: cache.rate, source: cache.source, cached: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }

  const sources: Array<[string, () => Promise<number | null>]> = [
    ["pydolarve", tryPydolarve],
    ["rafnixg", tryRafnixg],
    ["dolarapi", tryDolarApi],
  ];

  for (const [name, fn] of sources) {
    const rate = await fn();
    if (rate && rate > 0) {
      cache = { rate, source: name, fetchedAt: Date.now() };
      return new Response(
        JSON.stringify({ rate, source: name, cached: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }
  }

  // All sources failed — return stale cache if we have one
  if (cache) {
    return new Response(
      JSON.stringify({ rate: cache.rate, source: cache.source, cached: true, stale: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  }

  return new Response(
    JSON.stringify({ error: "RATE_SERVICE_UNAVAILABLE", fallback: true }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
  );
});