import { motion } from 'motion/react';
import { 
  Flame, 
  Dumbbell, 
  Utensils, 
  Droplets, 
  TrendingUp, 
  Trophy, 
  Zap,
  CheckCircle2,
  PlayCircle,
  Award
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { MOCK_USER, MOCK_WORKOUTS } from '@/src/lib/data';
import { Link } from 'react-router-dom';

const data = [
  { day: 'Mon', calories: 2100, workouts: 45 },
  { day: 'Tue', calories: 2300, workouts: 60 },
  { day: 'Wed', calories: 1800, workouts: 0 },
  { day: 'Thu', calories: 2450, workouts: 75 },
  { day: 'Fri', calories: 2200, workouts: 50 },
  { day: 'Sat', calories: 2600, workouts: 90 },
  { day: 'Sun', calories: 1900, workouts: 30 },
];

export default function DashboardPage() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-5xl">{greeting}, {MOCK_USER.fullName.split(' ')[0]}</h1>
          <p className="text-text-secondary mt-1">You're on a <span className="text-brand font-bold">{MOCK_USER.streakDays} day</span> streak. Keep it up!</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="brand" className="h-8 flex items-center gap-1">
            <Flame size={12} className="fill-current" /> Streak Athlete
          </Badge>
          <Badge variant="info" className="h-8 flex items-center gap-1">
            <Trophy size={12} /> Elite Tier
          </Badge>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Calories', value: '2,450', unit: 'kcal', icon: Utensils, color: 'text-brand', progress: 75 },
          { label: 'Workouts', value: '4/5', unit: 'sessions', icon: Dumbbell, color: 'text-info', progress: 80 },
          { label: 'Water', value: '6/8', unit: 'glasses', icon: Droplets, color: 'text-amber', progress: 65 },
          { label: 'Progress', value: '+2.4%', unit: 'this week', icon: TrendingUp, color: 'text-brand', progress: 100 },
        ].map((stat, i) => (
          <Card key={i} className="relative overflow-hidden group">
            <div className="flex items-center justify-between mb-4">
              <div className={cn("p-2 rounded-lg bg-white/5", stat.color)}>
                <stat.icon size={20} />
              </div>
              <Badge variant="muted">Today</Badge>
            </div>
            <div className="flex items-baseline gap-1 mb-2">
              <span className="heading-display text-3xl">{stat.value}</span>
              <span className="text-text-muted text-xs font-mono uppercase">{stat.unit}</span>
            </div>
            <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${stat.progress}%` }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className={cn("h-full", stat.color.replace('text-', 'bg-'))} 
              />
            </div>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Workout & Charts */}
        <div className="lg:col-span-2 space-y-8">
          {/* Today's Workout Card */}
          <Card className="relative overflow-hidden group border-brand/20">
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-brand/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-brand mb-4">
                <Zap size={16} className="fill-current" />
                <span className="heading-display text-sm">Targeting: Hypertrophy</span>
              </div>
              <h2 className="heading-display text-3xl mb-2">Push Session A</h2>
              <p className="text-text-secondary text-sm mb-6 max-w-md">Focus on explosive movements and controlled eccentric phases. 45-60 minutes estimated.</p>
              
              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-text-muted" />
                  <span className="text-sm font-medium">6 Exercises</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-text-muted" />
                  <span className="text-sm font-medium">18 Total Sets</span>
                </div>
              </div>

              <div className="flex gap-4">
                <Link to="/app/workout">
                  <Button className="h-12 px-8">
                    <PlayCircle size={18} /> Start Workout
                  </Button>
                </Link>
                <Button variant="outline" className="h-12 px-6">View Details</Button>
              </div>
            </div>
          </Card>

          {/* Activity Chart */}
          <Card>
            <div className="flex items-center justify-between mb-8">
              <h3 className="heading-display text-xl">Activity Overview</h3>
              <div className="flex gap-2">
                {['Workouts', 'Calories'].map((type) => (
                  <button key={type} className="text-xs font-bold uppercase tracking-widest text-text-muted hover:text-brand transition-colors">
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorCal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00D98A" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#00D98A" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis 
                      dataKey="day" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#555', fontSize: 12, family: 'DM Mono' }} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#555', fontSize: 10, family: 'DM Mono' }} 
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                      itemStyle={{ color: '#00D98A' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="calories" 
                      stroke="#00D98A" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorCal)" 
                    />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Sidebar Apps (Nutrition & AI Tip) */}
        <div className="space-y-8">
          {/* AI Tip Card */}
          <Card className="bg-brand text-black">
            <div className="flex items-center gap-2 mb-4">
              <Zap size={20} className="fill-current" />
              <span className="heading-display text-sm">AI Coach Insight</span>
            </div>
            <p className="text-lg font-medium leading-snug mb-6 italic">
              "Based on your 3-day recovery data, your CNS is primed for a heavy leg session. Aim for a 2.5kg increase on your Squat top set today."
            </p>
            <Button variant="outline" className="bg-black/10 border-black/20 text-black hover:bg-black/20 w-full">
              Apply to Plan
            </Button>
          </Card>

          {/* Nutrition Mini Card */}
          <Card>
            <h3 className="heading-display text-xl mb-6">Nutrition</h3>
            <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-mono mb-1">
                   <span className="text-text-secondary">Protein</span>
                   <span className="text-text-primary">145g / 180g</span>
                 </div>
                 <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                   <div className="bg-brand h-full w-[80%]" />
                 </div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-mono mb-1">
                   <span className="text-text-secondary">Carbs</span>
                   <span className="text-text-primary">210g / 300g</span>
                 </div>
                 <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                   <div className="bg-info h-full w-[70%]" />
                 </div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-xs font-mono mb-1">
                   <span className="text-text-secondary">Fats</span>
                   <span className="text-text-primary">65g / 80g</span>
                 </div>
                 <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                   <div className="bg-amber h-full w-[85%]" />
                 </div>
               </div>
            </div>
            <Link to="/app/nutrition" className="block mt-8">
              <Button variant="outline" className="w-full">Log Meals</Button>
            </Link>
          </Card>

          {/* Achievements Placeholder */}
          <div className="flex px-2 py-4 gap-4 overflow-x-auto no-scrollbar">
            {[1, 2, 3].map(i => (
              <div key={i} className="shrink-0 w-12 h-12 rounded-full bg-surface border border-white/5 flex items-center justify-center text-text-muted hover:border-brand/50 hover:text-brand transition-all cursor-pointer">
                <Award size={24} />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
