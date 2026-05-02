import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Card, Badge, Button } from '@/src/components/ui/LayoutComponents';

export default function BlogDetailPage() {
  const { slug } = useParams();

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <Link to="/blog" className="inline-flex items-center gap-2 text-text-secondary hover:text-brand mb-12 transition-colors group">
         <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Articles
      </Link>

      <div className="space-y-6 mb-12">
        <Badge variant="brand">Training Science</Badge>
        <h1 className="heading-display text-5xl md:text-7xl leading-tight">
          {slug?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
        </h1>
        <div className="flex flex-wrap items-center gap-6 text-sm text-text-muted">
           <div className="flex items-center gap-2"><Calendar size={16} /> May 02, 2026</div>
           <div className="flex items-center gap-2"><User size={16} /> Coach Marcus</div>
           <div className="flex items-center gap-2"><Clock size={16} /> 8 min read</div>
        </div>
      </div>

      {/* Featured Image Placeholder */}
      <div className="aspect-video bg-white/5 rounded-[48px] mb-16 flex items-center justify-center text-8xl">
         ⚡
      </div>

      <div className="grid md:grid-cols-4 gap-12">
        {/* Social Share Sidebar */}
        <div className="md:col-span-1 hidden md:block space-y-6 sticky top-24 h-fit">
           <p className="text-[10px] uppercase font-bold tracking-widest text-text-muted mb-4">Share Article</p>
           <div className="flex md:flex-col gap-4">
              {[Facebook, Twitter, Linkedin, Share2].map((Icon, i) => (
                <button key={i} className="w-12 h-12 bg-surface border border-border-default rounded-xl flex items-center justify-center text-text-secondary hover:text-brand hover:border-brand/40 transition-all">
                   <Icon size={20} />
                </button>
              ))}
           </div>
        </div>

        {/* Content */}
        <div className="md:col-span-3 prose prose-invert max-w-none prose-p:text-text-secondary prose-headings:heading-display prose-headings:font-normal prose-h2:text-4xl prose-h3:text-2xl prose-strong:text-brand prose-a:text-brand">
           <p className="text-xl text-text-primary leading-relaxed font-medium mb-12">
             In the world of performance engineering, the most common failure isn't lack of effort—it's poor biological management. Discover how the next generation of AI systems are closing the loop between training stimulus and physiological adaptation.
           </p>
           
           <p>
             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
           </p>

           <h2>The Principle of Specicity</h2>
           <p>
             Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
           </p>

           <Card className="bg-brand text-black my-12 p-8">
              <h4 className="heading-display text-2xl mb-2">Coach's Summary</h4>
              <p className="font-medium italic">"Data without action is noise. The key is using these insights to drive small, incremental changes in every single session."</p>
           </Card>

           <p>
             At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
           </p>

           <h3>The Future of Training</h3>
           <p>
             Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
           </p>
        </div>
      </div>

      {/* More Articles */}
      <div className="mt-40 pt-20 border-t border-white/10">
         <h2 className="heading-display text-4xl mb-12">Related Articles</h2>
         <div className="grid md:grid-cols-2 gap-8">
            {[
              { title: "The Best Macro Split for Fat Loss", icon: "🥗" },
              { title: "Why AI Coaching Beats Generic Apps", icon: "🧠" }
            ].map((post, i) => (
              <Card key={i} hover className="flex items-center gap-6">
                 <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-4xl shrink-0">
                    {post.icon}
                 </div>
                 <div>
                    <h4 className="heading-display text-xl mb-1">{post.title}</h4>
                    <span className="text-brand text-[10px] uppercase font-bold tracking-widest flex items-center gap-2">
                       Read More <ArrowRight size={12} />
                    </span>
                 </div>
              </Card>
            ))}
         </div>
      </div>
    </div>
  );
}
