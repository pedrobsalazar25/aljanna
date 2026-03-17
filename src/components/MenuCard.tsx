import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";

interface MenuCardProps {
  item: MenuItem;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const navigate = useNavigate();
  const { addItem } = useCart();

  return (
    <div
      className="glass-gold rounded-xl overflow-hidden cursor-pointer group animate-fade-up"
      onClick={() => navigate(`/plato/${item.id}`)}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        {item.isChefRecommendation && (
          <span className="absolute top-2 left-2 bg-gold text-primary text-[10px] font-bold px-2 py-0.5 rounded-full font-body">
            ⭐ Chef
          </span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-heading text-sm font-semibold text-foreground truncate">{item.name}</h3>
        <p className="text-muted-foreground text-xs mt-1 line-clamp-2 font-body">{item.description}</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-gold font-heading font-bold text-lg">${item.price.toFixed(2)}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(item);
            }}
            className="w-8 h-8 rounded-full border border-gold text-gold flex items-center justify-center hover:bg-gold hover:text-primary transition-all"
            aria-label={`Agregar ${item.name}`}
          >
            <Plus className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
