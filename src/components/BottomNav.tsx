import { useLocation, useNavigate } from "react-router-dom";
import { Home, UtensilsCrossed, Cake, Wine, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navItems = [
  { path: "/", icon: Home, label: "Inicio" },
  { path: "/cocina", icon: UtensilsCrossed, label: "Cocina" },
  { path: "/postres", icon: Cake, label: "Postres" },
  { path: "/bebidas", icon: Wine, label: "Bebidas" },
  { path: "/carrito", icon: ShoppingCart, label: "Carrito" },
];

const BottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-dark border-t border-gold/20 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map(({ path, icon: Icon, label }) => {
          const isActive = location.pathname === path;
          const isCart = path === "/carrito";
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`flex flex-col items-center justify-center gap-0.5 flex-1 py-2 transition-all duration-300 ${
                isActive ? "text-gold" : "text-cream/60 hover:text-cream/90"
              }`}
            >
              <div className="relative">
                <Icon className="w-5 h-5" strokeWidth={1.5} />
                {isCart && totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-gold text-primary text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse-gold">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-body">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
