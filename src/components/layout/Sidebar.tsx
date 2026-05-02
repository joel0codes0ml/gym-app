import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Dumbbell, 
  Utensils, 
  LineChart, 
  MessageSquare, 
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { useFirebase } from '@/src/components/auth/FirebaseContext';

interface SidebarItemProps {
  icon: any;
  label: string;
  href: string;
  collapsed: boolean;
  active: boolean;
  key?: string | number;
}

function SidebarItem({ icon: Icon, label, href, collapsed, active }: SidebarItemProps) {
  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all group",
        active 
          ? "bg-brand/10 text-brand border border-brand/20" 
          : "text-text-secondary hover:bg-white/5 hover:text-text-primary"
      )}
    >
      <Icon size={20} className={cn("shrink-0", active && "text-brand")} />
      {!collapsed && (
        <span className="text-sm font-medium overflow-hidden whitespace-nowrap">
          {label}
        </span>
      )}
      {active && !collapsed && (
        <motion.div 
          layoutId="sidebar-active"
          className="ml-auto w-1.5 h-1.5 rounded-full bg-brand" 
        />
      )}
    </Link>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const { user, profile, logout } = useFirebase();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/app/dashboard' },
    { icon: Dumbbell, label: 'Workouts', href: '/app/workout' },
    { icon: Utensils, label: 'Nutrition', href: '/app/nutrition' },
    { icon: LineChart, label: 'Progress', href: '/app/progress' },
    { icon: MessageSquare, label: 'AI Coach', href: '/app/coach' },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 bottom-0 z-40 bg-surface border-r border-border-default transition-all duration-300 flex flex-col",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-20 flex items-center px-6 mb-4">
        <Link to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="bg-brand p-1.5 rounded-lg shrink-0">
            <Dumbbell size={20} className="text-black" />
          </div>
          {!collapsed && (
            <span className="heading-display text-xl text-text-primary">GymCoach AI</span>
          )}
        </Link>
      </div>

      {/* User Info (Mini) */}
      {!collapsed && user && (
        <div className="px-6 mb-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-brand/10 border border-brand/20 flex items-center justify-center text-brand font-bold overflow-hidden">
            {profile?.avatarUrl || user.photoURL ? (
              <img src={profile?.avatarUrl || user.photoURL || ''} alt={profile?.fullName || user.displayName || ''} className="w-full h-full object-cover" />
            ) : (
              (profile?.fullName || user.displayName || 'U').charAt(0)
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold truncate leading-tight">{profile?.fullName || user.displayName || 'User'}</span>
            <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest leading-tight">
              {profile?.subscriptionTier === 'elite' ? 'Elite Member' : profile?.subscriptionTier === 'pro' ? 'Pro Member' : 'Free Member'}
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <SidebarItem 
            key={item.href}
            icon={item.icon}
            label={item.label}
            href={item.href}
            collapsed={collapsed}
            active={location.pathname === item.href}
          />
        ))}
      </nav>

      {/* User Stats Card (Mini) */}
      {!collapsed && (
        <div className="px-3 mb-6">
          <div className="bg-background rounded-2xl p-4 border border-border-default">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Flame size={16} className="text-brand" />
                <span className="text-xs font-bold uppercase tracking-wider text-text-secondary">Streak</span>
              </div>
              <span className="text-sm font-mono text-brand">{profile?.streakDays || 0} Days</span>
            </div>
            <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <div className="bg-brand h-full transition-all duration-1000" style={{ width: `${Math.min(100, ((profile?.streakDays || 0) / 30) * 100)}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Bottom Actions */}
      <div className="px-3 pb-6 mt-auto space-y-1">
        <SidebarItem 
          icon={Settings} 
          label="Settings" 
          href="/app/profile" 
          collapsed={collapsed}
          active={location.pathname === '/app/profile'}
        />
        <button 
          onClick={logout}
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-xl transition-all w-full text-text-secondary hover:bg-danger/10 hover:text-danger group",
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Log Out</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-24 bg-surface border border-border-default rounded-full p-1 text-text-secondary hover:text-brand hover:border-brand/50 transition-all"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>
    </aside>
  );
}
