import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

type Currency = "USD" | "VES";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  bcvRate: number | null;
  formatCurrency: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrencyState] = useState<Currency>(() => {
    const stored = localStorage.getItem("currency");
    return stored === "VES" ? "VES" : "USD";
  });
  const [bcvRate, setBcvRate] = useState<number | null>(null);

  const setCurrency = useCallback((c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem("currency", c);
  }, []);

  useEffect(() => {
    const fetchRate = async () => {
      const apis = [
        "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://pydolarve.org/api/v2/dollar?page=bcv"),
        "https://api.allorigins.win/raw?url=" + encodeURIComponent("https://bcv-api.rafnixg.dev/rates/"),
      ];
      for (const url of apis) {
        try {
          const res = await fetch(url);
          const data = await res.json();
          // pydolarve format
          if (data?.monitors?.usd?.price) {
            setBcvRate(parseFloat(data.monitors.usd.price));
            return;
          }
          // rafnixg format
          if (data?.USD?.rate) { setBcvRate(parseFloat(data.USD.rate)); return; }
          if (data?.rates?.USD) { setBcvRate(parseFloat(data.rates.USD)); return; }
          if (typeof data?.USD === "number") { setBcvRate(data.USD); return; }
        } catch { /* try next */ }
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
