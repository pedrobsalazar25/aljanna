import kebabPlatter from "@/assets/dishes/kebab-platter.jpg";
import shawarma from "@/assets/dishes/shawarma.jpg";
import lahmacun from "@/assets/dishes/lahmacun.jpg";
import lentilSoup from "@/assets/dishes/lentil-soup.jpg";
import hummus from "@/assets/dishes/hummus.jpg";
import falafel from "@/assets/dishes/falafel.jpg";
import baklava from "@/assets/dishes/baklava.jpg";
import kunefe from "@/assets/dishes/kunefe.jpg";
import sutlac from "@/assets/dishes/sutlac.jpg";
import turkishTea from "@/assets/dishes/turkish-tea.jpg";
import turkishCoffee from "@/assets/dishes/turkish-coffee.jpg";
import ayran from "@/assets/dishes/ayran.jpg";
import limonada from "@/assets/dishes/limonada.jpg";

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
  // COCINA
  {
    id: "kebab-platter",
    name: "Plato de Kebab Mixto",
    description: "Selección de kebabs de cordero y pollo a la parrilla, servidos con arroz aromático, vegetales asados y salsa de yogur casera.",
    price: 18.50,
    image: kebabPlatter,
    category: "cocina",
    isChefRecommendation: true,
    pairsWellWith: ["ayran", "te-turco"],
  },
  {
    id: "shawarma",
    name: "Shawarma de Pollo",
    description: "Tiernas rebanadas de pollo marinado en especias orientales, envueltas en pan pita con vegetales frescos y salsa tahini.",
    price: 12.00,
    image: shawarma,
    category: "cocina",
    pairsWellWith: ["limonada", "ayran"],
  },
  {
    id: "lahmacun",
    name: "Lahmacun",
    description: "Pizza turca tradicional con carne molida especiada, hierbas frescas y un toque de limón. Crujiente y aromática.",
    price: 9.50,
    image: lahmacun,
    category: "cocina",
    pairsWellWith: ["ayran", "te-turco"],
  },
  {
    id: "sopa-lentejas",
    name: "Sopa de Lentejas",
    description: "Sopa tradicional turca de lentejas rojas, suavemente especiada con comino y pimentón, servida con limón fresco.",
    price: 7.00,
    image: lentilSoup,
    category: "cocina",
    pairsWellWith: ["lahmacun"],
  },
  {
    id: "hummus",
    name: "Hummus Clásico",
    description: "Crema sedosa de garbanzos con tahini, aceite de oliva virgen extra, pimentón ahumado y pan pita caliente.",
    price: 8.00,
    image: hummus,
    category: "cocina",
    pairsWellWith: ["falafel", "lahmacun"],
  },
  {
    id: "falafel",
    name: "Falafel",
    description: "Croquetas crujientes de garbanzos y hierbas, servidas con ensalada fresca y salsa tahini. Opción vegetariana estrella.",
    price: 10.00,
    image: falafel,
    category: "cocina",
    isChefRecommendation: true,
    pairsWellWith: ["hummus", "limonada"],
  },
  // POSTRES
  {
    id: "baklava",
    name: "Baklava de Pistacho",
    description: "Capas crujientes de masa filo rellenas de pistacho triturado, bañadas en almíbar de miel y agua de rosas.",
    price: 8.50,
    image: baklava,
    category: "postres",
    isChefRecommendation: true,
    pairsWellWith: ["cafe-turco", "te-turco"],
  },
  {
    id: "kunefe",
    name: "Künefe",
    description: "Postre caliente de queso fundido entre hilos de masa kadayif, bañado en almíbar dulce y decorado con pistacho.",
    price: 10.00,
    image: kunefe,
    category: "postres",
    pairsWellWith: ["cafe-turco"],
  },
  {
    id: "sutlac",
    name: "Sütlaç",
    description: "Arroz con leche turco horneado, con una capa caramelizada. Cremoso, reconfortante y con un toque de vainilla.",
    price: 7.50,
    image: sutlac,
    category: "postres",
    pairsWellWith: ["te-turco"],
  },
  // BEBIDAS
  {
    id: "te-turco",
    name: "Té Turco",
    description: "Té negro tradicional servido en vaso de tulipán con borde dorado. Intenso, aromático y reconfortante.",
    price: 3.50,
    image: turkishTea,
    category: "bebidas",
    pairsWellWith: ["baklava", "kunefe"],
  },
  {
    id: "cafe-turco",
    name: "Café Turco",
    description: "Preparado en cezve de cobre tradicional, con cardamomo y servido con un dulce de lokum. Una experiencia única.",
    price: 4.50,
    image: turkishCoffee,
    category: "bebidas",
    isChefRecommendation: true,
    pairsWellWith: ["baklava", "kunefe"],
  },
  {
    id: "ayran",
    name: "Ayran",
    description: "Bebida refrescante de yogur batido con sal y menta. El acompañante perfecto para platos especiados.",
    price: 3.00,
    image: ayran,
    category: "bebidas",
    pairsWellWith: ["kebab-platter", "shawarma"],
  },
  {
    id: "limonada",
    name: "Limonada con Menta",
    description: "Limonada fresca preparada con limones naturales, hojas de menta y un toque de miel. Servida con hielo.",
    price: 4.00,
    image: limonada,
    category: "bebidas",
    pairsWellWith: ["falafel", "shawarma"],
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
