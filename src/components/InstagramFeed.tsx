import { useEffect } from "react";

interface InstagramFeedProps {
  widgetId?: string;
}

const ELFSIGHT_SCRIPT_ID = "elfsight-platform-script";

const InstagramFeed = ({ widgetId }: InstagramFeedProps) => {
  useEffect(() => {
    if (!widgetId) return;
    // Load Elfsight script once
    if (!document.getElementById(ELFSIGHT_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = ELFSIGHT_SCRIPT_ID;
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [widgetId]);

  if (!widgetId) {
    return (
      <section className="px-4 py-8">
        <h2 className="font-display text-xl font-bold text-cream text-center mb-2">
          Síguenos en Instagram
        </h2>
        <p className="text-cream/50 text-xs text-center font-body mb-4">
          @aljanna.sweet
        </p>
        <div className="glass-card-white rounded-xl p-6 text-center">
          <p className="text-sm text-foreground/60 font-body">
            Widget de Instagram próximamente.
            <br />
            <a
              href="https://www.instagram.com/aljanna.sweet/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold font-semibold hover:underline"
            >
              Visítanos en Instagram →
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4 py-8">
      <h2 className="font-display text-xl font-bold text-cream text-center mb-2">
        Síguenos en Instagram
      </h2>
      <p className="text-cream/50 text-xs text-center font-body mb-4">
        @aljanna.sweet
      </p>
      <div className="rounded-xl overflow-hidden">
        <div className={`elfsight-app-${widgetId}`} />
      </div>
    </section>
  );
};

export default InstagramFeed;
