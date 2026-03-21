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

      {/* Hero events */}
      <div className="px-4 mt-4 space-y-4">
        {events.map((event, i) => (
          <div key={event.id} className="glass-gold rounded-xl overflow-hidden animate-fade-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="relative h-44">
              <img src={eventNight} alt={event.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-gold" strokeWidth={1.5} />
                  <span className="text-gold text-[11px] font-body">{event.date}</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-cream">{event.title}</h3>
              </div>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground text-sm font-body leading-relaxed">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
