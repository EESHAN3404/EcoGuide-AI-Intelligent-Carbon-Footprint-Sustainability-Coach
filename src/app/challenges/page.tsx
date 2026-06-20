"use client";

import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Target, Leaf, Zap, Droplet, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const missions = [
  { id: 1, title: 'Plant-Based Weekend', description: 'Eat only plant-based meals for the entire weekend.', xp: 500, category: 'Food', icon: Leaf, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 2, title: 'Unplugged Evening', description: 'Turn off all non-essential electronics for 4 hours.', xp: 300, category: 'Energy', icon: Zap, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 3, title: 'Zero Waste Grocery', description: 'Shop for groceries using only reusable bags and no plastic.', xp: 400, category: 'Waste', icon: Target, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 4, title: 'Short Shower Challenge', description: 'Keep all showers under 5 minutes this week.', xp: 250, category: 'Water', icon: Droplet, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
];

export default function ChallengesPage() {
  const completeMission = (mission: any) => {
    toast.success(`Mission Accomplished! You earned ${mission.xp} XP!`);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
              Sustainability Challenges
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">Complete real-world missions to earn XP and level up your Eco Score.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missions.map((mission, i) => (
            <motion.div key={mission.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.02 }}>
              <Card className="glass-card border-none h-full flex flex-col relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 transition-opacity opacity-50 group-hover:opacity-100 ${mission.bg}`}></div>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-3 rounded-xl ${mission.bg}`}>
                      <mission.icon className={`w-6 h-6 ${mission.color}`} />
                    </div>
                    <Badge variant="outline" className="glass flex gap-1 items-center font-bold">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" /> {mission.xp} XP
                    </Badge>
                  </div>
                  <CardTitle className="text-xl">{mission.title}</CardTitle>
                  <CardDescription className="text-sm mt-2">{mission.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <Badge variant="secondary" className="bg-white/10">{mission.category}</Badge>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-primary/20 text-primary hover:bg-primary hover:text-white transition-colors" onClick={() => completeMission(mission)}>
                    Complete Mission
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
