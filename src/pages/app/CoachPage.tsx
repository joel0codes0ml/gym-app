import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sparkles, Plus, History, MoreVertical, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { Card, Button, Badge } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';

// Initialize Gemini API
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
}

const QUICK_PROMPTS = [
  "Recovery tips",
  "Plateau help",
  "Pre-workout fuel",
  "Form check",
  "Build muscle fast",
  "Cutting diet"
];

export default function CoachPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'model',
      content: "Hello Alex! I'm your GymCoach AI. Based on your recent workouts, your recovery looks optimal today. What can I help you with? We could discuss your nutrition strategy for the upcoming week or tweak your current push session.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text: string = input) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: text,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `You are GymCoach AI, an elite personal trainer with 15+ years of experience in sport science, hypertrophy, and nutrition. 
          Your tone is professional, encouraging, and highly specific. 
          The user's name is Alex. 
          Current Stats: Goal=Muscle Gain, Streak=7 Days, Fitness Level=Intermediate.
          Always give actionable, science-based advice. Keep responses relatively concise but thorough.
          If asked for a workout plan, focus on progressive overload.`
        }
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.content }] })),
          { role: 'user', parts: [{ text: text }] }
        ]
      });

      const modelMessage: Message = {
        role: 'model',
        content: response.text || "I'm sorry, I encountered an error. Could you repeat that?",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error('AI error:', error);
      setMessages(prev => [...prev, {
        role: 'model',
        content: "I'm having trouble connecting right now. Please check your internet or try again in a moment.",
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand rounded-xl flex items-center justify-center text-black">
            <Bot size={24} />
          </div>
          <div>
            <h1 className="heading-display text-2xl">Elite AI Coach</h1>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              <span className="text-[10px] text-brand font-bold uppercase tracking-widest">Active & Learning</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="p-2 h-10 w-10"><History size={18} /></Button>
          <Button variant="outline" className="p-2 h-10 w-10"><MoreVertical size={18} /></Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <Card className="flex-1 overflow-hidden p-0 flex flex-col relative">
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth custom-scrollbar"
        >
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
                m.role === 'user' ? "bg-white/10" : "bg-brand/20 text-brand"
              )}>
                {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm leading-relaxed",
                m.role === 'user' 
                  ? "bg-brand text-black font-medium" 
                  : "bg-background border border-border-default"
              )}>
                {m.content}
                <div className={cn(
                  "mt-2 text-[10px] font-mono opacity-50",
                  m.role === 'user' ? "text-black" : "text-text-muted text-right"
                )}>
                  {m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <div className="flex gap-4 mr-auto max-w-[80%]">
              <div className="w-8 h-8 rounded-lg bg-brand/20 text-brand flex items-center justify-center">
                <Bot size={16} />
              </div>
              <div className="bg-background border border-border-default p-4 rounded-2xl flex gap-1">
                {[1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                    className="w-1.5 h-1.5 bg-brand rounded-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input & Quick Actions */}
        <div className="p-6 border-t border-border-default bg-surface/50 backdrop-blur-xl">
          <div className="flex gap-2 overflow-x-auto no-scrollbar mb-4 pb-2">
            {QUICK_PROMPTS.map(p => (
              <button
                key={p}
                onClick={() => handleSend(p)}
                className="shrink-0 px-3 py-1.5 bg-white/5 border border-border-default rounded-full text-xs font-medium text-text-secondary hover:border-brand/40 hover:text-brand transition-all flex items-center gap-1.5"
              >
                <Sparkles size={12} className="text-brand" /> {p}
              </button>
            ))}
          </div>
          
          <div className="relative group">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your fitness..."
              className="w-full bg-background border border-border-default rounded-2xl py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-brand/50 focus:ring-1 focus:ring-brand/50 transition-all"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 p-2.5 bg-brand text-black rounded-xl hover:bg-brand-hover transition-all disabled:opacity-50"
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-[10px] text-text-muted text-center mt-3 uppercase tracking-widest font-bold">
            Powered by GymCoach Intelligence Engine
          </p>
        </div>
      </Card>
    </div>
  );
}
