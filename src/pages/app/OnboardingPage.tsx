import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Target, 
  Zap, 
  Dumbbell, 
  Calendar, 
  User as UserIcon, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { Button, Card, Badge } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useFirebase } from '@/src/components/auth/FirebaseContext';
import { doc, setDoc } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '@/src/lib/firebase';

const STEPS = [
  { id: 'goal', title: 'What is your primary goal?', subtitle: 'The AI will optimize your volume and macros based on this choice.' },
  { id: 'level', title: 'What is your fitness level?', subtitle: 'This determines your starting exercise selection and intensity.' },
  { id: 'stats', title: 'Your physical metrics', subtitle: 'Crucial for accurate calorie and macro-nutrient calculations.' },
  { id: 'schedule', title: 'Weekly Availability', subtitle: 'How many days per week are you committed to training?' },
  { id: 'result', title: 'Your AI Evolution Plan', subtitle: 'Based on 50,000+ coaching data points, here is your path.' }
];

export default function OnboardingPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    goal: 'muscle_gain',
    level: 'intermediate',
    age: 28,
    weight: 78,
    height: 180,
    gender: 'male',
    days: 4
  });
  const navigate = useNavigate();
  const { user } = useFirebase();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // If not logged in and past first page, might want to redirect or show login
    // But for now let's just assume they are or will be
  }, [user, step]);

  const nextStep = () => setStep(s => Math.min(s + 1, STEPS.length - 1));
  const prevStep = () => setStep(s => Math.max(s - 1, 0));

  const completeOnboarding = async () => {
    if (!user) {
      alert("Please login to save your progress");
      return;
    }

    setIsSubmitting(true);
    const userDocRef = doc(db, 'users', user.uid);
    const profileData = {
      id: user.uid,
      fullName: user.displayName || 'User',
      avatarUrl: user.photoURL || '',
      age: formData.age,
      weightKg: formData.weight,
      heightCm: formData.height,
      goal: formData.goal,
      fitnessLevel: formData.level,
      planId: 'neural_strength_v1',
      subscriptionTier: 'free',
      streakDays: 0,
      createdAt: new Date().toISOString()
    };

    try {
      await setDoc(userDocRef, profileData);
      navigate('/app/dashboard');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { id: 'muscle_gain', label: 'Muscle Gain', icon: Trophy, desc: 'Maximize hypertrophy and strength' },
              { id: 'fat_loss', label: 'Fat Loss', icon: Target, desc: 'Athetic physique with high metabolic rate' },
              { id: 'endurance', label: 'Endurance', icon: Zap, desc: 'Conditioning and aerobic capacity' },
              { id: 'general', label: 'General Fitness', icon: CheckCircle2, desc: 'Balanced health and longevity' }
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFormData({ ...formData, goal: opt.id as any })}
                className={cn(
                  "p-6 rounded-[32px] border text-left transition-all group",
                  formData.goal === opt.id ? "bg-brand/10 border-brand/50" : "bg-surface border-white/5 hover:border-white/10"
                )}
              >
                <div className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                  formData.goal === opt.id ? "bg-brand text-black" : "bg-white/5 text-text-muted transition-colors"
                )}>
                  <opt.icon size={24} />
                </div>
                <h4 className="heading-display text-2xl mb-1">{opt.label}</h4>
                <p className="text-text-secondary text-sm leading-snug">{opt.desc}</p>
              </button>
            ))}
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
             {[
               { id: 'beginner', label: 'Beginner', desc: 'New to formal resistance training (< 6 months)' },
               { id: 'intermediate', label: 'Intermediate', desc: 'Consistent training history (1-3 years)' },
               { id: 'advanced', label: 'Advanced', desc: 'Extensive performance experience (3+ years)' }
             ].map((opt) => (
               <button
                key={opt.id}
                onClick={() => setFormData({ ...formData, level: opt.id as any })}
                className={cn(
                  "w-full p-6 p-8 rounded-[32px] border flex items-center justify-between text-left transition-all",
                  formData.level === opt.id ? "bg-brand/10 border-brand/50" : "bg-surface border-white/5 hover:border-white/10"
                )}
               >
                 <div>
                   <h4 className="heading-display text-2xl mb-1">{opt.label}</h4>
                   <p className="text-text-secondary text-sm">{opt.desc}</p>
                 </div>
                 <div className={cn(
                   "w-6 h-6 rounded-full border flex items-center justify-center",
                   formData.level === opt.id ? "bg-brand border-brand text-black" : "border-white/10"
                 )}>
                   {formData.level === opt.id && <CheckCircle2 size={16} />}
                 </div>
               </button>
             ))}
          </div>
        );
      case 2:
        return (
          <Card className="p-8 space-y-8">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Age</label>
                <input 
                  type="number" 
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 heading-display text-3xl focus:border-brand/40 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Gender</label>
                <div className="flex gap-2 h-[68px]">
                  {['male', 'female'].map(g => (
                    <button
                      key={g}
                      onClick={() => setFormData({ ...formData, gender: g as any })}
                      className={cn(
                        "flex-1 rounded-xl border heading-display text-sm uppercase tracking-widest transition-all",
                        formData.gender === g ? "bg-brand text-black border-brand" : "bg-background border-white/10 text-text-muted"
                      )}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Weight (kg)</label>
                <input 
                  type="number" 
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: parseInt(e.target.value) })}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 heading-display text-3xl focus:border-brand/40 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-text-muted">Height (cm)</label>
                <input 
                  type="number" 
                  value={formData.height}
                  onChange={(e) => setFormData({ ...formData, height: parseInt(e.target.value) })}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-4 heading-display text-3xl focus:border-brand/40 outline-none transition-all"
                />
              </div>
            </div>
          </Card>
        );
      case 3:
        return (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[3, 4, 5, 6].map((day) => (
              <button
                key={day}
                onClick={() => setFormData({ ...formData, days: day })}
                className={cn(
                  "p-8 rounded-[32px] border group transition-all text-center",
                  formData.days === day ? "bg-brand/10 border-brand/50" : "bg-surface border-white/5 hover:border-white/10"
                )}
              >
                <span className="heading-display text-5xl block mb-2 transition-colors">
                  {day}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-text-muted">Days / Week</span>
              </button>
            ))}
          </div>
        );
      case 4:
        return (
          <div className="space-y-8">
             <Card className="bg-brand text-black p-8 relative overflow-hidden">
                <Dumbbell size={120} className="absolute -right-10 -bottom-10 opacity-10" />
                <Badge variant="muted" className="bg-black/10 text-black border-black/20 mb-4">AI Recommended</Badge>
                <h3 className="heading-display text-4xl mb-4">Neural Strength Evolution</h3>
                <p className="text-lg font-medium leading-relaxed opacity-90 max-w-lg">
                  Based on your {formData.level} level and {formData.goal.replace('_', ' ')} goal, we've designed a {formData.days}-day high-frequency block focused on compound movements and progressive overload.
                </p>
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-black/10">
                   <div>
                     <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Phase</p>
                     <p className="font-bold">Hypertrophy</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Duration</p>
                     <p className="font-bold">12 Weeks</p>
                   </div>
                   <div>
                     <p className="text-[10px] uppercase font-bold tracking-widest opacity-60">Macros</p>
                     <p className="font-bold">Aggressive</p>
                   </div>
                </div>
             </Card>
             <div className="flex gap-4">
                <Card className="flex-1 p-6 space-y-4">
                   <div className="flex items-center gap-3">
                      <Target size={20} className="text-brand" />
                      <h4 className="heading-display text-xl">Daily Target</h4>
                   </div>
                   <div className="heading-display text-4xl">3,140 <span className="text-sm font-mono text-text-muted">kcal</span></div>
                </Card>
                <Card className="flex-1 p-6 space-y-4">
                   <div className="flex items-center gap-3">
                      <Zap size={20} className="text-brand" />
                      <h4 className="heading-display text-xl">Workout Focus</h4>
                   </div>
                   <div className="heading-display text-4xl">Heavy <span className="text-sm font-mono text-text-muted">Compounds</span></div>
                </Card>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-32 max-w-3xl mx-auto px-4 sm:px-6">
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
           <div className="flex gap-1.5">
             {STEPS.map((_, i) => (
               <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  i === step ? "w-8 bg-brand" : i < step ? "w-4 bg-brand/30" : "w-4 bg-white/10"
                )} 
               />
             ))}
           </div>
           <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">Step {step + 1} / {STEPS.length}</span>
        </div>
        <motion.div
           key={step}
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.4 }}
        >
          <h1 className="heading-display text-4xl md:text-6xl mb-4">{STEPS[step].title}</h1>
          <p className="text-text-secondary text-lg">{STEPS[step].subtitle}</p>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="mb-12"
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-between items-center fixed md:static bottom-0 left-0 right-0 p-4 md:p-0 bg-background/80 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t border-white/5 md:border-0 z-50">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={step === 0}
          className="px-8 h-12"
        >
          <ChevronLeft size={20} /> Back
        </Button>
        {step === STEPS.length - 1 ? (
          <Button 
            className="px-10 h-12" 
            onClick={completeOnboarding}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Enter Dashboard'} <ArrowRight className="ml-2" size={20} />
          </Button>
        ) : (
          <Button 
            className="px-10 h-12" 
            onClick={nextStep}
          >
            Continue <ChevronRight className="ml-2" size={20} />
          </Button>
        )}
      </div>
    </div>
  );
}
