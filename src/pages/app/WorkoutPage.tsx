import { useState } from 'react';
import { 
  Play, 
  CheckCircle2, 
  Clock, 
  Dumbbell, 
  Plus, 
  ChevronRight, 
  Zap,
  Timer,
  History
} from 'lucide-react';
import { motion } from 'motion/react';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';
import { MOCK_WORKOUTS } from '@/src/lib/data';

const PLANS = [
  { id: 'ppl', name: 'Push/Pull/Legs', desc: 'Elite muscle building split', exercises: 6, duration: '60-75m' },
  { id: 'fb', name: 'Full Body', desc: 'Maximum frequency for busy lives', exercises: 8, duration: '45-60m' },
  { id: 'ul', name: 'Upper/Lower', desc: 'Balanced strength & hypertrophy', exercises: 7, duration: '60m' },
  { id: 'ai', name: 'Custom AI Plan', desc: 'Generated specifically for your stats', exercises: 7, duration: 'Auto', badge: 'AI Optimized' }
];

export default function WorkoutPage() {
  const [selectedPlan, setSelectedPlan] = useState('ppl');
  const activeWorkout = MOCK_WORKOUTS[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-5xl">Training Lab</h1>
          <p className="text-text-secondary mt-1">Design your session or follow your AI-optimized schedule.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 px-4">
            <History size={18} /> History
          </Button>
          <Button className="h-10 px-4">
             <Plus size={18} /> Create Custom
          </Button>
        </div>
      </header>

      {/* Plan Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {PLANS.map((plan) => (
          <button 
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id)}
            className={cn(
              "text-left p-6 rounded-2xl border transition-all relative group",
              selectedPlan === plan.id 
                ? "bg-brand/10 border-brand/40 ring-1 ring-brand/40" 
                : "bg-surface border-border-default hover:border-border-hover"
            )}
          >
            {plan.badge && (
              <div className="absolute top-3 right-3">
                <Badge variant="brand">{plan.badge}</Badge>
              </div>
            )}
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors",
              selectedPlan === plan.id ? "bg-brand text-black" : "bg-white/5 text-text-muted group-hover:text-text-primary"
            )}>
              <Dumbbell size={20} />
            </div>
            <h3 className="font-bold text-lg mb-1">{plan.name}</h3>
            <p className="text-xs text-text-secondary mb-4 line-clamp-1">{plan.desc}</p>
            <div className="flex items-center gap-3 text-[10px] font-mono text-text-muted uppercase tracking-wider">
              <span className="flex items-center gap-1"><Clock size={12} /> {plan.duration}</span>
              <span className="flex items-center gap-1"><Dumbbell size={12} /> {plan.exercises} Exer.</span>
            </div>
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Exercise List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="heading-display text-2xl">Today's Session: Push A</h2>
            <Badge variant="info">Phase: Hypertrophy</Badge>
          </div>
          
          <div className="space-y-3">
            {activeWorkout.exercises.map((ex, i) => (
              <Card key={i} className="flex items-center justify-between group hover:border-brand/30">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center heading-display text-xl text-text-muted group-hover:text-brand transition-colors">
                    0{i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{ex.name}</h4>
                    <div className="flex gap-3 text-xs text-text-secondary font-mono">
                      <span>{ex.sets} Sets</span>
                      <span>•</span>
                      <span>{ex.reps} Reps</span>
                      <span>•</span>
                      <span className="text-brand">{ex.weight}kg</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="text-text-muted hover:text-brand transition-colors">
                    <ChevronRight size={20} />
                  </button>
                  <div className={cn(
                    "w-6 h-6 rounded-full border flex items-center justify-center transition-colors",
                    ex.completed ? "bg-brand border-brand text-black" : "border-border-default text-transparent"
                  )}>
                    <CheckCircle2 size={16} />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="bg-brand/5 border-dashed border-brand/30 flex flex-col items-center justify-center py-12 gap-4">
             <div className="w-16 h-16 bg-brand/10 rounded-full flex items-center justify-center">
                <Plus className="text-brand" size={32} />
             </div>
             <p className="heading-display text-xl text-brand">Add Exercise</p>
             <p className="text-text-muted text-sm -mt-2">AI will adjust the volume automatically.</p>
          </Card>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-6">
          {/* Active Timer Card */}
          <Card className="bg-surface border-brand/20">
            <div className="flex items-center justify-between mb-6">
              <span className="heading-display text-sm text-text-secondary">Rest Timer</span>
              <Timer size={18} className="text-brand" />
            </div>
            <div className="text-center mb-8">
              <span className="heading-display text-6xl tracking-widest font-mono">01:24</span>
              <p className="text-xs text-text-muted mt-2 uppercase tracking-widest font-bold">Recommended Rest: 90s</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Button className="w-full">Start Rest</Button>
              <Button variant="outline" className="w-full">+30s</Button>
            </div>
          </Card>

          {/* AI Optimizer Card */}
          <Card className="bg-background border-border-default">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={18} className="text-brand" />
              <span className="heading-display text-sm">AI Optimization</span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed mb-6">
              Neural engine detected 15% faster bar speed on last set. Recommended: <span className="text-brand font-bold">+2.5kg</span> on next set.
            </p>
            <Button variant="outline" className="w-full h-10 border-brand/20 text-brand text-xs">Apply Weight Increase</Button>
          </Card>

          {/* Workout Summary Card */}
          <Card>
            <h3 className="heading-display text-lg mb-6">Session Summary</h3>
            <div className="space-y-4">
               {[
                 { label: 'Volume', value: '4,520kg' },
                 { label: 'Intensity', value: '85%' },
                 { label: 'Est. Calories', value: '420 kcal' },
                 { label: 'Avg. Heart Rate', value: '142 bpm' }
               ].map((item, i) => (
                 <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                   <span className="text-xs text-text-secondary uppercase font-bold tracking-wider">{item.label}</span>
                   <span className="font-mono text-sm">{item.value}</span>
                 </div>
               ))}
            </div>
            <Button variant="primary" className="w-full h-12 mt-8 text-lg">Finish Session</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
