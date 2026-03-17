import { MessageCircle } from "lucide-react";

const PHONE = "584249147877";

const WhatsAppBubble = () => (
  <a
    href={`https://wa.me/${PHONE}?text=Hola%2C%20quisiera%20información%20sobre%20Al%20Janna%20Sweet`}
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-lg animate-float hover:scale-110 transition-transform"
    aria-label="WhatsApp"
  >
    <MessageCircle className="w-7 h-7 text-primary-foreground" fill="white" strokeWidth={0} />
  </a>
);

export default WhatsAppBubble;
