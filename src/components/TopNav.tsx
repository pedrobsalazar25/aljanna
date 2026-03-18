import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  X,
  Home,
  UtensilsCrossed,
  Cake,
  Wine,
  ShoppingCart,
  CalendarDays,
  Phone,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { useCart } from "@/context/CartContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const menuLinks = [
  { path: "/", icon: Home, label: "Inicio" },
  { path: "/eventos", icon: CalendarDays, label: "Eventos y Promociones" },
  { path: "/cocina", icon: UtensilsCrossed, label: "Cocina" },
  { path: "/postres", icon: Cake, label: "Postres" },
  { path: "/bebidas", icon: Wine, label: "Bebidas" },
  { path: "/carrito", icon: ShoppingCart, label: "Carrito" },
];

const socialLinks = [
  {
    label: "Facebook",
    url: "https://www.facebook.com/100083310100869/?locale=ps_AF",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    url: "https://www.instagram.com/aljanna.sweet/",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

const TopNav = () => {
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const [searchOpen, setSearchOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-gold/20">
      <div className="flex items-center justify-between h-14 max-w-lg mx-auto px-4">
        {/* Hamburger */}
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild>
            <button className="text-cream/80 hover:text-gold transition-colors p-1">
              <Menu className="w-6 h-6" strokeWidth={1.5} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-primary/95 backdrop-blur-xl border-gold/20 w-72 p-0">
            <SheetHeader className="p-5 pb-2">
              <SheetTitle className="flex items-center gap-3">
                <img src={logo} alt="Al Janna Sweet" className="h-10 object-contain" />
              </SheetTitle>
            </SheetHeader>

            <div className="flex flex-col py-2">
              {menuLinks.map(({ path, icon: Icon, label }) => (
                <button
                  key={path}
                  onClick={() => {
                    navigate(path);
                    setSheetOpen(false);
                  }}
                  className="flex items-center gap-4 px-6 py-3 text-cream/70 hover:text-gold hover:bg-gold/10 transition-all font-body text-sm"
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                  <span>{label}</span>
                  {path === "/carrito" && totalItems > 0 && (
                    <span className="ml-auto bg-gold text-primary text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              ))}

              {/* Contact */}
              <button
                onClick={() => {
                  const el = document.getElementById("contact-section");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  } else {
                    navigate("/");
                    setTimeout(() => document.getElementById("contact-section")?.scrollIntoView({ behavior: "smooth" }), 300);
                  }
                  setSheetOpen(false);
                }}
                className="flex items-center gap-4 px-6 py-3 text-cream/70 hover:text-gold hover:bg-gold/10 transition-all font-body text-sm"
              >
                <Phone className="w-5 h-5" strokeWidth={1.5} />
                <span>Contáctanos</span>
              </button>

              {/* Divider */}
              <div className="my-3 mx-6 border-t border-gold/15" />

              {/* Social */}
              <p className="px-6 text-[10px] uppercase tracking-widest text-cream/40 font-body mb-2">
                Síguenos
              </p>
              <div className="flex gap-4 px-6">
                {socialLinks.map(({ label, url, icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream/50 hover:text-gold transition-colors"
                    aria-label={label}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <button onClick={() => navigate("/")} className="flex items-center">
          <img src={logo} alt="Al Janna" className="h-10 object-contain" />
        </button>

        {/* Search toggle */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="text-cream/80 hover:text-gold transition-colors p-1"
        >
          {searchOpen ? (
            <X className="w-5 h-5" strokeWidth={1.5} />
          ) : (
            <Search className="w-5 h-5" strokeWidth={1.5} />
          )}
        </button>
      </div>

      {/* Search bar (expandable) */}
      {searchOpen && (
        <div className="px-4 pb-3 animate-fade-up">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream/40" />
            <input
              autoFocus
              type="text"
              placeholder="Buscar platos, postres, bebidas..."
              className="w-full bg-cream/10 border border-gold/20 rounded-full pl-9 pr-4 py-2 text-sm text-cream placeholder:text-cream/40 font-body focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default TopNav;
