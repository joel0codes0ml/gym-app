import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dumbbell, Menu, X, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { cn } from '@/src/lib/utils';
import { useFirebase } from '@/src/components/auth/FirebaseContext';

export function MarketingNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signInWithGoogle } = useFirebase();

  const navLinks = [
    { name: 'Features', href: '/features' },
    { name: 'How it Works', href: '/how-it-works' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Blog', href: '/blog' },
    { name: 'FAQ', href: '/faq' },
  ];

  const handleAuthAction = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      signInWithGoogle();
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border-default">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand p-1.5 rounded-lg group-hover:bg-brand-hover transition-colors">
              <Dumbbell size={20} className="text-black" />
            </div>
            <span className="heading-display text-xl text-text-primary">GymCoach AI</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-brand",
                  location.pathname === link.href ? "text-brand" : "text-text-secondary"
                )}
              >
                {link.name}
              </Link>
            ))}
            {!user ? (
              <button
                onClick={() => signInWithGoogle()}
                className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-brand transition-colors"
              >
                <LogIn size={18} />
                Login
              </button>
            ) : null}
            <Link
              to="/app/dashboard"
              onClick={handleAuthAction}
              className="bg-brand text-black px-5 py-2 rounded-full font-medium text-sm hover:bg-brand-hover transition-all transform hover:scale-105"
            >
              {user ? 'Dashboard' : 'Get Started'}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-text-primary" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-border-default overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-3 text-base font-medium text-text-secondary hover:text-brand"
                >
                  {link.name}
                </Link>
              ))}
              {!user && (
                <button
                  onClick={() => {
                    signInWithGoogle();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-3 text-base font-medium text-text-secondary hover:text-brand flex items-center gap-2"
                >
                  <LogIn size={20} />
                  Login
                </button>
              )}
              <Link
                to="/app/dashboard"
                onClick={(e) => {
                  setIsOpen(false);
                  handleAuthAction(e);
                }}
                className="block w-full text-center bg-brand text-black px-4 py-3 rounded-xl font-medium mt-4"
              >
                {user ? 'Dashboard' : 'Get Started'}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export function MarketingFooter() {
  return (
    <footer className="bg-surface border-t border-border-default py-12 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Dumbbell size={24} className="text-brand" />
              <span className="heading-display text-2xl">GymCoach AI</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-xs">
              Your AI Personal Trainer. Always On. Real-time coaching, personalized plans, and data-driven results.
            </p>
          </div>
          <div>
            <h4 className="heading-display mb-6 text-text-primary">Product</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link to="/features" className="hover:text-brand transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="hover:text-brand transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="hover:text-brand transition-colors">How it Works</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="heading-display mb-6 text-text-primary">Company</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link to="/blog" className="hover:text-brand transition-colors">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-brand transition-colors">FAQ</Link></li>
              <li><Link to="#" className="hover:text-brand transition-colors">About Us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="heading-display mb-6 text-text-primary">Legal</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><Link to="#" className="hover:text-brand transition-colors">Privacy Policy</Link></li>
              <li><Link to="#" className="hover:text-brand transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-border-default flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} GymCoach AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-text-muted">
            {/* Social Icons Placeholder */}
          </div>
        </div>
      </div>
    </footer>
  );
}
