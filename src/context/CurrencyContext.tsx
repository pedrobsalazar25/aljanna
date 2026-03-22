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
      try {
        const res = await fetch("https://pydolarve.org/api/v2/dollar?page=bcv", {
          headers: { Accept: "application/json" },
        });
        const data = await res.json();
        const rate = data?.monitors?.usd?.price;
        if (rate) setBcvRate(parseFloat(rate));
      } catch {
        try {
          const res2 = await fetch("https://bcv-api.rafnixg.dev/rates/");
          const data2 = await res2.json();
          if (data2?.USD?.rate) setBcvRate(parseFloat(data2.USD.rate));
          else if (data2?.rates?.USD) setBcvRate(parseFloat(data2.rates.USD));
          else if (typeof data2?.USD === "number") setBcvRate(data2.USD);
        } catch { /* silent */ }
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
