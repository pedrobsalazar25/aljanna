import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { UtensilsCrossed, Cake, Wine, MapPin, Clock, Phone, Mail } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import logo from "@/assets/logo.png";
import heroImage2 from "@/assets/hero_image_2.png";
import deliveryHero from "@/assets/delivery-hero.jpg";
import { heroBg, eventNight, getChefRecommendations, events } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";

const categories = [
  { path: "/cocina", icon: UtensilsCrossed, label: "Cocina", color: "from-gold-dark to-gold" },
  { path: "/postres", icon: Cake, label: "Postres", color: "from-gold to-gold-light" },
  { path: "/bebidas", icon: Wine, label: "Bebidas", color: "from-gold-light to-gold" },
];

const isOpenNow = () => {
  const now = new Date();
  const hour = now.getHours();
  return hour >= 11 && hour < 22;
};

const HomePage = () => {
  const navigate = useNavigate();
  const chefPicks = getChefRecommendations();
  const open = isOpenNow();
  const [heroApi, setHeroApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!heroApi) return;
    setCount(heroApi.scrollSnapList().length);
    setCurrent(heroApi.selectedScrollSnap());
    heroApi.on("select", () => setCurrent(heroApi.selectedScrollSnap()));
  }, [heroApi]);

  return (
    <div className="pb-20">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full h-full"
          setApi={setHeroApi}
        >
          <CarouselContent className="ml-0 h-full">
            {/* Slide 1 */}
            <CarouselItem className="pl-0 relative h-[70vh] min-h-[480px] flex items-center justify-center">
              <img src={heroBg} alt="Al Janna Restaurant" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
              <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-up">
                <img src={logo} alt="Al Janna Sweet" className="w-48 md:w-64 mb-4 drop-shadow-2xl" />
                <p className="text-cream/80 font-body text-sm md:text-base max-w-md tracking-wide">
                  Auténtica cocina turca en el corazón de Maturín
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <span className={`w-2 h-2 rounded-full ${open ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                  <span className="text-cream/70 text-xs font-body">{open ? "Abierto Ahora" : "Cerrado"} · 11:00 AM - 10:00 PM</span>
                </div>
              </div>
            </CarouselItem>
            {/* Slide 2 */}
            <CarouselItem className="pl-0 relative h-[85vh] min-h-[560px] flex items-center justify-center">
              <img src={heroImage2} alt="Delivery Al Janna" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
              <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-up">
                <h2 className="font-body text-3xl md:text-4xl font-bold text-cream mb-3 drop-shadow-lg">
                  Delicias que llegan volando.
                </h2>
                <p className="text-cream/80 font-body text-sm md:text-base max-w-md tracking-wide">
                  Nuestra plataforma es tan simple que lo único difícil será elegir qué comer.
                </p>
              </div>
            </CarouselItem>
            {/* Slide 3 - Delivery */}
            <CarouselItem className="pl-0 relative h-[80vh] min-h-[520px] flex items-center justify-center">
              <img src={deliveryHero} alt="Delivery Al Janna" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background" />
              <div className="relative z-10 flex flex-col items-center text-center px-6 animate-fade-up">
                <h2 className="font-body text-3xl md:text-4xl font-bold text-cream mb-3 drop-shadow-lg">
                  Pide, confirma y disfruta.
                </h2>
                <p className="text-cream/80 font-body text-sm md:text-base max-w-md tracking-wide">
                  Arma tu pedido, confírmalo por WhatsApp y recibe tu comida favorita en la puerta de tu casa.
                </p>
              </div>
            </CarouselItem>
          </CarouselContent>
          {/* Dot indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                onClick={() => heroApi?.scrollTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current ? "bg-gold w-6" : "bg-cream/40 hover:bg-cream/60"
                }`}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </Carousel>
      </section>

      {/* Category Circles */}
      <section className="px-4 -mt-8 relative z-10">
        <div className="glass-dark border border-gold/20 rounded-full px-6 py-3 flex justify-center gap-8 mx-auto w-fit shadow-xl">
          {categories.map(({ path, icon: Icon, label }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="flex flex-col items-center gap-1.5 group"
            >
              <Icon className="w-8 h-8 md:w-10 md:h-10 text-gold group-hover:scale-110 transition-transform" strokeWidth={1.5} />
              <span className="text-[10px] font-body text-foreground font-medium">{label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Chef's Recommendations */}
      <section className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-body text-xl font-bold text-foreground">Recomendación del Chef</h2>
          <span className="text-gold text-xs font-body">⭐ Selección especial</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {chefPicks.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Events Carousel */}
      <section className="px-4 mt-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-body text-xl font-bold text-foreground">Eventos y Promociones</h2>
          <button onClick={() => navigate("/eventos")} className="text-gold text-xs font-body hover:underline">
            Ver Todos →
          </button>
        </div>
        <Carousel
          opts={{ align: "start", loop: true }}
          plugins={[Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {events.map((event) => (
              <CarouselItem key={event.id} className="pl-3 basis-[280px]">
                <div className="glass-white rounded-xl overflow-hidden">
                  <div className="relative h-36">
                    <img src={eventNight} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="absolute bottom-2 left-3 text-cream text-[10px] font-body bg-gold/80 px-2 py-0.5 rounded-full">
                      {event.date}
                    </span>
                  </div>
                  <div className="p-3">
                    <h3 className="font-body text-sm font-semibold">{event.title}</h3>
                    <p className="text-black text-xs mt-1 line-clamp-2 font-body">{event.description}</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>

      {/* Info Block */}
      <section id="contact-section" className="px-4 mt-10 mb-6">
        <h2 className="font-body text-xl font-bold text-foreground mb-4">Encuéntranos</h2>
        <div className="glass-dark border border-gold/20 rounded-xl p-5 space-y-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-body font-medium text-foreground">Dirección</p>
              <p className="text-xs text-foreground/70 font-body">Centro Empresarial Vista Norte, Sector Tipuro II, Maturín, Venezuela</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-body font-medium text-foreground">Teléfono</p>
              <a href="tel:+584249147877" className="text-xs text-foreground/70 font-body hover:text-gold">+58 424-9147877</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-body font-medium text-foreground">Email</p>
              <a href="mailto:Aljannasweet@gmail.com" className="text-xs text-foreground/70 font-body hover:text-gold">Aljannasweet@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="text-sm font-body font-medium text-foreground">Horario</p>
              <p className="text-xs text-foreground/70 font-body">Lunes a Domingo: 11:00 AM - 10:00 PM</p>
            </div>
          </div>
          {/* Minimalist map embed */}
          <div className="rounded-lg overflow-hidden border border-gold/20 h-40">
            <iframe
              title="Ubicación de Al Janna"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5!2d-63.17!3d9.75!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwNDUnMDAuMCJOIDYzwrAxMCcxMi4wIlc!5e0!3m2!1ses!2sve!4v1"
              className="w-full h-full border-0 grayscale opacity-80"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
