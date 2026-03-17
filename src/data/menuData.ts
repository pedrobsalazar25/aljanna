// Real dish images (uploaded)
import baklavaImg from "@/assets/dishes/Baklava.png";
import borekImg from "@/assets/dishes/Borek.png";
import cervezaBrahvaImg from "@/assets/dishes/Cerveza_Brahva.png";
import cervezaMacutoImg from "@/assets/dishes/Cerveza_Macuto.png";
import cervezaPolarImg from "@/assets/dishes/Cerveza_Polar.png";
import cervezaSoleraImg from "@/assets/dishes/Cerveza_Solera.png";
import crispyHoneyImg from "@/assets/dishes/Crispy_Honey_Pastry.png";
import dedosAzucarImg from "@/assets/dishes/Dedos_de_Azucar.png";
import deliciasTurcasImg from "@/assets/dishes/Delicias_Turcas.png";
import donerKebabImg from "@/assets/dishes/Doner_Kebab.png";
import halvaImg from "@/assets/dishes/Halva.png";
import kadayifImg from "@/assets/dishes/Kadayif.png";
import kebabAdanaImg from "@/assets/dishes/Kebab_Adana.png";
import kofteImg from "@/assets/dishes/Kofte.png";
import kunafaImg from "@/assets/dishes/Kunafa.png";
import lahmacunImg from "@/assets/dishes/Lahmacun.png";
import mezeImg from "@/assets/dishes/Meze.png";
import pescadoImg from "@/assets/dishes/Pescado_a_la_Parrilla.png";

// Placeholder images for items not yet uploaded
import tulumbaPlaceholder from "@/assets/dishes/Crispy_Honey_Pastry.png";
import revaniPlaceholder from "@/assets/dishes/baklava.jpg";
import sutlacPlaceholder from "@/assets/dishes/sutlac.jpg";
import profiterolesPlaceholder from "@/assets/dishes/baklava.jpg";
import shishKebabPlaceholder from "@/assets/dishes/Kebab_Adana.png";
import pidePlaceholder from "@/assets/dishes/Lahmacun.png";
import sopaLentejasPlaceholder from "@/assets/dishes/lentil-soup.jpg";
import regionalPlaceholder from "@/assets/dishes/Cerveza_Polar.png";
import macallanPlaceholder from "@/assets/dishes/turkish-coffee.jpg";
import glenmorangiePlaceholder from "@/assets/dishes/turkish-coffee.jpg";
import glenfiddichPlaceholder from "@/assets/dishes/turkish-coffee.jpg";
import johnnieWalkerPlaceholder from "@/assets/dishes/turkish-coffee.jpg";
import balveniePlaceholder from "@/assets/dishes/turkish-coffee.jpg";

import heroBg from "@/assets/hero-bg.jpg";
import eventNight from "@/assets/event-night.jpg";

export { heroBg, eventNight };

export type Category = "cocina" | "postres" | "bebidas";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: Category;
  isChefRecommendation?: boolean;
  pairsWellWith?: string[];
}

