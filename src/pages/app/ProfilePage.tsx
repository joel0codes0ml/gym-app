import { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Settings, 
  Shield, 
  CreditCard, 
  Bell, 
  Globe, 
  ChevronRight, 
  LogOut, 
  Camera,
  BadgeCheck,
  Dumbbell,
  Loader
} from 'lucide-react';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';
import { useFirebase } from '@/src/components/auth/FirebaseContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export default function ProfilePage() {
  const { user, profile, loading: authLoading, logout } = useFirebase();
  const [activeTab, setActiveTab] = useState('profile');

  const settingsGroups = [
    {
      title: "Account",
      items: [
        { label: "Personal Information", icon: UserIcon, desc: "Height, weight, and goals" },
        { label: "Subscription", icon: CreditCard, desc: "Manage Pro plan", badge: profile?.subscriptionTier === 'free' ? undefined : "Pro" },
        { label: "Connected Devices", icon: Globe, desc: "Apple Health, Google Fit" }
      ]
    },
    {
      title: "Preferences",
      items: [
        { label: "Notifications", icon: Bell, desc: "Workout reminders and tips" },
        { label: "Display Units", icon: Settings, desc: "kg/lbs, cm/ft" }
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { label: "Security", icon: Shield, desc: "Password and authentication" },
        { label: "Legal", icon: Globe, desc: "Privacy policy and terms" }
      ]
    }
  ];

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader className="animate-spin text-brand" size={40} />
      </div>
    );
  }

  const displayName = profile?.fullName || user?.displayName || 'User';
  const goal = profile?.goal?.replace('_', ' ') || 'General Fitness';
  const level = profile?.fitnessLevel || 'Beginner';
  const avatarUrl = profile?.avatarUrl || user?.photoURL || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=200&auto=format&fit=crop';

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <h1 className="heading-display text-4xl md:text-5xl">Your Profile</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="text-center py-10">
             <div className="relative inline-block mb-6">
                <div className="w-32 h-32 rounded-3xl bg-brand/10 border border-brand/20 flex items-center justify-center relative group overflow-hidden">
                   <img 
                    src={avatarUrl} 
                    alt={displayName} 
                    className="w-full h-full object-cover"
                   />
                   <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity flex items-center justify-center cursor-pointer">
                      <Camera size={24} className="text-white" />
                   </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-brand text-black p-1.5 rounded-xl border-4 border-surface">
                   <BadgeCheck size={18} />
                </div>
             </div>
             <h2 className="heading-display text-3xl mb-1">{displayName}</h2>
             <p className="text-text-secondary text-sm mb-6 uppercase tracking-wider font-bold">{goal} • {level} Level</p>
             <div className="flex justify-center gap-2">
                <Badge variant="brand">Level 12</Badge>
                <Badge variant="info">Elite Member</Badge>
             </div>
          </Card>

          <Card className="bg-brand/5 border-dashed border-brand/20">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-brand text-black rounded-xl flex items-center justify-center">
                  <Dumbbell size={20} />
                </div>
                <h3 className="heading-display text-xl uppercase tracking-wider">Training Stats</h3>
             </div>
             <div className="space-y-3">
               {[
                 { label: "Workouts Done", value: "142" },
                 { label: "Volume Lifted", value: "842,500kg" },
                 { label: "AI Tips Followed", value: "89" }
               ].map((stat, i) => (
                 <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                   <span className="text-xs text-text-secondary font-bold uppercase">{stat.label}</span>
                   <span className="font-mono text-sm">{stat.value}</span>
                 </div>
               ))}
             </div>
          </Card>
        </div>

        {/* Settings List */}
        <div className="lg:col-span-2 space-y-6">
           {settingsGroups.map((group, i) => (
             <div key={i} className="space-y-4">
               <h3 className="heading-display text-xl text-text-muted ml-2">{group.title}</h3>
               <div className="space-y-2">
                  {group.items.map((item, j) => (
                    <button 
                      key={j}
                      className="w-full bg-surface border border-border-default rounded-2xl p-6 flex items-center justify-between group hover:border-brand/40 transition-all text-left"
                    >
                      <div className="flex items-center gap-5">
                         <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-text-muted group-hover:bg-brand/10 group-hover:text-brand transition-colors">
                            <item.icon size={24} />
                         </div>
                         <div>
                            <div className="flex items-center gap-3">
                               <h4 className="font-bold text-lg">{item.label}</h4>
                               {item.badge && <Badge variant="brand" className="px-1.5 py-0.5 text-[8px]">{item.badge}</Badge>}
                            </div>
                            <p className="text-sm text-text-secondary">{item.desc}</p>
                         </div>
                      </div>
                      <ChevronRight size={20} className="text-text-muted group-hover:text-brand transition-transform group-hover:translate-x-1" />
                    </button>
                  ))}
               </div>
             </div>
           ))}

           <Button variant="danger" className="w-full h-14 mt-8" onClick={logout}>
              <LogOut size={20} /> Log Out of GymCoach AI
           </Button>
        </div>
      </div>
    </div>
  );
}
