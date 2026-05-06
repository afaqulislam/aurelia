import { motion } from 'motion/react';

export default function About() {
  return (
    <div className="bg-obsidian min-h-screen">
      {/* Intro Hero */}
      <section className="pt-32 sm:pt-40 pb-16 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6 md:mb-8 block">Est. 2018</span>
          <h1 className="editorial-title text-4xl sm:text-6xl lg:text-8xl mb-8 md:mb-12 tracking-tight uppercase">OUR STORY</h1>
        </motion.div>
      </section>

      {/* Narrative Section 1 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="aspect-square relative overflow-hidden h-[400px] lg:h-auto">
          <img 
            src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80" 
            alt="Atelier" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex items-center justify-center p-8 md:p-12 lg:p-24 bg-black">
          <div className="max-w-md">
            <h2 className="editorial-title text-3xl md:text-4xl mb-6 md:mb-8 uppercase">THE ATELIER</h2>
            <p className="text-white/60 font-light leading-relaxed mb-6 text-sm md:text-base">
              AURELIA was born from a desire to reclaim the slow, deliberate pace of true luxury. In an age of ephemeral trends, we stand as a sanctuary for the enduring.
            </p>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
              Every stitch is a conversation between the artisan and the fabric. We favor the hand-finished, the precision-cut, and the carefully considered. Our mission is simple: to create the artifacts of a refined life.
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Section 2 */}
      <section className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        <div className="flex items-center justify-center p-8 md:p-12 lg:p-24 bg-obsidian order-2 lg:order-1">
          <div className="max-w-md">
            <h2 className="editorial-title text-3xl md:text-4xl mb-6 md:mb-8 text-gold uppercase">EXCEPTIONALLY SOURCED</h2>
            <p className="text-white/60 font-light leading-relaxed mb-6 text-sm md:text-base">
              The soul of a garment resides in its material. We travel the globe to secure the worlds finest fibers—from the legendary mills of Florence to the high plateaus of Mongolia.
            </p>
            <p className="text-white/60 font-light leading-relaxed text-sm md:text-base">
              Our signature Italian silk and hand-sourced cashmere are unmatched in their tactility, providing a sensory experience that defines the AURELIA name.
            </p>
          </div>
        </div>
        <div className="aspect-square relative overflow-hidden h-[400px] lg:h-auto order-1 lg:order-2">
          <img 
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80" 
            alt="Materia" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Final Quote */}
      <section className="py-24 md:py-40 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <h3 className="editorial-title text-2xl sm:text-4xl lg:text-5xl italic font-light leading-tight">
          "Luxury is not an accumulation of things. It is the clarity of choice, the depth of character, and the pursuit of absolute quality."
        </h3>
        <p className="mt-8 md:mt-12 text-gold uppercase tracking-[0.3em] text-[9px] sm:text-[10px] font-bold">Aurelia Founder</p>
      </section>
    </div>
  );
}
