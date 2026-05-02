import { motion } from 'motion/react';
import { 
  Dumbbell, 
  Utensils, 
  LineChart, 
  MessageSquare, 
  Zap, 
  Target, 
  ShieldCheck, 
  Cpu 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';

export default function FeaturesPage() {
  const features = [
    {
      title: "Home Dashboard",
      desc: "One central hub for your entire fitness journey. Track calories, workouts, water intake, and daily AI insights in a glance.",
      icon: Dumbbell,
      badge: "Command Center"
    },
    {
      title: "AI Workout Planner",
      desc: "Forget static PDFs. Get dynamic plans that adjust every session based on your fatigue, energy levels, and previous performance.",
      icon: Zap,
      badge: "Hyper-Personalized"
    },
    {
      title: "Nutrition Intel",
      desc: "Smart macro tracking with AI meal plan generation. Log meals in seconds and let the AI optimize your intake for your goals.",
      icon: Utensils,
      badge: "Scientific"
    },
    {
      title: "Progress Visualization",
      desc: "Deep-dive analytics on your strength, weight trend, and body composition. Multiple chart types to visualize your wins.",
      icon: LineChart,
      badge: "Data-Driven"
    },
    {
      title: "24/7 AI Coach Chat",
      desc: "A personal coach in your pocket. Ask about form, recovery, nutrition, or motivation at 3 AM. Streaming responses instantly.",
      icon: MessageSquare,
      badge: "Always On"
    },
    {
      title: "Privacy First",
      desc: "Your data is yours. Secure, encrypted, and never sold. We focus on your results, not your data as a product.",
      icon: ShieldCheck,
      badge: "Secure"
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20 px-4">
          <Badge className="mb-4">Features</Badge>
          <h1 className="heading-display text-5xl md:text-7xl mb-6">Designed for <span className="text-brand">Evolution.</span></h1>
          <p className="text-text-secondary text-lg leading-relaxed">
            Every feature is engineered to remove friction from your fitness journey. We handle the math, the planning, and the tracking. You just put in the work.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card hover className="h-full group">
                <div className="mb-6 w-14 h-14 bg-brand/5 rounded-2xl flex items-center justify-center group-hover:bg-brand/10 transition-colors">
                  <feature.icon className="text-brand" size={28} />
                </div>
                <Badge variant="muted" className="mb-4">{feature.badge}</Badge>
                <h3 className="heading-display text-2xl mb-4 group-hover:text-brand transition-colors">{feature.title}</h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Visual Showcase Section */}
        <div className="mt-32 space-y-32">
          {/* Dashboard Feature */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-brand">
                <Cpu size={24} />
                <span className="heading-display text-xl">The Neural Engine</span>
              </div>
              <h2 className="heading-display text-4xl md:text-6xl leading-tight">Plans that think <br />with you.</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Most apps give you a generic "Intermediate" plan. GymCoach AI analyzes your actual lift speeds and completion rates to determine exactly when to push for a Personal Record and when to deload.
              </p>
              <div className="flex flex-col gap-4 pt-4">
                {[
                  "Adapts to your sleep and energy levels",
                  "Auto-scales sets and reps",
                  "Optimizes rest periods in real-time"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check size={20} className="text-brand" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-brand/20 blur-[100px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-surface border border-white/10 rounded-3xl p-1 shadow-2xl overflow-hidden aspect-square flex items-center justify-center">
                <div className="w-4/5 aspect-square bg-background rounded-full border-[20px] border-white/5 flex flex-col items-center justify-center text-center p-12">
                   <Zap size={64} className="text-brand mb-4 animate-pulse" />
                   <p className="heading-display text-2xl mb-2">Analyzing...</p>
                   <p className="text-text-muted text-sm uppercase tracking-widest font-bold">Progressive Overload Applied</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-32 text-center pb-20">
          <h2 className="heading-display text-4xl md:text-6xl mb-8">Ready to experience <br />the future of fitness?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/app/dashboard">
              <Button className="w-full sm:w-auto h-14 px-12 text-lg">Start training now</Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" className="w-full sm:w-auto h-14 px-12 text-lg">See pricing</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Check({ size, className }: { size: number, className: string }) {
  return (
    <div className={cn("w-6 h-6 bg-brand/10 rounded-full flex items-center justify-center shrink-0", className)}>
      <motion.svg 
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        width={size-8} 
        height={size-8} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="4" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-brand"
      >
        <polyline points="20 6 9 17 4 12" />
      </motion.svg>
    </div>
  );
}
