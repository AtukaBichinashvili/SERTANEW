
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { MessageSquare, X, Send, Sparkles, Loader2, Bot } from 'lucide-react';
import { useApp } from '../store.tsx';

const AISleepAssistant: React.FC = () => {
  const { lang, products } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const productContext = products.map(p => 
        `Name: ${p.name.en} (${p.name.ka}), Type: ${p.category}, Firmness: ${p.firmness}/10, Description: ${p.description.en}`
      ).join('\n');

      const systemInstruction = `
        You are a Serta Sleep Consultant. 
        Language: ${lang === 'ka' ? 'Georgian' : 'English'}.
        Your goal: Recommend the best Serta mattress from the list below based on user needs.
        Be premium, professional, and helpful.
        Available Products:
        ${productContext}
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      const aiText = response.text || (lang === 'ka' ? 'ბოდიში, პასუხის გაცემა ვერ მოხერხდა.' : 'Sorry, I could not generate a response.');
      setMessages(prev => [...prev, { role: 'assistant', content: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: lang === 'ka' ? 'დაფიქსირდა შეცდომა. გთხოვთ სცადოთ მოგვიანებით.' : 'An error occurred. Please try again later.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-white rounded-[32px] shadow-2xl border border-gray-100 flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-serta-navy p-6 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-serta-yellow rounded-xl flex items-center justify-center text-serta-navy">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight">
                  {lang === 'ka' ? 'ძილის კონსულტანტი' : 'Sleep Consultant'}
                </h3>
                <p className="text-[10px] text-white/60 font-bold uppercase tracking-widest">AI Powered</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-all">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 p-6 overflow-y-auto space-y-4 bg-gray-50/30">
            {messages.length === 0 && (
              <div className="text-center py-10 opacity-40">
                <Sparkles size={40} className="mx-auto mb-4 text-serta-navy" />
                <p className="text-sm font-bold uppercase tracking-widest text-serta-navy">
                  {lang === 'ka' ? 'დაგეხმაროთ შერჩევაში?' : 'How can I help you?'}
                </p>
              </div>
            )}
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-4 rounded-2xl text-sm font-medium shadow-sm ${msg.role === 'user' ? 'bg-serta-navy text-white rounded-tr-none' : 'bg-white text-serta-navy border border-gray-100 rounded-tl-none'}`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                  <Loader2 size={20} className="animate-spin text-serta-navy" />
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-50 bg-white">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder={lang === 'ka' ? 'მკითხეთ რამე...' : 'Ask me anything...'}
                className="w-full bg-gray-50 border-none rounded-2xl py-4 pl-5 pr-14 outline-none font-bold text-serta-navy text-sm focus:ring-2 ring-serta-navy/5"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-serta-navy text-white rounded-xl flex items-center justify-center hover:bg-blue-800 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-white text-serta-navy' : 'bg-serta-navy text-white'}`}
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && messages.length === 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-serta-yellow opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-serta-yellow"></span>
          </span>
        )}
      </button>
    </div>
  );
};

export default AISleepAssistant;
