import { Link } from 'react-router-dom';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
}

export default function CartDrawer({ isOpen, onClose, cart, removeFromCart, updateQuantity }: CartDrawerProps) {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-obsidian border-l border-white/10 z-[80] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-bottom border-white/5 flex justify-between items-center">
              <h2 className="editorial-title text-2xl tracking-[0.1em]">Your Bag</h2>
              <button onClick={onClose} className="text-white/70 hover:text-white">
                <X size={24} id="close-cart-btn" />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-4 sm:p-6 flex flex-col gap-6 sm:gap-8">
              {cart.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center gap-6 p-4">
                  <p className="text-white/40 font-light italic text-sm">Your shopping bag is currently empty.</p>
                  <button
                    onClick={onClose}
                    className="text-[10px] sm:text-[11px] uppercase tracking-widest text-gold border border-gold/30 px-6 sm:px-8 py-3 hover:bg-gold hover:text-obsidian transition-all min-h-[44px]"
                  >
                    Explore Collections
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 sm:gap-6 group">
                    <div className="w-20 h-28 sm:w-24 sm:h-32 bg-zinc-900 border border-white/5 overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow flex flex-col justify-between py-1 overflow-hidden">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-xs sm:text-sm font-medium text-white/90 truncate">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-white/20 hover:text-red-400 transition-colors p-1 -mr-1">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-gold text-[10px] sm:text-xs mt-1 font-mono">${item.price.toLocaleString()}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-white/10 rounded-full">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1.5 sm:p-2 hover:text-gold transition-colors min-w-[32px] min-h-[32px]"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-[10px] sm:text-xs font-mono w-6 sm:w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1.5 sm:p-2 hover:text-gold transition-colors min-w-[32px] min-h-[32px]"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-8 border-t border-white/5 bg-black/40">
                <div className="flex justify-between mb-2">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Subtotal</span>
                  <span className="text-md font-mono text-white">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-8">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Complimentary Shipping</span>
                  <span className="text-[10px] uppercase tracking-widest text-gold">Applied</span>
                </div>
                <Link
                  to="/checkout"
                  onClick={onClose}
                  className="w-full bg-gold text-obsidian flex items-center justify-center gap-2 py-4 uppercase text-[11px] font-bold tracking-[0.2em] hover:bg-white transition-colors group"
                >
                  Proceed to Checkout
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <button
                  onClick={onClose}
                  className="w-full mt-4 text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition-colors py-2"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
