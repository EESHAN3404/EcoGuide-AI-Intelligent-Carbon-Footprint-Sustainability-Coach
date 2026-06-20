"use client";

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Send, Bot, User as UserIcon, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AssistantPage() {
  const { status } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<{role: 'user'|'assistant', text: string}[]>([
    { role: 'assistant', text: "Hello! I am your AI Sustainability Coach. I've analyzed your latest data. I can help you forecast your emissions, create a personalized action plan, or explain your calculations. What would you like to explore today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "Generate my personalized action plan",
    "What contributes most to my emissions?",
    "How can I improve my Eco Score?",
    "Forecast my next month's emissions"
  ];

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(overrideInput?: string) {
    const textToSend = overrideInput || input;
    if (!textToSend.trim()) return;
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: textToSend }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: textToSend }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, my neural networks encountered a temporary glitch.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center gap-4">
            <Sparkles className="w-10 h-10 text-emerald-500" />
            AI Sustainability Coach
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Your predictive intelligence engine for sustainable living.</p>
        </div>
        
        <Card className="flex-1 flex flex-col overflow-hidden glass-card border-none shadow-2xl relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <CardHeader className="bg-black/10 dark:bg-white/5 border-b border-white/5 pb-4 backdrop-blur-md z-10">
            <CardTitle className="text-lg flex items-center gap-2">
              <Bot className="w-5 h-5 text-emerald-500" />
              EcoGuide Assistant
            </CardTitle>
            <CardDescription>Always learning, always optimizing.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-6 z-10 scroll-smooth">
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  key={i} 
                  className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                      <Bot className="w-6 h-6 text-emerald-500" />
                    </div>
                  )}
                  <div className={`px-5 py-3 text-sm md:text-base rounded-2xl max-w-[80%] leading-relaxed shadow-lg ${msg.role === 'user' ? 'bg-primary text-primary-foreground rounded-tr-sm shadow-primary/20' : 'glass rounded-tl-sm border-white/10'}`}>
                    {msg.text}
                  </div>
                  {msg.role === 'user' && (
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 border border-blue-500/30">
                      <UserIcon className="w-6 h-6 text-blue-500" />
                    </div>
                  )}
                </motion.div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 justify-start">
                   <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div className="px-5 py-4 rounded-2xl glass rounded-tl-sm flex items-center gap-2">
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-emerald-500 rounded-full"></motion.span>
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-emerald-500 rounded-full"></motion.span>
                      <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-emerald-500 rounded-full"></motion.span>
                    </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={bottomRef} />
          </CardContent>
          <div className="px-6 pb-2 flex flex-wrap gap-2 z-10">
            {messages.length < 3 && suggestions.map(s => (
              <Button key={s} variant="outline" size="sm" className="glass rounded-full text-xs" onClick={() => handleSend(s)}>
                {s}
              </Button>
            ))}
          </div>
          <CardFooter className="border-t border-white/5 p-4 bg-black/10 dark:bg-white/5 backdrop-blur-md z-10">
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full gap-3 relative">
              <Input 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                placeholder="Ask about your footprint or request an action plan..." 
                className="flex-1 glass border-white/10 rounded-full px-6 h-12 focus-visible:ring-emerald-500"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()} className="rounded-full w-12 h-12 p-0 shadow-lg shadow-primary/30">
                <Send className="w-5 h-5 ml-1" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      </div>
    </DashboardLayout>
  );
}
