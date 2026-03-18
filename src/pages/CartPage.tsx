import { useNavigate } from "react-router-dom";
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

const PHONE = "584249147877";

type PaymentMethod = "Efectivo" | "Transferencia";

const CartPage = () => {
  const navigate = useNavigate();
  const { items, updateQuantity, removeItem, clearCart, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Efectivo");

  const handleCheckout = () => {
    if (!customerName.trim()) return;

    const itemLines = items
      .map((ci) => `- ${ci.item.name} x${ci.quantity} ($${(ci.item.price * ci.quantity).toFixed(2)})`)
      .join("\n");

    const message = `🍽️ *Nuevo Pedido de Al Janna Sweet*\n\n👤 Cliente: ${customerName}\n\n📋 Pedido:\n${itemLines}\n\n💰 Total: $${totalPrice.toFixed(2)}\n💳 Pago: ${paymentMethod}`;

    window.open(
      `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  if (items.length === 0) {
    return (
      <div className="pb-20 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <ShoppingCart className="w-16 h-16 text-gold/30 mb-4" strokeWidth={1} />
        <h2 className="font-heading text-xl font-bold text-foreground">Tu carrito está vacío</h2>
        <p className="text-muted-foreground text-sm font-body mt-2">Explora nuestro menú y agrega tus platos favoritos</p>
        <button
          onClick={() => navigate("/cocina")}
          className="mt-6 gold-gradient text-primary font-body font-bold text-sm px-6 py-2.5 rounded-full"
        >
          Ver Menú
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-foreground/60 hover:text-accent transition-colors">
          <ArrowLeft className="w-5 h-5" strokeWidth={1.5} />
        </button>
        <h1 className="font-heading text-lg font-bold text-foreground">Tu Pedido</h1>
      </div>

      {/* Items */}
      <div className="px-4 mt-4 space-y-3">
        {items.map((ci) => (
          <div key={ci.item.id} className="bg-secondary/50 border border-border rounded-xl p-3 flex gap-3 animate-fade-up">
            <img
              src={ci.item.image}
              alt={ci.item.name}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h3 className="font-heading text-sm font-semibold truncate">{ci.item.name}</h3>
              <p className="text-gold font-heading font-bold mt-1">${(ci.item.price * ci.quantity).toFixed(2)}</p>
              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() => updateQuantity(ci.item.id, ci.quantity - 1)}
                  className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-gold"
                >
                  <Minus className="w-3 h-3" strokeWidth={1.5} />
                </button>
                <span className="text-sm font-body font-bold w-4 text-center">{ci.quantity}</span>
                <button
                  onClick={() => updateQuantity(ci.item.id, ci.quantity + 1)}
                  className="w-6 h-6 rounded-full border border-gold/30 flex items-center justify-center text-gold"
                >
                  <Plus className="w-3 h-3" strokeWidth={1.5} />
                </button>
                <button
                  onClick={() => removeItem(ci.item.id)}
                  className="ml-auto text-destructive/60 hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Customer Info & Checkout */}
      <div className="px-4 mt-6 space-y-4">
        <div className="bg-secondary/50 border border-border rounded-xl p-4 space-y-3">
          <div>
            <label className="text-xs text-muted-foreground font-body block mb-1">Tu Nombre</label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Nombre completo"
              className="w-full bg-white border border-border rounded-lg px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground font-body block mb-1">Método de Pago</label>
            <div className="flex gap-2">
              {(["Efectivo", "Transferencia"] as PaymentMethod[]).map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`flex-1 py-2 rounded-lg text-sm font-body transition-all border ${
                    paymentMethod === method
                      ? "border-accent bg-accent/10 text-accent font-bold"
                      : "border-border text-muted-foreground hover:border-accent/40"
                  }`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total & Checkout */}
        <div className="bg-secondary/50 border border-border rounded-xl p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-body text-sm text-muted-foreground">Total</span>
            <span className="font-heading text-2xl font-bold text-accent">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={!customerName.trim()}
            className="w-full gold-gradient text-primary font-body font-bold text-sm py-3 rounded-full hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Confirmar Pedido por WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
