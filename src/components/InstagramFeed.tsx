import { Instagram } from "lucide-react";

const placeholderPosts = [
  { id: 1, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop", likes: 124 },
  { id: 2, image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop", likes: 98 },
  { id: 3, image: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=400&fit=crop", likes: 215 },
  { id: 4, image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop", likes: 176 },
  { id: 5, image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=400&fit=crop", likes: 302 },
  { id: 6, image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=400&h=400&fit=crop", likes: 143 },
];

const InstagramFeed = () => {
  return (
    <section className="px-4 py-8">
      <h2 className="font-display text-xl font-bold text-cream text-center mb-1">
        Síguenos en Instagram
      </h2>
      <p className="text-cream/50 text-xs text-center font-body mb-5">
        @aljanna.sweet
      </p>

      <div className="grid grid-cols-3 gap-1.5 rounded-xl overflow-hidden">
        {placeholderPosts.map((post) => (
          <a
            key={post.id}
            href="https://www.instagram.com/aljanna.sweet/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative aspect-square group overflow-hidden"
          >
            <img
              src={post.image}
              alt="Instagram post"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <span className="text-white text-sm font-body font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                ♥ {post.likes}
              </span>
            </div>
          </a>
        ))}
      </div>

      <a
        href="https://www.instagram.com/aljanna.sweet/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 mt-4 text-accent font-body text-sm font-semibold hover:opacity-80 transition-opacity"
      >
        <Instagram className="w-4 h-4" strokeWidth={1.5} />
        Ver más en Instagram
      </a>
    </section>
  );
};

export default InstagramFeed;
