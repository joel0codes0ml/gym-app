import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Play, Star, Users, Zap, Trophy, Target, Heart } from 'lucide-react';
import { Button, Card, Badge } from '@/src/components/ui/LayoutComponents';

const Hero = () => {
  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-brand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="brand" className="mb-6">v2.0 Now Live</Badge>
            <h1 className="heading-display text-6xl md:text-8xl leading-tight mb-6">
              Your AI <span className="text-brand">Personal Trainer.</span> <br />
              Always On.
            </h1>
            <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Stop following generic plans. Get a personalized workout and nutrition strategy that adapts to your progress in real-time, powered by advanced AI.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/app/dashboard">
                <Button className="w-full sm:w-auto text-lg h-14 px-10">
                  Start for free — no credit card
                </Button>
              </Link>
              <Button variant="outline" className="w-full sm:w-auto text-lg h-14 px-10">
                <Play size={18} fill="currentColor" /> Watch the demo
              </Button>
            </div>

            <div className="flex items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img 
                    key={i}
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                    className="w-10 h-10 rounded-full border-2 border-background bg-surface"
                    alt={`User ${i}`}
                  />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex items-center gap-1 text-brand">
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  <Star size={14} fill="currentColor" />
                  < Star size={14} fill="currentColor" />
                </div>
                <p className="text-text-secondary">
                  <span className="text-text-primary font-bold">12,000+ athletes</span> trust GymCoach AI
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] hidden lg:block"
          >
            {/* App Preview Mockup */}
            <div className="absolute inset-0 bg-brand/10 rounded-[40px] blur-3xl opacity-30" />
            <div className="relative h-full bg-surface border border-white/10 rounded-[40px] p-4 shadow-2xl overflow-hidden group">
              <div className="h-full bg-background rounded-[32px] overflow-hidden border border-white/5 flex flex-col">
                {/* Navbar Mockup */}
                <div className="h-14 border-b border-white/5 px-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-brand rounded-md" />
                    <div className="w-20 h-3 bg-white/10 rounded-full" />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-4 h-4 bg-white/10 rounded-full" />
                    <div className="w-12 h-4 bg-brand/20 rounded-full" />
                  </div>
                </div>
                
                {/* Content Mockup */}
                <div className="p-6 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-1 h-32 bg-surface rounded-2xl border border-white/5 p-4 space-y-3">
                      <div className="w-1/2 h-2 bg-text-muted rounded-full" />
                      <div className="w-3/4 h-6 bg-white/5 rounded-lg" />
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-brand" />
                      </div>
                    </div>
                    <div className="flex-1 h-32 bg-surface rounded-2xl border border-white/5 p-4 space-y-3">
                      <div className="w-1/2 h-2 bg-text-muted rounded-full" />
                      <div className="w-3/4 h-6 bg-white/5 rounded-lg" />
                      <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-amber" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="h-48 bg-surface rounded-3xl border border-white/5 p-6 relative overflow-hidden group-hover:border-brand/40 transition-colors">
                    <div className="relative z-10 space-y-4">
                      <div className="w-1/4 h-3 bg-brand/30 rounded-full" />
                      <div className="w-3/4 h-8 bg-white/5 rounded-xl" />
                      <div className="flex gap-4">
                        <div className="w-20 h-6 bg-white/5 rounded-lg" />
                        <div className="w-20 h-6 bg-white/5 rounded-lg" />
                      </div>
                    </div>
                    <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-gradient-to-l from-brand/10 to-transparent p-6 flex items-end justify-end">
                      <Trophy className="text-brand w-20 h-20 opacity-20" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="w-full h-4 bg-white/5 rounded-full" />
                    <div className="w-4/5 h-4 bg-white/5 rounded-full" />
                    <div className="w-full h-4 bg-white/5 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Element */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -right-8 top-1/4 bg-surface border border-white/10 rounded-2xl p-4 shadow-2xl z-20 backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand/20 rounded-full flex items-center justify-center">
                  <Zap className="text-brand" size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-text-secondary uppercase font-bold tracking-widest">Performance</p>
                  <p className="text-lg font-bold">+24% Strength</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  const steps = [
    { title: "Set your goal", desc: "Choose muscle gain, fat loss, or endurance. AI handles the complexity.", icon: Target },
    { title: "Get your plan", desc: "AI generates a bespoke workout + nutrition journey in seconds.", icon: Zap },
    { title: "Track & Adapt", desc: "AI adjusts your sets, reps, and calories as you progress.", icon: Trophy },
  ];

  return (
    <section className="py-24 bg-surface/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 px-4">
          <h2 className="heading-display text-4xl md:text-5xl mb-4">How it beats the generic apps</h2>
          <p className="text-text-secondary max-w-2xl mx-auto"> GymCoach AI doesn't just give you a PDF. It listens, analyzes, and evolves with you.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative group">
              <div className="mb-6 w-16 h-16 bg-brand/5 border border-brand/10 rounded-2xl flex items-center justify-center group-hover:bg-brand/10 group-hover:border-brand/30 transition-all">
                <step.icon className="text-brand" size={32} />
              </div>
              <h3 className="heading-display text-2xl mb-4">{step.title}</h3>
              <p className="text-text-secondary leading-relaxed">{step.desc}</p>
              {i < 2 && (
                <div className="hidden lg:block absolute top-8 -right-4 w-8 h-px bg-white/10" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  return (
    <section className="py-24 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-text-muted heading-display mb-12 text-sm tracking-[0.2em]">Trusted by athletes from</p>
        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale transition-all hover:grayscale-0">
          <div className="heading-display text-3xl italic">Gold's Gym</div>
          <div className="heading-display text-3xl">Equinox</div>
          <div className="heading-display text-3xl italic">Anytime</div>
          <div className="heading-display text-3xl">PureGym</div>
          <div className="heading-display text-3xl italic">Muscle</div>
        </div>
      </div>
    </section>
  );
}

const LandingPage = () => {
  return (
    <div className="overflow-hidden">
      <Hero />
      <SocialProof />
      <Benefits />
      
      {/* Testimonials Teaser */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 py-10">
              <Badge className="mb-4">Testimonials</Badge>
              <h2 className="heading-display text-4xl md:text-5xl mb-6 leading-tight">Stories of real transformation</h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Most users hit their first personal record within 14 days of starting their personalized plan.
              </p>
              <Link to="/app/dashboard">
                <Button variant="secondary">Join the 12,000+ elite</Button>
              </Link>
            </div>
            
            <div className="lg:col-span-2 grid md:grid-cols-2 gap-6">
              {[
                { name: "Sarah K.", goal: "Fat Loss", quote: "Lost 12kg in 3 months. The AI coach adjusted my calories when I plateaud. Never looked back.", stats: "-12kg" },
                { name: "James L.", goal: "Muscle Gain", quote: "Bench went from 60kg to 100kg in record time. The progressive overload algorithm is magic.", stats: "+40kg Overload" }
              ].map((t, i) => (
                <Card key={i} className="flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 text-brand mb-4">
                      {[1, 2, 3, 4, 5].map(s => <Star key={s} size={14} fill="currentColor" />)}
                    </div>
                    <p className="text-lg italic mb-6">"{t.quote}"</p>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <div>
                      <p className="font-bold">{t.name}</p>
                      <p className="text-xs text-text-secondary">{t.goal}</p>
                    </div>
                    <Badge variant="brand">{t.stats}</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brand rounded-[48px] p-12 md:p-24 text-center overflow-hidden relative group">
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="heading-display text-black text-5xl md:text-7xl mb-8">Ready to evolve?</h2>
              <p className="text-black/70 text-lg md:text-xl mb-12">
                Get your personalized 12-week AI coach plan ready in under 60 seconds. Free to start, No strings attached.
              </p>
              <Link to="/app/dashboard">
                <button className="bg-black text-brand px-12 py-5 rounded-2xl font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl">
                  Build My AI Plan
                </button>
              </Link>
            </div>
            {/* Background shapes */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-white/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-black/20 rounded-full blur-3xl opacity-20 pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
