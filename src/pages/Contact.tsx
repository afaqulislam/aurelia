import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact-submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-obsidian min-h-screen pt-24 sm:pt-32 md:pt-40 pb-16 md:pb-24 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-24">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6 block">Communication</span>
          <h1 className="editorial-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-8 md:mb-12 uppercase leading-tight">CONNECT WITH <br className="hidden md:block" /> THE CONCIERGE</h1>
          <p className="text-white/50 font-light leading-relaxed mb-10 md:mb-16 max-w-md text-xs sm:text-sm md:text-base">
            Our private concierge team is available to assist with styling advice, bespoke orders, and any inquiries regarding our collections.
          </p>

          <div className="space-y-8 md:space-y-12">
            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <MapPin size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-1 md:mb-2">Flagship Atelier</h3>
                <p className="text-xs md:text-sm font-light">Via della Spiga, 12<br />Milan, Italy</p>
              </div>
            </div>

            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <Phone size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-1 md:mb-2">Private Line</h3>
                <p className="text-xs md:text-sm font-light">+39 02 1234 5678</p>
              </div>
            </div>

            <div className="flex items-start gap-4 md:gap-6">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-gold" />
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-widest text-white/40 mb-1 md:mb-2">Digital Inquiry</h3>
                <p className="text-xs md:text-sm font-light">concierge@aurelia.luxury</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/40 border border-white/5 p-6 sm:p-8 md:p-12 lg:p-16 rounded-3xl backdrop-blur-xl"
        >
          {status === 'success' ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center mb-8">
                <Send className="text-gold" size={32} />
              </div>
              <h2 className="editorial-title text-3xl mb-4">INQUIRY RECEIVED</h2>
              <p className="text-white/50 font-light mb-8 max-w-xs">Our concierge will contact you within 24 hours of your submission.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-gold uppercase tracking-widest text-[10px] font-bold border-b border-gold/40 pb-1"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">Your Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Monsieur / Madame"
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">Email Address</label>
                <input 
                  type="email" 
                  required
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">Subject</label>
                <select 
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-transparent border-b border-white/10 py-3 text-sm focus:outline-none focus:border-gold transition-colors appearance-none"
                >
                  <option className="bg-obsidian">General Inquiry</option>
                  <option className="bg-obsidian">Bespoke Appointment</option>
                  <option className="bg-obsidian">Press & PR</option>
                  <option className="bg-obsidian">Order Status</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.3em] text-white/40">Your Message</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="How may we assist you today?"
                  className="w-full bg-transparent border border-white/10 rounded-2xl p-6 text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-white/10 resize-none mt-4"
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full bg-gold text-obsidian py-5 rounded-full uppercase text-[11px] font-bold tracking-[0.3em] hover:bg-white transition-all disabled:opacity-50"
              >
                {status === 'loading' ? 'COMMUNICATING...' : 'SUBMIT INQUIRY'}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
