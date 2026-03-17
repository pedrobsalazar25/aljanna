import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Share2 } from "lucide-react";
import { useState } from "react";
import { getItemById, getPairsWellWith } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import MenuCard from "@/components/MenuCard";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);

  const item = getItemById(id || "");
  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground font-body">Plato no encontrado</p>
      </div>
    );
  }

  const pairs = getPairsWellWith(item);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(item);
    navigate(-1);
  };

  const handleShareWhatsApp = () => {
    const text = `¡Mira este plato de Al Janna Sweet! 🍽️\n${item.name} - $${item.price.toFixed(2)}\n${item.description}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handleShareInstagram = () => {
    // Instagram doesn't have a direct share URL for text, copy to clipboard
    navigator.clipboard?.writeText(`${item.name} - Al Janna Sweet 🍽️`);
  };

  return (
    <div className="pb-20 min-h-screen">
      {/* Hero Image */}
      <div className="relative h-[45vh] min-h-[320px]">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30" />
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 rounded-full glass flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5 text-cream" strokeWidth={1.5} />
        </button>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-cream drop-shadow-lg">{item.name}</h1>
          {item.isChefRecommendation && (
            <span className="inline-block mt-1 bg-gold text-primary text-[10px] font-bold px-2 py-0.5 rounded-full font-body">
              ⭐ Recomendación del Chef
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <section className="px-5 mt-4">
        <p className="text-foreground/80 font-body text-sm leading-relaxed">{item.description}</p>

        {/* Share */}
        <div className="flex items-center gap-3 mt-4">
          <span className="text-xs text-muted-foreground font-body">Compartir:</span>
          <button onClick={handleShareWhatsApp} className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-primary transition-all">
            <Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </section>

      {/* Action Block */}
      <section className="px-5 mt-6">
        <div className="glass-gold rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground font-body">Precio</p>
            <p className="text-gold font-heading text-2xl font-bold">${item.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 border border-gold/30 rounded-full px-2 py-1">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
              >
                <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
              </button>
              <span className="text-sm font-body font-bold w-6 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-gold hover:bg-gold/10 transition-colors"
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

      {/* Pairs Well With */}
      {pairs.length > 0 && (
        <section className="px-4 mt-8">
          <h2 className="font-heading text-lg font-bold text-foreground mb-3">Combina Bien Con</h2>
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {pairs.map((p) => (
              <div key={p.id} className="min-w-[160px] flex-shrink-0">
                <MenuCard item={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductPage;
