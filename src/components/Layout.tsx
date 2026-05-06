import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Instagram, Facebook, Twitter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CartDrawer from './CartDrawer';
import ChatConcierge from './ChatConcierge';
import { CartItem } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  cart: CartItem[];
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, delta: number) => void;
}

export default function Layout({ children, cart, removeFromCart, updateQuantity }: LayoutProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Collections', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-obsidian">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'glass-header py-3 md:py-4 h-16 md:h-20 shadow-2xl' : 'bg-transparent py-6 md:py-8 h-20 md:h-24'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 h-full flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(true)} 
            className="lg:hidden text-white hover:text-gold transition-colors w-11 h-11 flex items-center justify-center -ml-2"
            aria-label="Toggle Menu"
          >
            <Menu size={24} id="nav-menu-btn" />
          </button>

          {/* Nav - Desktop */}
          <nav className="hidden lg:flex gap-12 items-center">
            {navLinks.map(link => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-sans uppercase tracking-[0.2em] transition-colors hover:text-gold ${location.pathname === link.path ? 'text-gold' : 'text-white/70'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Logo */}
          <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex items-center h-full">
            <span className="editorial-title text-xl sm:text-2xl md:text-3xl tracking-[0.4em] text-white uppercase whitespace-nowrap">AURELIA</span>
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center gap-1 sm:gap-4 md:gap-12">
            <Link 
              to="/contact" 
              className="hidden sm:block text-[9px] md:text-[11px] font-sans uppercase tracking-[0.2em] text-white/70 hover:text-gold transition-colors whitespace-nowrap"
            >
              Inquiry
            </Link>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-white hover:text-gold transition-all duration-300 flex items-center gap-2 group w-11 h-11 md:w-auto md:h-auto justify-center"
              aria-label="Open Cart"
            >
              <span className="hidden md:block text-[11px] font-sans uppercase tracking-[0.2em] text-gold group-hover:text-white transition-colors">Cart</span>
              <div className="px-1.5 py-0.5 border border-gold group-hover:border-white transition-colors">
                <span className="text-[9px] font-bold text-gold group-hover:text-white transition-colors font-mono">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-obsidian p-10 flex flex-col justify-between lg:hidden"
          >
            <div>
              <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-gold mb-12">
                <X size={32} id="close-menu-btn" />
              </button>
              <div className="flex flex-col gap-6 sm:gap-8">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="editorial-title text-4xl sm:text-5xl text-white hover:text-gold transition-colors"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex gap-6 mt-auto border-t border-white/10 pt-8">
              <Instagram className="text-white hover:text-gold transition-colors cursor-pointer" size={20} />
              <Facebook className="text-white hover:text-gold transition-colors cursor-pointer" size={20} />
              <Twitter className="text-white hover:text-gold transition-colors cursor-pointer" size={20} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow pt-24 lg:pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 px-4 sm:px-6 md:px-12 py-12 md:py-20 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            <div className="sm:col-span-2 space-y-6">
              <h2 className="editorial-title text-3xl md:text-4xl tracking-[0.2em] uppercase">AURELIA</h2>
              <p className="text-white/40 max-w-md leading-relaxed text-sm font-light font-sans">
                Crafting a legacy of timeless sophistication. From Italian silk to hand-sourced Mongolian cashmere, every piece is a testament to the art of absolute luxury.
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-8 sm:col-span-2 lg:col-span-2">
              <div className="space-y-6">
                <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold">Navigation</h3>
                <ul className="flex flex-col gap-4">
                  {navLinks.map(link => (
                    <li key={link.name}>
                      <Link to={link.path} className="text-[10px] font-sans tracking-widest uppercase text-white/40 hover:text-white transition-colors py-1 inline-block">{link.name}</Link>
                    </li>
                  ))}
                  <li><Link to="/checkout" className="text-[10px] font-sans tracking-widest uppercase text-white/40 hover:text-white transition-colors py-1 inline-block">Checkout</Link></li>
                </ul>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-[10px] font-sans uppercase tracking-[0.3em] text-gold">Concierge</h3>
                <ul className="flex flex-col gap-4 text-[10px] font-sans tracking-widest uppercase text-white/40">
                  <li className="py-1">M-F 9am — 6pm GMT</li>
                  <li>
                    <a href="mailto:concierge@aurelia.luxury" className="hover:text-white transition-colors py-1 inline-block break-all">concierge@aurelia.luxury</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Status Bar */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            <div className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gold animate-pulse"></div>
              <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/60">Aurelia Atelier: Live from Milan</span>
            </div>
            
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12 text-[9px] sm:text-[10px] font-sans tracking-widest uppercase text-white/40">
              <a href="#" className="hover:text-white py-1">Privacy</a>
              <a href="#" className="hover:text-white py-1">Terms</a>
              <a href="#" className="hover:text-white py-1">Shipping</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
      
      {/* AI Concierge */}
      <ChatConcierge />
    </div>
  );
}
