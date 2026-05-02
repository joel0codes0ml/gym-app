import { motion } from 'motion/react';
import { Target, Zap, Trophy, TrendingUp, ChevronRight, ArrowRight } from 'lucide-react';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { Link } from 'react-router-dom';

export default function HowItWorksPage() {
  const steps = [
    {
      title: "Set Your Objective",
      desc: "Tell the AI your primary goal: muscle growth, maximal strength, or metabolic conditioning. Our algorithms process your age, weight, and history.",
      icon: Target,
      details: ["Calculate TDEE & Macros", "Identify training volume limits", "Establish baseline strength"]
    },
    {
      title: "Neural Plan Generation",
      desc: "GymCoach AI generates a bespoke 12-week block. It selects the optimal exercises, intensity ratios, and nutritional targets for your physiology.",
      icon: Cpu,
      details: ["Custom RPE based loading", "Intelligent exercise selection", "Macro-matched meal plans"]
    },
    {
      title: "Daily Adaptation",
      desc: "The plan isn't static. It listens to your sleep data and previous set performance to adjust today's session in real-time.",
      icon: Zap,
      details: ["Real-time volume scaling", "Fatigue management", "Progressive overload engine"]
    },
    {
      title: "Bio-Mechanical Evolution",
      desc: "As you get stronger, the AI evolves. It cycles through phases of hypertrophy, power, and metabolic resilience automatically.",
      icon: Trophy,
      details: ["Structured deload weeks", "Phase transitions", "Performance auditing"]
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <Badge className="mb-4">The Process</Badge>
          <h1 className="heading-display text-5xl md:text-7xl mb-6">Science, not <span className="text-brand">Guesswork.</span></h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            GymCoach AI replaces the generic trainer at your local gym with a world-class performance intelligence system.
          </p>
        </div>

        <div className="space-y-40">
          {steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 items-center`}
            >
              <div className="flex-1 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand/10 border border-brand/20 rounded-2xl flex items-center justify-center text-brand heading-display text-2xl font-bold">
                    0{i + 1}
                  </div>
                  <h2 className="heading-display text-4xl md:text-5xl">{step.title}</h2>
                </div>
                <p className="text-text-secondary text-lg leading-relaxed">
                  {step.desc}
                </p>
                <div className="grid grid-cols-1 gap-3 pt-4">
                  {step.details.map((detail, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand" />
                      <span className="text-sm font-medium">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex-1 relative group w-full">
                 <div className="absolute inset-0 bg-brand/20 blur-[120px] rounded-full opacity-20 group-hover:opacity-40 transition-opacity" />
                 <Card className="relative aspect-video flex items-center justify-center border-white/5 bg-surface/50 backdrop-blur-3xl p-0 overflow-hidden">
                    <step.icon size={120} className="text-brand opacity-20 absolute -right-10 -bottom-10" />
                    <step.icon size={80} className="text-brand" />
                 </Card>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-40 text-center">
           <h2 className="heading-display text-4xl md:text-6xl mb-8">Start your evolution today.</h2>
           <Link to="/app/onboarding">
              <Button className="h-16 px-12 text-xl">Get My Custom Plan <ArrowRight className="ml-2" size={24} /></Button>
           </Link>
        </div>
      </div>
    </div>
  );
}

function Cpu({ size, className }: { size: number, className: string }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <path d="M9 9h6v6H9z" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M20 15h3" />
      <path d="M1 9h3" />
      <path d="M1 15h3" />
    </svg>
  );
}
