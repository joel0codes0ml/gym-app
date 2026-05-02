import { motion } from 'motion/react';
import { Search, Calendar, ChevronRight, ArrowRight, User } from 'lucide-react';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';
import { Link } from 'react-router-dom';

const POSTS = [
  {
    title: "How to Build Muscle with Progressive Overload",
    excerpt: "The most important principle in hypertrophy is doing more over time. Learn how GymCoach AI automates this for you.",
    category: "Training",
    date: "May 02, 2026",
    author: "Coach Marcus",
    image: "💪",
    slug: "progressive-overload"
  },
  {
    title: "The Best Macro Split for Fat Loss in 2026",
    excerpt: "There is no magic number, but there is a logic. Discover how to fuel your fat loss without losing hard-earned muscle.",
    category: "Nutrition",
    date: "Apr 28, 2026",
    author: "Dr. Elena",
    image: "🥗",
    slug: "macro-split"
  },
  {
    title: "Why AI Coaching Beats Generic Workout Apps",
    excerpt: "Static plans fail because life happens. Dynamic AI coaching is the first system that accounts for your real-world recovery.",
    category: "Intelligence",
    date: "Apr 22, 2026",
    author: "GymCoach AI Team",
    image: "🧠",
    slug: "ai-vs-apps"
  }
];

export default function BlogPage() {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20 px-4">
          <Badge className="mb-4">Insights</Badge>
          <h1 className="heading-display text-5xl md:text-7xl mb-6">Performance <span className="text-brand">Journal.</span></h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Deep dives into training science, bio-optimization, and nutrition engineering from the GymCoach AI lab.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20">
           <Card className="relative overflow-hidden group p-0 min-h-[400px] flex flex-col md:flex-row">
              <div className="flex-1 bg-brand/5 flex items-center justify-center text-[120px] p-12 order-2 md:order-1">
                 🚀
              </div>
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center order-1 md:order-2">
                 <div className="flex items-center gap-3 mb-6">
                    <Badge variant="brand">Featured</Badge>
                    <span className="text-xs text-text-muted font-mono uppercase">May 01, 2026</span>
                 </div>
                 <h2 className="heading-display text-4xl md:text-5xl mb-6 leading-tight">Mastering The Neural Link: How AI Reads Your Performance</h2>
                 <p className="text-text-secondary text-lg mb-8">
                    An in-depth look at our proprietary algorithm that translates bar speed into neural fatigue metrics.
                 </p>
                 <div className="flex items-center justify-between mt-auto">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-text-muted">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary">Admin</p>
                        <p className="text-[10px] text-text-muted uppercase font-bold tracking-widest">GymCoach Lab</p>
                      </div>
                   </div>
                   <Button variant="outline" className="hidden sm:inline-flex">Read Now</Button>
                 </div>
              </div>
           </Card>
        </div>

        {/* Post Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
           {POSTS.map((post, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: i * 0.1 }}
             >
               <Link to={`/blog/${post.slug}`}>
                 <Card hover className="h-full flex flex-col">
                    <div className="aspect-video bg-white/5 rounded-xl mb-6 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-500">
                       {post.image}
                    </div>
                    <div className="flex items-center justify-between mb-4">
                       <Badge variant="muted">{post.category}</Badge>
                       <span className="text-[10px] text-text-muted font-mono">{post.date}</span>
                    </div>
                    <h3 className="heading-display text-2xl mb-4 group-hover:text-brand transition-colors line-clamp-2">{post.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                       {post.excerpt}
                    </p>
                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-2 text-brand text-xs font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                       Read Article <ArrowRight size={14} />
                    </div>
                 </Card>
               </Link>
             </motion.div>
           ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-32 border-t border-white/5 pt-20">
           <div className="max-w-4xl mx-auto text-center">
              <h2 className="heading-display text-4xl mb-6">Stay Optimised.</h2>
              <p className="text-text-secondary mb-10 max-w-xl mx-auto">
                 Get our weekly synthesis of performance science and product updates. No fluff, just signal.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                 <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 bg-surface border border-border-default rounded-xl px-6 py-4 text-sm focus:outline-none focus:border-brand/40 transition-all font-medium"
                 />
                 <Button className="h-[58px] px-10">Subscribe</Button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