export const menuItems: MenuItem[] = [
  // ===== POSTRES =====
  {
    id: "baklava",
    name: "Baklava",
    description: "Hojaldre crujiente con capas de miel y pistachos",
    price: 8.99,
    image: baklavaImg,
    category: "postres",
    isChefRecommendation: true,
    pairsWellWith: ["cerveza-polar", "cerveza-brahva"],
  },
  {
    id: "kunafa",
    name: "Kunafa",
    description: "Masa desmenuzada con relleno de crema y pistachos",
    price: 7.99,
    image: kunafaImg,
    category: "postres",
    isChefRecommendation: true,
    pairsWellWith: ["cerveza-macuto"],
  },
  {
    id: "delicias-turcas",
    name: "Delicias Turcas",
    description: "Cubos de gelatina cubiertos con azúcar en polvo",
    price: 5.99,
    image: deliciasTurcasImg,
    category: "postres",
    pairsWellWith: ["cerveza-polar"],
  },
  {
    id: "tulumba",
    name: "Tulumba",
    description: "Masa frita empapada en almíbar de miel",
    price: 6.99,
    image: tulumbaPlaceholder,
    category: "postres",
    pairsWellWith: ["cerveza-brahva"],
  },
  {
    id: "halva",
    name: "Halva",
    description: "Pasta cremosa de sésamo con adorno de pistacho",
    price: 7.49,
    image: halvaImg,
    category: "postres",
    pairsWellWith: ["cerveza-macuto"],
  },
  {
    id: "dedos-de-azucar",
    name: "Dedos de Azúcar",
    description: "Dedos de masa frita crujiente con almíbar",
    price: 6.49,
    image: dedosAzucarImg,
    category: "postres",
    pairsWellWith: ["cerveza-polar"],
  },
  {
    id: "revani",
    name: "Revani",
    description: "Bizcocho de sémola con cobertura de coco",
    price: 5.99,
    image: revaniPlaceholder,
    category: "postres",
    pairsWellWith: ["cerveza-brahva"],
  },
  {
    id: "kadayif",
    name: "Kadayif",
    description: "Masa desmenuzada crujiente con frutos secos y miel",
    price: 8.49,
    image: kadayifImg,
    category: "postres",
    pairsWellWith: ["cerveza-macuto"],
  },
  {
    id: "sutlac",
    name: "Sütlaç",
    description: "Budín cremoso de arroz con canela y pistacho",
    price: 4.99,
    image: sutlacPlaceholder,
    category: "postres",
    pairsWellWith: ["cerveza-polar"],
  },
  {
    id: "profiteroles",
    name: "Profiteroles",
    description: "Bolitas de masa rellenas de crema con chocolate",
    price: 7.99,
    image: profiterolesPlaceholder,
    category: "postres",
    pairsWellWith: ["cerveza-brahva"],
  },

  // ===== COCINA =====
  {
    id: "meze",
    name: "Meze",
    description: "Tabla de aperitivos turcos variados con pan pita",
    price: 12.99,
    image: mezeImg,
    category: "cocina",
    isChefRecommendation: true,
    pairsWellWith: ["cerveza-polar", "cerveza-macuto"],
  },
  {
    id: "kebab-adana",
    name: "Kebab Adana",
    description: "Carne molida a la parrilla con hierbas y especias",
    price: 13.99,
    image: kebabAdanaImg,
    category: "cocina",
    isChefRecommendation: true,
    pairsWellWith: ["cerveza-brahva", "cerveza-polar"],
  },
  {
    id: "shish-kebab",
    name: "Shish Kebab",
    description: "Brochetas de carne y verduras a la parrilla",
    price: 14.99,
    image: shishKebabPlaceholder,
    category: "cocina",
    pairsWellWith: ["cerveza-macuto", "cerveza-polar"],
  },
  {
    id: "doner-kebab",
    name: "Döner Kebab",
    description: "Carne asada en rodajas con lechuga y tomate",
    price: 11.99,
    image: donerKebabImg,
    category: "cocina",
    pairsWellWith: ["cerveza-brahva", "cerveza-macuto"],
  },
  {
    id: "kofte",
    name: "Köfte",
    description: "Albóndigas de cordero a la parrilla con hierbas",
    price: 12.49,
    image: kofteImg,
    category: "cocina",
    pairsWellWith: ["cerveza-polar"],
  },
  {
    id: "lahmacun",
    name: "Lahmacun",
    description: "Pizza turca fina con carne molida",
    price: 9.99,
    image: lahmacunPlaceholder,
    category: "cocina",
    pairsWellWith: ["cerveza-brahva"],
  },
  {
    id: "pide",
    name: "Pide",
    description: "Masa en forma de bote con queso y carne",
    price: 10.99,
    image: pidePlaceholder,
    category: "cocina",
    pairsWellWith: ["cerveza-macuto"],
  },
  {
    id: "borek",
    name: "Börek",
    description: "Rollos crujientes de masa con queso y espinaca",
    price: 9.49,
    image: borekImg,
    category: "cocina",
    pairsWellWith: ["cerveza-polar", "cerveza-brahva"],
  },
  {
    id: "sopa-lentejas",
    name: "Sopa de Lentejas",
    description: "Sopa cremosa de lentejas rojas con especias",
    price: 6.99,
    image: sopaLentejasPlaceholder,
    category: "cocina",
    pairsWellWith: ["borek", "lahmacun"],
  },
  {
    id: "pescado-parrilla",
    name: "Pescado a la Parrilla",
    description: "Lubina fresca a la parrilla con limón y hierbas",
    price: 15.99,
    image: pescadoPlaceholder,
    category: "cocina",
    pairsWellWith: ["cerveza-polar", "cerveza-macuto"],
  },

  // ===== BEBIDAS =====
  {
    id: "cerveza-polar",
    name: "Cerveza Polar",
    description: "Cerveza lager venezolana dorada y refrescante",
    price: 4.99,
    image: cervezaPolarImg,
    category: "bebidas",
    pairsWellWith: ["kebab-adana", "doner-kebab"],
  },
  {
    id: "regional",
    name: "Regional",
    description: "Cerveza venezolana de sabor suave y equilibrado",
    price: 4.49,
    image: regionalPlaceholder,
    category: "bebidas",
    pairsWellWith: ["shish-kebab", "borek"],
  },
  {
    id: "cerveza-solera",
    name: "Cerveza Solera",
    description: "Cerveza venezolana con cuerpo y carácter",
    price: 4.99,
    image: soleraPlaceholder,
    category: "bebidas",
    pairsWellWith: ["kofte", "meze"],
  },
  {
    id: "cerveza-macuto",
    name: "Cerveza Macuto",
    description: "Cerveza venezolana artesanal con toque especial",
    price: 5.49,
    image: cervezaMacutoImg,
    category: "bebidas",
    pairsWellWith: ["kebab-adana", "pide"],
  },
  {
    id: "cerveza-brahva",
    name: "Cerveza Brahva",
    description: "Cerveza venezolana premium con sabor robusto",
    price: 5.99,
    image: cervezaBrahvaImg,
    category: "bebidas",
    pairsWellWith: ["doner-kebab", "lahmacun"],
  },
  {
    id: "whisky-macallan",
    name: "Whisky Macallan",
    description: "Whisky escocés premium de 18 años",
    price: 89.99,
    image: macallanPlaceholder,
    category: "bebidas",
    pairsWellWith: ["baklava"],
  },
  {
    id: "whisky-glenmorangie",
    name: "Whisky Glenmorangie",
    description: "Whisky escocés suave y elegante de 10 años",
    price: 49.99,
    image: glenmorangiePlaceholder,
    category: "bebidas",
    pairsWellWith: ["kunafa"],
  },
  {
    id: "whisky-glenfiddich",
    name: "Whisky Glenfiddich",
    description: "Whisky escocés de malta con sabor complejo",
    price: 59.99,
    image: glenfiddichPlaceholder,
    category: "bebidas",
    pairsWellWith: ["baklava"],
  },
  {
    id: "whisky-johnnie-walker",
    name: "Whisky Johnnie Walker",
    description: "Whisky escocés blended de renombre mundial",
    price: 39.99,
    image: johnnieWalkerPlaceholder,
    category: "bebidas",
    pairsWellWith: ["kadayif"],
  },
  {
    id: "whisky-balvenie",
    name: "Whisky Balvenie",
    description: "Whisky escocés de malta con carácter distintivo",
    price: 69.99,
    image: balveniePlaceholder,
    category: "bebidas",
    pairsWellWith: ["profiteroles"],
  },
];

export const getItemsByCategory = (category: Category) =>
  menuItems.filter((item) => item.category === category);

export const getChefRecommendations = () =>
  menuItems.filter((item) => item.isChefRecommendation);

export const getItemById = (id: string) =>
  menuItems.find((item) => item.id === id);

export const getPairsWellWith = (item: MenuItem) =>
  (item.pairsWellWith || [])
    .map((id) => getItemById(id))
    .filter(Boolean) as MenuItem[];

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
}

export const events: EventItem[] = [
  {
    id: "1",
    title: "Noche de Música en Vivo",
    description: "Disfruta de música tradicional turca mientras saboreas nuestros mejores platos. Todos los viernes a partir de las 8pm.",
    date: "Todos los Viernes",
    image: "",
  },
  {
    id: "2",
    title: "Menú Degustación Otomano",
    description: "Un recorrido gastronómico por la cocina otomana con 7 platos exclusivos maridados con bebidas tradicionales.",
    date: "Último Sábado del Mes",
    image: "",
  },
  {
    id: "3",
    title: "Taller de Baklava",
    description: "Aprende a preparar el auténtico baklava turco con nuestro chef. Incluye degustación y materiales.",
    date: "15 de Abril, 2026",
    image: "",
  },
];
