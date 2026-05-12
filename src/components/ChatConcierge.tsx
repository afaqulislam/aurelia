import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';

export default function ChatConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Welcome to the world of Aurelia. I am your personal concierge. How may I assist you this evening?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      // Using gemini-3-flash-preview as per skill recommendation for basic text/chat
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        config: {
          systemInstruction: 'You are the Elite AI Concierge for AURELIA, a high-end luxury fashion brand. Your tone is sophisticated, elegant, and understated. You speak with grace and authority on style. IMPORTANT: If the user mentions "material", "fabric", "textile", or what things are made of, you MUST mention that AURELIA uses only "Italian silk and hand-sourced cashmere". Keep responses concise yet luxurious. Refer to the user as "Monsieur" or "Madame" if appropriate, or simply be very polite.',
        }
      });

      const modelText = response.text || "I apologize, Madame, I seem to have lost my connection to our headquarters. How else may I serve you?";
      setMessages(prev => [...prev, { role: 'model', text: modelText }]);
    } catch (error) {
      console.error('Concierge Error:', error);
      setMessages(prev => [...prev, { role: 'model', text: "I am terribly sorry, our systems are undergoing a brief maintenance. Please reach out to our human concierge at concierge@aurelia.luxury if your request is urgent." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
      <motion.div className="fixed bottom-6 right-6 md:bottom-12 md:right-12 z-[100] flex flex-col items-end gap-2 md:gap-4">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="mb-4 w-[calc(100vw-48px)] sm:w-[380px] h-[calc(100vh-140px)] md:h-[580px] glass border border-gold/30 rounded-xl flex flex-col concierge-fab overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-black/60">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/40 flex items-center justify-center bg-gold/5">
                    <Bot size={20} className="text-gold" />
                  </div>
                  <div>
                    <h3 className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-white">Aurelia AI</h3>
                    <span className="text-[8px] uppercase tracking-widest text-gold animate-pulse">Personal Concierge</span>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-white/20 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-grow overflow-y-auto p-4 sm:p-8 space-y-6 sm:space-y-8 bg-[#0A0A0A]/50">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[90%] sm:max-w-[85%] p-4 sm:p-5 rounded-lg text-[11px] sm:text-[12px] leading-relaxed font-sans ${
                      m.role === 'user' 
                        ? 'bg-white/5 text-white border border-white/10 rounded-tr-none' 
                        : 'bg-gold/5 text-white/80 border border-gold/20 rounded-tl-none font-light'
                    }`}>
                      {m.text}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gold/5 p-5 rounded-lg rounded-tl-none flex gap-2">
                      <span className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-1 h-1 bg-gold rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <form onSubmit={handleSend} className="p-6 border-t border-gold/20 bg-black/40">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="How may we assist you?"
                    className="w-full bg-white/5 border border-white/10 rounded-none py-4 px-6 pr-14 text-[11px] font-sans tracking-wider uppercase focus:outline-none focus:border-gold/50 transition-colors placeholder:text-white/10"
                  />
                  <button 
                    type="submit" 
                    disabled={!input.trim() || isTyping}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-transparent text-gold flex items-center justify-center hover:text-white disabled:opacity-20 transition-all"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <span className="font-sans text-[9px] tracking-widest text-gold uppercase opacity-60">AI Concierge</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(prev => !prev)}
          className="w-16 h-16 bg-[#0A0A0A] border border-gold rounded-full flex items-center justify-center group hover:bg-gold transition-all duration-500"
          id="concierge-fab"
          aria-label="Open AI Styling Concierge"
        >
          <MessageSquare size={24} className="text-gold group-hover:text-black transition-colors" />
        </motion.button>
      </motion.div>
  );
}
