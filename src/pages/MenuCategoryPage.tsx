import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getItemsByCategory, type Category } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";

const categoryLabels: Record<Category, string> = {
  cocina: "Cocina Turca",
  postres: "Postres",
  bebidas: "Bebidas",
};

const categoryDescriptions: Record<Category, string> = {
  cocina: "Sabores auténticos de la tradición otomana",
  postres: "Dulzuras que endulzan el alma",
  bebidas: "Bebidas tradicionales y refrescantes",
};

interface MenuCategoryPageProps {
  category: Category;
}

const MenuCategoryPage = ({ category }: MenuCategoryPageProps) => {
  const navigate = useNavigate();
  const items = getItemsByCategory(category);

  return (
    <div className="pb-20 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 glass-dark px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-cream/80 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <div>
          <h1 className="font-body text-lg font-bold text-cream">{categoryLabels[category]}</h1>
          <p className="text-cream/50 text-[10px] font-body">{categoryDescriptions[category]}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="px-4 mt-4 grid grid-cols-2 gap-3">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategoryPage;
