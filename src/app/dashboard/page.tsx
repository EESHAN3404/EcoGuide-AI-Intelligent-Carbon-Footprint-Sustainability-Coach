"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area, XAxis, YAxis, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Leaf, Zap, Car, Trash2, TrendingDown, Award, Flame, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const COLORS = ['#0ea5e9', '#f59e0b', '#10b981', '#ef4444'];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    if (session && !(session as any).isOnboarded) router.push('/onboarding');
    
    if ((session as any)?.isOnboarded) {
      fetch('/api/dashboard').then(res => res.json()).then(setData);
    }
  }, [session, status, router]);

  if (!data) return <DashboardLayout><div className="flex justify-center mt-20 animate-pulse">Loading amazing things...</div></DashboardLayout>;

  const { user, latestEmissions, recommendations, records } = data;

  const pieData = latestEmissions ? [
    { name: 'Transport', value: latestEmissions.transportation },
    { name: 'Energy', value: latestEmissions.energy },
    { name: 'Food', value: latestEmissions.food },
    { name: 'Waste', value: latestEmissions.waste },
  ] : [];

  const radarData = latestEmissions ? [
    { subject: 'Transport', A: latestEmissions.transportation, fullMark: 300 },
    { subject: 'Energy', A: latestEmissions.energy, fullMark: 300 },
    { subject: 'Food', A: latestEmissions.food, fullMark: 300 },
    { subject: 'Waste', A: latestEmissions.waste, fullMark: 300 },
  ] : [];

  const trendData = records?.slice(-6).map((r: any) => ({
    name: new Date(r.date).toLocaleString('default', { month: 'short' }),
    total: r.total
  })) || [];

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
              Welcome back, {user.name}
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Here is your advanced sustainability overview.</p>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right glass px-6 py-3 rounded-2xl flex gap-6 items-center">
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-1"><Flame className="w-4 h-4 text-orange-500"/> Streak</div>
                <div className="text-xl font-bold">{user.streak || 0} Days</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div>
                <div className="text-sm text-muted-foreground flex items-center gap-1"><Award className="w-4 h-4 text-yellow-500"/> XP</div>
                <div className="text-xl font-bold">{user.xp || 0}</div>
              </div>
              <div className="w-px h-8 bg-border"></div>
              <div>
                <div className="text-sm text-muted-foreground">Eco Score</div>
                <div className="text-3xl font-black text-emerald-500">{user.ecoScore}/100</div>
              </div>
            </div>
            <Button variant="outline" className="glass h-14 px-6 rounded-2xl gap-2">
              <Download className="w-4 h-4" /> Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'Total Emissions', icon: Leaf, value: latestEmissions?.total, unit: 'kg CO₂', color: 'text-emerald-500' },
            { title: 'Transport', icon: Car, value: latestEmissions?.transportation, unit: 'kg CO₂', color: 'text-blue-500' },
            { title: 'Energy', icon: Zap, value: latestEmissions?.energy, unit: 'kg CO₂', color: 'text-orange-500' },
            { title: 'Waste', icon: Trash2, value: latestEmissions?.waste, unit: 'kg CO₂', color: 'text-red-500' }
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-none bg-card/40 hover:bg-card/60 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value?.toFixed(1)}</div>
                  <p className="text-xs text-muted-foreground mt-1">{stat.unit} per month</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-none md:col-span-2">
            <CardHeader>
              <CardTitle>Emission Trends</CardTitle>
              <CardDescription>Your carbon footprint over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--card)' }} />
                  <Area type="monotone" dataKey="total" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle>Category Analysis</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid stroke="#333" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 'dataMax + 50']} tick={false} axisLine={false} />
                  <Radar name="Emissions" dataKey="A" stroke="#0ea5e9" strokeWidth={2} fill="#0ea5e9" fillOpacity={0.4} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="glass-card border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-5 h-5 text-emerald-500" />
                AI Smart Recommendations
              </CardTitle>
              <CardDescription>Generated specifically for your lifestyle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative z-10">
              {recommendations.length > 0 ? recommendations.map((rec: any, i: number) => (
                <motion.div key={i} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 + (i * 0.1) }} className="flex gap-4 p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-white/5 backdrop-blur-sm">
                  <div className={`mt-1 flex-shrink-0 w-3 h-3 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)] ${rec.impact === 'High' ? 'bg-red-500 shadow-red-500/50' : 'bg-orange-500 shadow-orange-500/50'}`} />
                  <div>
                    <h4 className="font-semibold text-foreground">{rec.title}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                  </div>
                </motion.div>
              )) : (
                <p className="text-muted-foreground">You're doing great! No urgent recommendations right now.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
