import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

export function Button({ 
  children, 
  variant = 'primary', 
  className, 
  ...props 
}: { 
  children: ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  className?: string;
  [key: string]: any;
}) {
  const variants = {
    primary: 'bg-brand text-black hover:bg-brand-hover',
    secondary: 'bg-surface border border-brand/20 text-brand hover:bg-brand/10',
    outline: 'bg-transparent border border-border-default text-text-primary hover:border-border-hover hover:bg-white/5',
    ghost: 'bg-transparent text-text-secondary hover:text-text-primary hover:bg-white/5',
    danger: 'bg-danger/10 text-danger border border-danger/20 hover:bg-danger/20',
  };

  return (
    <button
      className={cn(
        'px-6 py-2.5 rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm inline-flex items-center justify-center gap-2',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Card({ 
  children, 
  className, 
  hover = false,
  ...props
}: { 
  children: ReactNode; 
  className?: string;
  hover?: boolean;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        'bg-surface border border-border-default rounded-2xl p-6 transition-all',
        hover && 'hover:border-border-hover hover:translate-y-[-2px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function Badge({ 
  children, 
  variant = 'brand',
  className 
}: { 
  children: ReactNode; 
  variant?: 'brand' | 'info' | 'amber' | 'danger' | 'muted';
  className?: string;
}) {
  const variants = {
    brand: 'bg-brand/10 text-brand border-brand/20',
    info: 'bg-info/10 text-info border-info/20',
    amber: 'bg-amber/10 text-amber border-amber/20',
    danger: 'bg-danger/10 text-danger border-danger/20',
    muted: 'bg-white/5 text-text-muted border-border-default',
  };

  return (
    <span className={cn(
      'px-2.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  );
}
