import { motion } from 'motion/react';
import { Plus, Search, ChevronDown, HelpCircle, Shield, CreditCard, Cpu, Database } from 'lucide-react';
import { useState } from 'react';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the AI AI personal trainer actually work?",
      a: "Our AI, powered by state-of-the-art large language models, analyzes your physical data (weight, height, age, gender) and combines it with your historical performance. It uses sport science principles like Progressive Overload and RPE management to dynamically adjust your sets, reps, and nutrition daily.",
      icon: Cpu
    },
    {
      q: "Is there a free trial for the Pro features?",
      a: "Yes! Every new user gets a 7-day trial of Pro features automatically. No credit card is required to start your trial. After the trial, you'll still have access to our robust Free tier features forever.",
      icon: CreditCard
    },
    {
      q: "Can I use the app without any equipment?",
      a: "Absolutely. During onboarding, you specify what equipment you have access to. If you choose 'Bodyweight Only,' the AI will generate a specialized calisthenics plan designed to build muscle and strength using just gravity.",
      icon: Database
    },
    {
      q: "How secure is my health and personal data?",
      a: "Privacy is a core pillar of GymCoach AI. All data is encrypted at rest and in transit. We use enterprise-grade cloud security to ensure your personal health metrics and identification are never accessible to unauthorized parties or third-party advertisers.",
      icon: Shield
    },
    {
      q: "Does the app support syncing with Apple Health or Google Fit?",
      a: "Yes, currently Elite members can sync their steps, heart rate data, and workout summaries directly into GymCoach AI for even deeper personalization of their recovery recommendations.",
      icon: HelpCircle
    }
  ];

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-20 px-4">
        <Badge className="mb-4">FAQ</Badge>
        <h1 className="heading-display text-5xl md:text-7xl mb-6">Got questions? <span className="text-brand">We have answers.</span></h1>
        <p className="text-text-secondary text-lg leading-relaxed max-w-2xl mx-auto">
          Everything you need to know about the platform, the AI, and how to get the best results from your personal coach.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <div 
            key={i} 
            className={cn(
              "rounded-2xl transition-all border",
              openIndex === i ? "bg-surface border-brand/30" : "bg-surface/50 border-border-default hover:border-border-hover"
            )}
          >
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full p-6 text-left flex items-center justify-between group"
            >
              <div className="flex items-center gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                  openIndex === i ? "bg-brand text-black" : "bg-white/5 text-text-muted group-hover:text-text-primary"
                )}>
                  <faq.icon size={20} />
                </div>
                <h3 className="font-bold text-lg">{faq.q}</h3>
              </div>
              <ChevronDown 
                size={20} 
                className={cn(
                  "text-text-muted transition-transform",
                  openIndex === i && "transform rotate-180 text-brand"
                )} 
              />
            </button>
            
            {openIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-0 ml-14 text-text-secondary leading-relaxed text-sm">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {/* Support Section */}
      <div className="mt-32 p-12 bg-brand/5 border border-dashed border-brand/20 rounded-[48px] text-center">
         <h2 className="heading-display text-3xl mb-4">Still need help?</h2>
         <p className="text-text-secondary mb-8">Our support team and senior coaches are available 24/7 for Elite members.</p>
         <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="primary" className="px-10 h-12">Contact Support</Button>
            <Button variant="outline" className="px-10 h-12">View Documentation</Button>
         </div>
      </div>
    </div>
  );
}
