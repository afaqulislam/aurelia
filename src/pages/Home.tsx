import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { Product } from '../types';

interface HomeProps {
  addToCart: (product: Product) => void;
}

export default function Home({ addToCart }: HomeProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-obsidian">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Fashion" 
            className="w-full h-full object-cover opacity-60 scale-105 animate-[slow-zoom_20s_infinite_alternate]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/40 via-transparent to-obsidian"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="text-[11px] sm:text-[12px] font-sans tracking-[0.3em] uppercase italic text-gold mb-3 md:mb-8 block">Est. 2024 &mdash; Milano</span>
            <h1 className="editorial-title text-[clamp(2.75rem,12vw,8rem)] text-white mb-6 md:mb-8 leading-[0.9]">
              The <span className="italic font-normal">Pure</span><br/>Collection
            </h1>
            <p className="text-white/60 font-sans font-light text-sm sm:text-base md:text-lg mb-8 md:mb-12 max-w-md leading-relaxed">
              Exquisite Italian silk and hand-sourced cashmere, tailored for the modern silhouette. Experience luxury defined by silence.
            </p>
            <a 
              href="#collections"
              className="px-6 sm:px-10 py-3 sm:py-4 border border-gold text-gold text-[10px] sm:text-[11px] font-sans tracking-[0.3em] uppercase hover:bg-gold hover:text-black transition-all inline-block min-h-[44px] flex-none"
            >
              Explore Catalogue
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-4 opacity-30">
          <span className="text-[9px] uppercase tracking-[0.5em] vertical-text">Scroll</span>
          <div className="w-px h-12 bg-white/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-gold animate-[scroll-dot_2s_infinite]"></div>
          </div>
        </div>
      </section>

      {/* Featured Collections Grid */}
      <section id="collections" className="py-20 sm:py-32 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-xl">
            <h2 className="editorial-title text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6 uppercase">CURATED SELECTIONS</h2>
            <p className="text-white/40 font-light leading-relaxed text-sm sm:text-base">
              Every garment in our anthology is meticulously crafted using only the most exceptional materials, ensuring a lifetime of style.
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <span className="text-[9px] uppercase tracking-widest text-white/20">Sort By:</span>
            <span className="text-[10px] uppercase tracking-widest text-gold cursor-pointer border-b border-gold/40">Newest</span>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="animate-pulse">
                <div className="bg-white/5 aspect-[3/4] mb-6"></div>
                <div className="h-4 bg-white/5 w-3/4 mb-2"></div>
                <div className="h-4 bg-white/5 w-1/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden product-image mb-6 group">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  
                  {/* Subtle Grid Border within image */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11/12 h-11/12 border border-white/5"></div>
                  </div>
                  
                  {/* Quick Add Overlay */}
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-gold text-obsidian py-4 text-[10px] font-bold uppercase tracking-[0.2em] transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 hover:bg-white"
                  >
                    Add to Bag
                  </button>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium tracking-wide mb-1 transition-colors group-hover:text-gold">{product.name}</h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-widest">{product.description.split('.')[0]}</p>
                  </div>
                  <span className="text-xs font-mono text-gold">${product.price.toLocaleString()}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Brand Ethos */}
      <section className="bg-black py-24 md:py-40 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8 md:mb-12">
            <Star className="text-gold fill-gold" size={20} />
          </div>
          <h2 className="editorial-title text-2xl sm:text-3xl md:text-4xl lg:text-6xl mb-8 md:mb-12 max-w-4xl mx-auto leading-tight italic px-4">
            "We do not simply create fashion; we compose a narrative of <span className="not-italic opacity-50">refined existence</span>."
          </h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 md:mt-20 grayscale opacity-40">
            <span className="text-sm sm:text-xl font-serif tracking-widest font-bold">VOGUE</span>
            <span className="text-sm sm:text-xl font-serif tracking-widest font-bold">BAZAAR</span>
            <span className="text-sm sm:text-xl font-serif tracking-widest font-bold">ELLE</span>
          </div>
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="h-[80vh] overflow-hidden relative">
        <img 
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=2000&q=80" 
          alt="Aurelia Craft" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-obsidian/40 flex items-center justify-center">
          <div className="text-center p-10 border border-white/10 glass max-w-lg mx-6">
            <h3 className="editorial-title text-4xl mb-6">UNCOMPROMISING DETAIL</h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8 font-light">
              Each piece undergoes a rigorous examination by our master tailors. It is not ready until it is perfect.
            </p>
            <button className="text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors">Learn more about our process</button>
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll-dot {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        @keyframes slow-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.15); }
        }
      `}} />
    </div>
  );
}
