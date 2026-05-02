import { useState } from 'react';
import { 
  Utensils, 
  Droplets, 
  Plus, 
  Search, 
  Camera, 
  Zap, 
  ChevronRight,
  TrendingUp,
  Target
} from 'lucide-react';
import { motion } from 'motion/react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { cn } from '@/src/lib/utils';

const MACRO_DATA = [
  { name: 'Protein', value: 145, target: 180, color: '#00D98A' },
  { name: 'Carbs', value: 210, target: 300, color: '#378ADD' },
  { name: 'Fats', value: 65, target: 80, color: '#EF9F27' },
];

const MEAL_DATA = [
  { name: 'Breakfast', calories: 620, time: '08:15 AM', logged: true, items: 'Oatmeal, Protein Shake, Banana' },
  { name: 'Lunch', calories: 850, time: '12:30 PM', logged: true, items: 'Chicken Breast, Rice, Avocado' },
  { name: 'Snack', calories: 340, time: '04:00 PM', logged: true, items: 'Almonds, Apple' },
  { name: 'Dinner', calories: 0, time: '07:30 PM', logged: false, items: 'Pending...' },
];

export default function NutritionPage() {
  const [waterCount, setWaterCount] = useState(6);
  const totalCalories = 2450;
  const targetCalories = 3200;
  const progress = (totalCalories / targetCalories) * 100;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-5xl">Nutrition Lab</h1>
          <p className="text-text-secondary mt-1">Bio-engineered fuel tracking for maximum performance.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 px-4">
            <Camera size={18} /> Vision Log
          </Button>
          <Button className="h-10 px-4 bg-brand text-black">
             <Plus size={18} /> Quick Log
          </Button>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Calorie Ring Card */}
            <Card className="flex flex-col items-center justify-center p-8 relative overflow-hidden">
               <div className="absolute inset-0 bg-brand/5 pointer-events-none" />
               <div className="relative w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[{ value: totalCalories }, { value: targetCalories - totalCalories }]}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      startAngle={180}
                      endAngle={-180}
                    >
                      <Cell fill="#00D98A" />
                      <Cell fill="#ffffff05" stroke="none" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-text-muted text-xs font-mono uppercase tracking-[0.2em] mb-1">Calories</span>
                  <span className="heading-display text-5xl tracking-widest">{totalCalories}</span>
                  <div className="h-px w-12 bg-white/10 my-2" />
                  <span className="text-text-muted text-xs font-mono uppercase">Target: {targetCalories}</span>
                </div>
               </div>
               <div className="mt-6 flex flex-col items-center">
                  <Badge variant="brand" className="mb-2">Optimal Balance</Badge>
                  <p className="text-text-secondary text-sm">750 kcal remaining for the day</p>
               </div>
            </Card>

            {/* Macro Breakdown Card */}
            <Card className="flex flex-col justify-center space-y-8">
              <h3 className="heading-display text-xl mb-2 flex items-center gap-2">
                <TrendingUp size={20} className="text-brand" /> Macro Targets
              </h3>
              {MACRO_DATA.map((macro, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between items-baseline">
                      <span className="font-bold">{macro.name}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="heading-display text-lg" style={{ color: macro.color }}>{macro.value}g</span>
                        <span className="text-text-muted text-[10px] font-mono">/ {macro.target}g</span>
                      </div>
                   </div>
                   <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(macro.value / macro.target) * 100}%` }}
                        transition={{ duration: 1, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: macro.color }}
                      />
                   </div>
                </div>
              ))}
            </Card>
          </div>

          {/* Meal Log Area */}
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="heading-display text-2xl">Daily Meal Log</h2>
              <button className="text-brand text-xs font-bold uppercase tracking-wider hover:underline">View Historical</button>
            </div>
            
            <div className="space-y-3">
              {MEAL_DATA.map((meal, i) => (
                <Card key={i} className={cn(
                  "flex items-center justify-between group px-6 transition-all",
                  !meal.logged && "border-dashed border-border-default opacity-50"
                )}>
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      meal.logged ? "bg-brand/10 text-brand" : "bg-white/5 text-text-muted"
                    )}>
                      <Utensils size={20} />
                    </div>
                    <div>
                      <h4 className={cn("font-bold text-lg", !meal.logged && "text-text-muted")}>{meal.name}</h4>
                      <p className="text-xs text-text-secondary font-medium">{meal.items}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <div className="text-right hidden sm:block">
                      <p className="font-mono text-sm">{meal.calories} kcal</p>
                      <p className="text-[10px] text-text-muted font-mono">{meal.time}</p>
                    </div>
                    <button className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center transition-all",
                      meal.logged ? "bg-white/5 text-text-muted hover:text-brand" : "bg-brand text-black hover:scale-105"
                    )}>
                      {meal.logged ? <ChevronRight size={18} /> : <Plus size={18} />}
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="space-y-8">
          {/* AI Generator Card */}
          <Card className="bg-brand text-black">
             <div className="flex items-center gap-2 mb-4">
                <Zap size={20} className="fill-current" />
                <span className="heading-display text-sm">Meal Plan Generator</span>
             </div>
             <p className="text-lg font-medium leading-snug mb-6 italic">
                "Short on time? I can generate a high-protein, calorie-matched dinner menu based on your fridge contents."
             </p>
             <Button variant="outline" className="bg-black/10 border-black/20 text-black hover:bg-black/20 w-full mb-3">
                Generate Dinner Plan
             </Button>
          </Card>

          {/* Water Tracker Card */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-display text-xl">Hydration</h3>
              <Droplets size={20} className="text-info" />
            </div>
            <div className="grid grid-cols-4 gap-3 mb-8">
               {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                 <button 
                  key={i}
                  onClick={() => setWaterCount(i)}
                  className={cn(
                    "aspect-square rounded-xl flex items-center justify-center transition-all border",
                    i <= waterCount 
                      ? "bg-info/20 border-info/40 text-info" 
                      : "bg-white/5 border-border-default text-text-muted hover:border-info/30"
                  )}
                 >
                   <Droplets size={20} className={cn(i <= waterCount && "fill-current")} />
                 </button>
               ))}
            </div>
            <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest px-2">
              <span className="text-text-muted">Consumed</span>
              <span className="text-info font-bold">{waterCount * 250} ml</span>
            </div>
          </Card>

          {/* AI Advice Card */}
          <Card className="border-info/20">
            <div className="flex items-center gap-2 mb-4 text-info">
              <Target size={18} />
              <span className="heading-display text-sm">Optimization Tips</span>
            </div>
            <ul className="space-y-4 text-sm text-text-secondary">
              <li className="flex gap-2">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-info mt-1.5" />
                <span>Add 20g of fiber to breakfast to stabilize insulin response.</span>
              </li>
              <li className="flex gap-2">
                <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-info mt-1.5" />
                <span>Magnesium glycinate (400mg) at dinner for CNS recovery.</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}
