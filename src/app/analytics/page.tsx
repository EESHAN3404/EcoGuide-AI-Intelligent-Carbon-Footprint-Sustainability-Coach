"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, ComposedChart, Line } from 'recharts';
import { Download, FileText, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const data = [
  { month: 'Jan', Transport: 140, Energy: 200, Food: 150, Waste: 40, Score: 60 },
  { month: 'Feb', Transport: 130, Energy: 180, Food: 150, Waste: 35, Score: 65 },
  { month: 'Mar', Transport: 110, Energy: 150, Food: 140, Waste: 30, Score: 72 },
  { month: 'Apr', Transport: 90, Energy: 120, Food: 120, Waste: 25, Score: 80 },
  { month: 'May', Transport: 80, Energy: 110, Food: 100, Waste: 20, Score: 85 },
  { month: 'Jun', Transport: 60, Energy: 90, Food: 90, Waste: 15, Score: 92 }, // Current
];

export default function AnalyticsPage() {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    toast.info("Generating AI Sustainability Report PDF...");
    setTimeout(() => {
      setDownloading(false);
      toast.success("Report downloaded successfully!");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center gap-4">
              <Activity className="w-10 h-10 text-emerald-500" />
              Advanced Analytics
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Deep dive into your carbon trends and AI-driven forecasting.</p>
          </div>
          <Button onClick={handleDownload} disabled={downloading} className="glass h-12 px-6 rounded-xl gap-2 bg-primary text-white hover:bg-primary/90">
            {downloading ? <span className="animate-spin text-xl">⟳</span> : <Download className="w-4 h-4" />}
            Download Full Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="glass-card border-none">
              <CardHeader>
                <CardTitle>Emission Breakdown by Category</CardTitle>
                <CardDescription>Stacked view of your monthly footprint</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--card)' }} />
                    <Legend iconType="circle" />
                    <Bar dataKey="Transport" stackId="a" fill="#0ea5e9" radius={[0, 0, 4, 4]} />
                    <Bar dataKey="Energy" stackId="a" fill="#f59e0b" />
                    <Bar dataKey="Food" stackId="a" fill="#10b981" />
                    <Bar dataKey="Waste" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="glass-card border-none">
              <CardHeader>
                <CardTitle>Eco Score Progression & Forecast</CardTitle>
                <CardDescription>Historical score vs predictive AI trajectory</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="month" stroke="#888" tickLine={false} axisLine={false} />
                    <YAxis stroke="#888" tickLine={false} axisLine={false} domain={[0, 100]} />
                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', background: 'var(--card)' }} />
                    <Area type="monotone" dataKey="Score" stroke="none" fill="url(#colorScore)" />
                    <Line type="monotone" dataKey="Score" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} activeDot={{ r: 8 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="glass-card border-none bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
          <CardContent className="p-8 flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="p-4 bg-emerald-500/20 rounded-2xl text-emerald-500">
                <FileText className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Weekly AI Report Available</h3>
                <p className="text-muted-foreground mt-1">Our AI has analyzed your data and prepared a personalized roadmap.</p>
              </div>
            </div>
            <Button size="lg" className="rounded-xl font-semibold shadow-lg shadow-emerald-500/20" onClick={handleDownload}>
              View Insights
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
