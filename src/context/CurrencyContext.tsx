import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";

type Currency = "USD" | "VES";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  bcvRate: number | null;
  formatCurrency: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const RATE_CACHE_KEY = "bcvRateCache";

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = localStorage.getItem("currency");
    return stored === "VES" ? "VES" : "USD";
  });
  const [bcvRate, setBcvRate] = useState<number | null>(() => {
    try {
      const cached = localStorage.getItem(RATE_CACHE_KEY);
      if (cached) {
        const { rate } = JSON.parse(cached);
        if (typeof rate === "number" && rate > 0) return rate;
      }
    } catch { /* ignore */ }
    return null;
  });

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c);
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      try {
        const { data, error } = await supabase.functions.invoke("get-bcv-rate");
        if (error) {
          console.error("Failed to fetch BCV rate:", error);
          return;
        }
        if (data?.rate && typeof data.rate === "number" && data.rate > 0) {
          setBcvRate(data.rate);
          localStorage.setItem(
            RATE_CACHE_KEY,
            JSON.stringify({ rate: data.rate, fetchedAt: Date.now() })
          );
        }
      } catch (e) {
        console.error("Rate fetch error:", e);
      }
    };
    fetchRate();
  }, []);

  const formatCurrency = useCallback(
    (usdPrice: number): string => {
      if (currency === "VES" && bcvRate) {
        const ves = usdPrice * bcvRate;
        return `${ves.toLocaleString("es-VE", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Bs.`;
      }
      return `$${usdPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    [currency, bcvRate]
  );

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, bcvRate, formatCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
};
