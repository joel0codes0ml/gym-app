import { motion } from 'motion/react';
import { Check, Info, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Badge } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const tiers = [
    {
      name: 'Free',
      price: billingCycle === 'monthly' ? '$0' : '$0',
      description: 'Perfect for getting started with AI coaching.',
      features: [
        'Basic workout tracking',
        'Basic nutrition logs',
        '3 AI Coach messages per day',
        'Standard workouts',
        '7-day history'
      ],
      cta: 'Start for Free',
      popular: false
    },
    {
      name: 'Pro',
      price: billingCycle === 'monthly' ? '$9' : '$90',
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      description: 'The complete training partner for serious athletes.',
      features: [
        'Unlimited AI Coach messages',
        'Custom personalized plans',
        'Advanced progress analytics',
        'Body stat tracking',
        'Full workout library',
        'Priority support'
      ],
      cta: 'Get Started',
      popular: true
    },
    {
      name: 'Elite',
      price: billingCycle === 'monthly' ? '$19' : '$190',
      period: billingCycle === 'monthly' ? '/mo' : '/yr',
      description: 'Maximum performance with nutritional engineering.',
      features: [
        'Everything in Pro',
        'AI meal plan generator',
        'Macro optimization',
        'Data export (.csv)',
        'Early access to features',
        '1-on-1 AI deep dive'
      ],
      cta: 'Go Elite',
      popular: false
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
        <Badge className="mb-4">Pricing Plans</Badge>
        <h1 className="heading-display text-5xl md:text-7xl mb-6">Invest in <span className="text-brand">Yourself.</span></h1>
        <p className="text-text-secondary text-lg max-w-2xl mx-auto mb-10">
          Choose the plan that fits your fitness goals. Cancel anytime. No hidden fees.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <span className={cn("text-sm font-medium", billingCycle === 'monthly' ? "text-text-primary" : "text-text-muted")}>Monthly</span>
          <button 
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
            className="w-16 h-8 bg-surface border border-border-default rounded-full relative transition-colors p-1"
          >
            <motion.div
              animate={{ x: billingCycle === 'monthly' ? 0 : 32 }}
              className="w-6 h-6 bg-brand rounded-full"
            />
          </button>
          <div className="flex items-center gap-2">
            <span className={cn("text-sm font-medium", billingCycle === 'yearly' ? "text-brand" : "text-text-muted")}>Yearly</span>
            <Badge variant="brand" className="text-[10px]">Save 20%</Badge>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-left">
          {tiers.map((tier, i) => (
            <Card 
              key={i} 
              className={cn(
                "relative flex flex-col items-stretch h-full overflow-hidden",
                tier.popular && "border-brand shadow-[0_0_40px_rgba(0,217,138,0.1)] scale-105 z-10"
              )}
            >
              {tier.popular && (
                <div className="absolute top-0 right-0 py-1.5 px-6 bg-brand text-black font-bold text-[10px] uppercase tracking-widest rounded-bl-xl">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="heading-display text-2xl text-text-primary mb-2">{tier.name}</h3>
                <p className="text-text-secondary text-sm h-10">{tier.description}</p>
              </div>

              <div className="mb-8 flex items-baseline gap-1">
                <span className="heading-display text-5xl font-bold">{tier.price}</span>
                {tier.period && <span className="text-text-secondary">{tier.period}</span>}
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3 text-sm text-text-secondary">
                    <Check size={18} className="text-brand shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/app/dashboard" className="mt-auto">
                <Button 
                  variant={tier.popular ? 'primary' : 'outline'} 
                  className="w-full h-12 text-base"
                >
                  {tier.cta}
                </Button>
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ Teaser */}
      <section className="bg-surface/30 py-24 border-y border-border-default">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-display text-3xl md:text-5xl text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {[
              { q: "How accurate is the AI Coach?", a: "Our AI is trained on over 50,000 professional coaching hours. It provides scientifically-backed advice tailored to your specific stats and history." },
              { q: "Can I cancel my subscription anytime?", a: "Yes, you can cancel your Pro or Elite subscription anytime through your profile settings. You'll keep access until the end of your billing period." },
              { q: "Does the AI support home workouts?", a: "Absolutely. You can specify what equipment you have (including 'none'), and the AI will generate a plan accordingly." }
            ].map((faq, i) => (
              <div key={i} className="bg-surface p-6 rounded-2xl border border-border-default">
                <h4 className="font-bold mb-3 flex items-center justify-between">
                  {faq.q}
                </h4>
                <p className="text-sm text-text-secondary leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/faq" className="text-brand text-sm font-medium hover:underline inline-flex items-center gap-2">
              View all FAQs <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
