import { useLocation, useNavigate } from "react-router-dom";
import { Home, UtensilsCrossed, Cake, Wine, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const leftItems = [
  { path: "/", icon: Home, label: "Inicio" },
  { path: "/cocina", icon: UtensilsCrossed, label: "Cocina" },
];

const rightItems = [
  { path: "/postres", icon: Cake, label: "Postres" },
  { path: "/bebidas", icon: Wine, label: "Bebidas" },
];

const centerItem = { path: "/carrito", icon: ShoppingCart, label: "Carrito" };

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const renderItem = (item: typeof leftItems[0], isCenter = false) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    if (isCenter) {
      return (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className="relative -mt-7 flex flex-col items-center justify-center"
        >
          <div className="w-14 h-14 rounded-full bg-white border-[3px] border-white shadow-lg flex items-center justify-center">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center ${isActive ? "bg-gold" : "bg-black"}`}>
              <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-white"}`} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-gold text-black text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse-gold">
                  {totalItems}
                </span>
              )}
            </div>
          </div>
          <span className={`text-[10px] font-body mt-0.5 ${isActive ? "text-gold" : "text-cream/60"}`}>{item.label}</span>
        </button>
      );
    }

    return (
      <button
        key={item.path}
        onClick={() => navigate(item.path)}
        className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-all duration-300 ${
          isActive ? "text-gold" : "text-cream/60 hover:text-cream/90"
        }`}
      >
        <Icon className="w-5 h-5" strokeWidth={1.5} />
        <span className="text-[10px] font-body">{item.label}</span>
      </button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 safe-area-bottom">
      <div className="max-w-lg mx-auto px-4 pb-2">
        <div className="relative bg-black rounded-[28px] border border-gold/20 shadow-[0_-4px_20px_rgba(0,0,0,0.5)] flex items-center justify-around h-16 px-2">
          {leftItems.map((item) => renderItem(item))}
          {renderItem(centerItem, true)}
          {rightItems.map((item) => renderItem(item))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
