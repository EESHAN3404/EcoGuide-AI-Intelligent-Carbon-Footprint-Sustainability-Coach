"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { Home, Target, MessageSquare, LogOut, Moon, Sun, BarChart2, Trophy, Settings, Beaker } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const links = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/analytics', label: 'Analytics', icon: BarChart2 },
    { href: '/simulator', label: 'Simulator', icon: Beaker },
    { href: '/goals', label: 'Goals', icon: Target },
    { href: '/challenges', label: 'Challenges', icon: Trophy },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/assistant', label: 'AI Coach', icon: MessageSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background bg-gradient-premium">
      <aside className="w-64 border-r border-white/10 glass flex flex-col z-10">
        <div className="p-6">
          <span className="text-2xl font-bold text-gradient">EcoGuide</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-2 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link key={link.href} href={link.href} className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${isActive ? 'text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}>
                {isActive && (
                  <motion.div layoutId="sidebar-active" className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-md shadow-primary/20" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
                )}
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-white/10 space-y-2">
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl hover:bg-white/5" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
            {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-500" /> : <Moon className="w-5 h-5 text-blue-500" />}
            Toggle Theme
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 rounded-xl text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={() => signOut({ callbackUrl: '/' })}>
            <LogOut className="w-5 h-5" />
            Log Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 relative">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          {children}
        </motion.div>
      </main>
    </div>
  );
}
