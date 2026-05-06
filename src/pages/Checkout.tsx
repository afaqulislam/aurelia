import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, CreditCard, Lock, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutProps {
  cart: CartItem[];
  clearCart: () => void;
}

export default function Checkout({ cart, clearCart }: CheckoutProps) {
  const [step, setStep] = useState<'info' | 'processing' | 'success'>('info');
  const [orderDetails, setOrderDetails] = useState<any>(null);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('processing');

    try {
      const res = await fetch('/api/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart, total: subtotal })
      });
      const data = await res.json();
      
      setOrderDetails(data);
      setStep('success');
      clearCart();
    } catch (err) {
      console.error(err);
      setStep('info');
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-black/40 border border-gold/20 p-8 sm:p-12 text-center rounded-3xl backdrop-blur-2xl"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6 sm:mb-8 border border-gold/20">
            <CheckCircle2 className="text-gold" size={32} />
          </div>
          <h1 className="editorial-title text-3xl sm:text-4xl mb-4 tracking-wider text-white">ORDER CONFIRMED</h1>
          <p className="text-white/50 text-sm font-light mb-8">Thank you for choosing AURELIA. Your curation is being prepared for shipment.</p>
          
          <div className="bg-white/5 p-6 rounded-2xl mb-10 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Transaction ID</span>
              <span className="text-xs font-mono text-gold">{orderDetails?.transactionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Confirmation</span>
              <span className="text-xs text-white/70">Sent via Email</span>
            </div>
          </div>

          <a 
            href="/"
            className="block w-full bg-gold text-obsidian py-4 uppercase text-[11px] font-bold tracking-[0.2em] rounded-full hover:bg-white transition-colors"
          >
            Continue to Sanctuary
          </a>
        </motion.div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-obsidian flex flex-col items-center justify-center p-6">
        <Loader2 className="text-gold animate-spin mb-8" size={64} />
        <h2 className="editorial-title text-3xl mb-4 tracking-widest text-white">AUTHENTICATING PAYMENT</h2>
        <p className="text-white/30 font-light uppercase tracking-[0.3em] text-[10px]">Processing via Secure Luxury Gateway</p>
      </div>
    );
  }

  return (
    <div className="bg-obsidian min-h-screen pt-32 md:pt-40 pb-24 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Left: Info & Payment */}
        <div className="flex-grow order-2 lg:order-1 space-y-12 md:space-y-16">
          <section>
            <h2 className="editorial-title text-2xl md:text-3xl mb-8 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full border border-gold text-[12px] flex items-center justify-center text-gold">1</span>
              SHIPPING DETAILS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-white/40">First Name</label>
                <input type="text" defaultValue="Alexander" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-white/40">Last Name</label>
                <input type="text" defaultValue="Vance" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-white/40">Shipping Address</label>
                <input type="text" placeholder="Street Address" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-white/40">City</label>
                <input type="text" defaultValue="London" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] uppercase tracking-widest text-white/40">Postal Code</label>
                <input type="text" defaultValue="W1J 7JX" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="editorial-title text-2xl md:text-3xl mb-8 flex items-center gap-4">
              <span className="w-8 h-8 rounded-full border border-gold text-[12px] flex items-center justify-center text-gold">2</span>
              PAYMENT METHOD
            </h2>
            <div className="bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-obsidian rounded-lg border border-white/10">
                    <CreditCard size={20} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest">Credit or Debit Card</p>
                    <p className="text-[8px] md:text-[9px] text-white/30 uppercase tracking-widest">Secure encrypted processing</p>
                  </div>
                </div>
                <div className="flex gap-2 grayscale brightness-200 opacity-50 hidden md:flex">
                   <span className="text-[10px] font-bold italic">VISA</span>
                   <span className="text-[10px] font-bold italic">AMEX</span>
                </div>
              </div>
              <div className="p-6 md:p-8 space-y-6">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase tracking-widest text-white/40">Card Number</label>
                  <div className="relative">
                    <input type="text" placeholder="**** **** **** ****" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 pr-12 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">Expiry Date</label>
                    <input type="text" placeholder="MM / YY" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase tracking-widest text-white/40">CVV</label>
                    <input type="text" placeholder="***" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 md:py-4 text-xs md:text-sm focus:outline-none focus:border-gold transition-colors" />
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-white/30 text-[9px] md:text-[10px] uppercase tracking-widest bg-white/5 p-4 rounded-xl">
              <ShieldCheck size={14} className="text-gold flex-shrink-0" />
              All transactions are secured by 256-bit SSL encryption.
            </div>
          </section>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:w-[450px] flex-shrink-0 order-1 lg:order-2">
          <div className="sticky top-24 md:top-40 bg-black/40 border border-white/5 p-5 sm:p-6 md:p-10 rounded-3xl backdrop-blur-xl">
            <h3 className="editorial-title text-lg md:text-2xl mb-6 md:mb-8 tracking-widest uppercase">Your Selection</h3>
            <div className="space-y-6 max-h-[250px] md:max-h-[300px] overflow-y-auto pr-2 mb-8 custom-scrollbar">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-20 bg-zinc-900 overflow-hidden flex-shrink-0 rounded-lg">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="text-xs font-medium mb-1">{item.name}</h4>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">Qty: {item.quantity}</p>
                    <p className="text-xs text-gold font-mono mt-1">${(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                </div>
              ))}
              {cart.length === 0 && <p className="text-white/30 italic text-sm">Your bag is empty.</p>}
            </div>

            <div className="border-t border-white/5 pt-8 space-y-4">
              <div className="flex justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Subtotal</span>
                <span className="text-sm font-mono">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Complimentary Shipping</span>
                <span className="text-[10px] uppercase tracking-widest text-gold">FREE</span>
              </div>
              <div className="flex justify-between pt-4 border-t border-white/5">
                <span className="text-xs uppercase tracking-[.3em] font-bold">Total</span>
                <span className="text-xl font-mono text-white italic">${subtotal.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePayment}
              disabled={cart.length === 0}
              className="w-full mt-10 bg-gold text-obsidian py-5 rounded-full flex items-center justify-center gap-3 uppercase text-[11px] font-bold tracking-[0.3em] hover:bg-white transition-all disabled:opacity-30 disabled:grayscale group"
            >
              Finalize Order
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(197, 160, 89, 0.2); }
      `}} />
    </div>
  );
}
