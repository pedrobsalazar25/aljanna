import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ChevronRight } from "lucide-react";
import { useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { getItemById, getPairsWellWith, getItemsByCategory } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import MenuCard from "@/components/MenuCard";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [shareOpen, setShareOpen] = useState(false);

  const item = getItemById(id || "");
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Plato no encontrado</p>
      </div>
    );
  }

  const pairs = getPairsWellWith(item);
  const categoryItems = getItemsByCategory(item.category).filter((i) => i.id !== item.id);
  const morFromCategory = categoryItems.slice(0, 4);

  const categoryLabels: Record<string, string> = {
    cocina: "Cocina",
    postres: "Postres",
    bebidas: "Bebidas",
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(item);
    navigate(-1);
  };

  const shareText = `¡Mira este plato de Al Janna Sweet! 🍽️\n${item.name} - $${item.price.toFixed(2)}\n${item.description}`;
  const shareUrl = window.location.href;

  const handleShareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank");
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?quote=${encodeURIComponent(shareText)}&u=${encodeURIComponent(shareUrl)}`, "_blank");
  };

  const handleShareInstagram = () => {
    navigator.clipboard?.writeText(`${item.name} - Al Janna Sweet 🍽️ ${shareUrl}`);
    alert("¡Enlace copiado! Pégalo en tu historia o mensaje de Instagram.");
  };

  return (
    <div className="pb-20 min-h-screen bg-cream">
      {/* Hero Image */}
      <div className="relative h-[54vh] min-h-[384px] bg-cream">
        <div className="px-4 pt-4 pb-2">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.45)]" />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 w-10 h-10 rounded-full glass flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-cream" strokeWidth={1.5} />
        </button>
      </div>

      {/* Title below hero */}
      <div className="px-5 mt-3">
        <h1 className="font-body text-2xl md:text-3xl font-bold text-primary">{item.name}</h1>
        {item.isChefRecommendation && (
          <span className="inline-block mt-1 bg-accent text-primary text-[10px] font-bold px-2 py-0.5 rounded-full font-body">
            ⭐ Recomendación del Chef
          </span>
        )}
      </div>

      {/* Description */}
      <section className="px-5 mt-4">
        <p className="text-primary/80 font-body text-sm leading-relaxed">{item.description}</p>

        {/* Share */}
        <div className="relative mt-4">
          <button
            onClick={() => setShareOpen(!shareOpen)}
            className="flex items-center gap-2 text-primary/80 font-body text-sm font-semibold hover:opacity-60 transition-opacity"
          >
            📤 Recomiéndalo a un amigo
          </button>
          {shareOpen && (
            <div className="mt-2 flex gap-2 animate-fade-up">
              <button
                onClick={handleShareWhatsApp}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/30 text-xs font-body text-foreground hover:bg-accent/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#25D366]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </button>
              <button
                onClick={handleShareFacebook}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/30 text-xs font-body text-foreground hover:bg-accent/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#1877F2]">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
              <button
                onClick={handleShareInstagram}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent/30 text-xs font-body text-foreground hover:bg-accent/10 transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-[#E4405F]">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Action Block */}
      <section className="px-5 mt-6">
        <div className="bg-primary/5 border border-accent/20 rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-primary/60 font-body">Precio</p>
            <p className="text-accent font-body text-2xl font-bold">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-accent/30 rounded-full px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <span className="text-sm font-body font-bold w-6 text-center text-primary">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-primary hover:bg-primary/10 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="gold-gradient text-primary font-body font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              Agregar
            </button>
          </div>
        </div>
      </section>

      {/* Pairs Well With - Carousel with pause on hover */}
      {pairs.length > 0 && (
        <section className="px-4 mt-8">
          <h2 className="font-body text-lg font-bold text-primary mb-3">Combina Bien Con</h2>
          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
          >
            {pairs.map((p) => (
              <div
                key={p.id}
                className="min-w-[calc(50%-6px)] w-[calc(50%-6px)] flex-shrink-0 snap-start transition-transform hover:scale-[1.02] hover:z-10"
              >
                <MenuCard item={p} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* More from this category */}
      {morFromCategory.length > 0 && (
        <section className="px-4 mt-8 mb-4">
          <h2 className="font-body text-lg font-bold text-primary mb-3">
            Más de {categoryLabels[item.category]}
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {morFromCategory.map((p) => (
              <MenuCard key={p.id} item={p} />
            ))}
          </div>
          <Link
            to={`/${item.category}`}
            className="flex items-center justify-center gap-1 mt-4 text-accent font-body text-sm font-semibold hover:opacity-80 transition-opacity"
          >
            Ver todo en {categoryLabels[item.category]}
            <ChevronRight className="w-4 h-4" strokeWidth={1.5} />
          </Link>
        </section>
      )}
    </div>
  );
};

export default ProductPage;