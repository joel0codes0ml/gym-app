import { motion } from 'motion/react';
import { 
  BarChart as BarChartIcon, 
  LineChart as LineChartIcon, 
  TrendingUp, 
  Weight, 
  Trophy, 
  Target, 
  ChevronRight,
  ArrowUpRight,
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
  LineChart,
  Line,
  Cell
} from 'recharts';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';

const WORKOUT_STATS = [
  { day: 'Mon', minutes: 45, intensity: 80 },
  { day: 'Tue', minutes: 60, intensity: 85 },
  { day: 'Wed', minutes: 0, intensity: 0 },
  { day: 'Thu', minutes: 75, intensity: 90 },
  { day: 'Fri', minutes: 50, intensity: 75 },
  { day: 'Sat', minutes: 90, intensity: 95 },
  { day: 'Sun', minutes: 30, intensity: 60 },
];

const WEIGHT_TREND = [
  { date: 'Apr 01', weight: 80.2 },
  { date: 'Apr 08', weight: 79.8 },
  { date: 'Apr 15', weight: 79.5 },
  { date: 'Apr 22', weight: 79.1 },
  { date: 'Apr 29', weight: 78.6 },
  { date: 'May 06', weight: 78.0 },
];

const LIFT_PROGRESS = [
  { month: 'Jan', bench: 80, squat: 100, deadlift: 120 },
  { month: 'Feb', bench: 85, squat: 105, deadlift: 125 },
  { month: 'Mar', bench: 85, squat: 110, deadlift: 130 },
  { month: 'Apr', bench: 90, squat: 115, deadlift: 140 },
  { month: 'May', bench: 95, squat: 125, deadlift: 155 },
];

export default function ProgressPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-5xl">Performance Hub</h1>
          <p className="text-text-secondary mt-1">Detailed visualization of your growth and biomechanical trends.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 px-4">
            Share Report
          </Button>
          <Button className="h-10 px-4">
             Export Data
          </Button>
        </div>
      </header>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {[
           { label: 'Avg Intensity', value: '82%', sub: '+4.5% vs last week', icon: TrendingUp },
           { label: 'Total Volume', value: '24.5t', sub: 'Last 7 days', icon: Weight },
           { label: 'PRs Hit', value: '12', sub: 'This month', icon: Award },
           { label: 'Current Goal', value: '92%', sub: 'Muscle Gain phase', icon: Target },
         ].map((stat, i) => (
           <Card key={i} className="group">
              <div className="flex items-center gap-2 text-text-muted mb-2 group-hover:text-brand transition-colors">
                <stat.icon size={16} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="heading-display text-3xl mb-1">{stat.value}</div>
              <div className="text-[10px] text-brand font-mono">{stat.sub}</div>
           </Card>
         ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Weekly Workout Volume */}
        <Card>
          <div className="flex items-center justify-between mb-8">
            <h3 className="heading-display text-xl">Weekly Training Volume</h3>
            <Badge variant="muted">Minutes Trained</Badge>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <BarChart data={WORKOUT_STATS}>
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
                    cursor={{ fill: '#ffffff05' }}
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                  <Bar dataKey="minutes" radius={[4, 4, 0, 0]}>
                    {WORKOUT_STATS.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.minutes > 60 ? '#00D98A' : '#1A1A1A'} />
                    ))}
                  </Bar>
                </BarChart>
             </ResponsiveContainer>
          </div>
        </Card>

        {/* Weight Trend */}
        <Card>
          <div className="flex items-center justify-between mb-8">
            <h3 className="heading-display text-xl">Weight Trend</h3>
            <Badge variant="brand">-2.2kg This Month</Badge>
          </div>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={WEIGHT_TREND}>
                  <defs>
                    <linearGradient id="colorWeight" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00D98A" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#00D98A" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#555', fontSize: 10, family: 'DM Mono' }} 
                  />
                  <YAxis 
                    domain={['dataMin - 2', 'dataMax + 2']}
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#555', fontSize: 10, family: 'DM Mono' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="weight" 
                    stroke="#00D98A" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorWeight)" 
                  />
                </AreaChart>
             </ResponsiveContainer>
          </div>
        </Card>

        {/* Big Lift Progress */}
        <Card className="lg:col-span-2">
           <div className="flex items-center justify-between mb-12">
            <div>
              <h3 className="heading-display text-2xl">Main Lift Progression</h3>
              <p className="text-text-secondary text-sm">Compound lifts over the last 5 months</p>
            </div>
            <div className="flex gap-6">
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-brand" /><span className="text-xs font-bold uppercase">Deadlift</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-info" /><span className="text-xs font-bold uppercase">Squat</span></div>
               <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber" /><span className="text-xs font-bold uppercase">Bench</span></div>
            </div>
          </div>
          <div className="h-[400px]">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={LIFT_PROGRESS}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#888', fontSize: 12, family: 'DM Mono' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#888', fontSize: 10, family: 'DM Mono' }} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  />
                  <Line type="monotone" dataKey="deadlift" stroke="#00D98A" strokeWidth={4} dot={{ fill: '#00D98A', r: 6 }} />
                  <Line type="monotone" dataKey="squat" stroke="#378ADD" strokeWidth={4} dot={{ fill: '#378ADD', r: 6 }} />
                  <Line type="monotone" dataKey="bench" stroke="#EF9F27" strokeWidth={4} dot={{ fill: '#EF9F27', r: 6 }} />
                </LineChart>
             </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* PR Table */}
      <Card>
        <h3 className="heading-display text-xl mb-6">Recent Personal Records</h3>
        <div className="space-y-1">
          {[
            { lift: 'Deadlift', weight: '155kg', date: 'Yesterday', change: '+5kg' },
            { lift: 'Back Squat', weight: '125kg', date: '3 days ago', change: '+2.5kg' },
            { lift: 'Overhead Press', weight: '65kg', date: 'Last week', change: '+2.5kg' },
          ].map((pr, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand/10 rounded-lg flex items-center justify-center text-brand">
                  <Trophy size={18} />
                </div>
                <div>
                  <h4 className="font-bold">{pr.lift}</h4>
                  <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">{pr.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="heading-display text-xl">{pr.weight}</p>
                  <p className="text-[10px] text-brand font-bold">{pr.change}</p>
                </div>
                <ArrowUpRight size={18} className="text-text-muted group-hover:text-brand transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
