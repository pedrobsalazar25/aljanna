import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import ScrollToTop from "@/components/ScrollToTop";
import HomePage from "@/pages/HomePage";
import MenuCategoryPage from "@/pages/MenuCategoryPage";
import ProductPage from "@/pages/ProductPage";
import CartPage from "@/pages/CartPage";
import EventsPage from "@/pages/EventsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="max-w-lg mx-auto relative min-h-screen animated-gradient-bg">
            <TopNav />
            <div className="pt-14">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/cocina" element={<MenuCategoryPage category="cocina" />} />
                <Route path="/postres" element={<MenuCategoryPage category="postres" />} />
                <Route path="/bebidas" element={<MenuCategoryPage category="bebidas" />} />
                <Route path="/plato/:id" element={<ProductPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/eventos" element={<EventsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
            <WhatsAppBubble />
            <BottomNav />
          </div>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
