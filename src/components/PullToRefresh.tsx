import { useState, useRef, useCallback, useEffect } from "react";
import { RefreshCw } from "lucide-react";

const THRESHOLD = 80;
const MAX_PULL = 120;

const PullToRefresh = ({ children }: { children: React.ReactNode }) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);
  const startY = useRef(0);
  const pulling = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAtTop = useCallback(() => {
    return window.scrollY <= 0;
  }, []);

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      if (isAtTop() && !refreshing) {
        startY.current = e.touches[0].clientY;
        pulling.current = true;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!pulling.current || refreshing) return;
      const delta = e.touches[0].clientY - startY.current;
      if (delta > 0) {
        // Apply resistance
        const distance = Math.min(delta * 0.5, MAX_PULL);
        setPullDistance(distance);
      } else {
        pulling.current = false;
        setPullDistance(0);
      }
    };

    const onTouchEnd = () => {
      if (!pulling.current) return;
      pulling.current = false;
      if (pullDistance >= THRESHOLD) {
        setRefreshing(true);
        setPullDistance(THRESHOLD);
        setTimeout(() => {
          window.location.reload();
        }, 400);
      } else {
        setPullDistance(0);
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [pullDistance, refreshing, isAtTop]);

  const progress = Math.min(pullDistance / THRESHOLD, 1);

  return (
    <div ref={containerRef} className="relative">
      {/* Pull indicator */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center z-50 pointer-events-none transition-opacity"
        style={{
          top: -40 + pullDistance,
          opacity: progress,
        }}
      >
        <div className="bg-primary/90 border border-gold/30 rounded-full p-2 shadow-lg">
          <RefreshCw
            className={`w-5 h-5 text-gold ${refreshing ? "animate-spin" : ""}`}
            style={{
              transform: refreshing ? undefined : `rotate(${progress * 360}deg)`,
              transition: pulling.current ? "none" : "transform 0.2s",
            }}
          />
        </div>
      </div>

      {/* Content with pull offset */}
      <div
        style={{
          transform: `translateY(${pullDistance}px)`,
          transition: pulling.current ? "none" : "transform 0.3s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
