import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { CurrencyProvider } from "@/context/CurrencyContext";
import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import WhatsAppBubble from "@/components/WhatsAppBubble";
import ScrollToTop from "@/components/ScrollToTop";
import PullToRefresh from "@/components/PullToRefresh";

const HomePage = lazy(() => import("@/pages/HomePage"));
const MenuCategoryPage = lazy(() => import("@/pages/MenuCategoryPage"));
const ProductPage = lazy(() => import("@/pages/ProductPage"));
const CartPage = lazy(() => import("@/pages/CartPage"));
const EventsPage = lazy(() => import("@/pages/EventsPage"));
const NotFound = lazy(() => import("@/pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CurrencyProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="max-w-lg mx-auto relative min-h-screen animated-gradient-bg">
            <ScrollToTop />
            <TopNav />
            <PullToRefresh>
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
            </PullToRefresh>
            <WhatsAppBubble />
            <BottomNav />
          </div>
        </BrowserRouter>
      </CartProvider>
      </CurrencyProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
