import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { events, eventNight } from "@/data/menuData";

const EventsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="pb-20 min-h-screen">
      <div className="sticky top-0 z-30 glass-dark px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-cream/80 hover:text-gold transition-colors">
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <h1 className="font-body text-lg font-bold text-cream">Eventos y Promociones</h1>
      </div>

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[300px]">
        <img src={eventNight} alt="Eventos" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
        <div className="absolute bottom-6 left-4 right-4">
          <h2 className="font-body text-2xl font-bold text-cream drop-shadow-lg">Próximos Eventos</h2>
          <p className="text-cream/70 text-sm font-body mt-1">No te pierdas nuestras noches especiales</p>
        </div>
      </div>

      {/* Event Cards - same format as HomePage */}
      <div className="px-4 mt-6 grid grid-cols-2 gap-3">
        {events.map((event, i) => (
          <div key={event.id} className="glass-white rounded-xl overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
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
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
