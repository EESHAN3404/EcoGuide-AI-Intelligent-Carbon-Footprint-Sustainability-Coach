"use client";

import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Star, Flame } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Leaderboard Data
const leaderboard = [
  { rank: 1, name: "Alex Johnson", score: 98, streak: 45, xp: 12500 },
  { rank: 2, name: "Maria Garcia", score: 95, streak: 32, xp: 11200 },
  { rank: 3, name: "Sam Lee", score: 92, streak: 28, xp: 9800 },
  { rank: 4, name: "You", score: 85, streak: 12, xp: 4500, isCurrentUser: true },
  { rank: 5, name: "Chris Smith", score: 82, streak: 10, xp: 4100 },
  { rank: 6, name: "Taylor Swift", score: 78, streak: 5, xp: 3200 },
  { rank: 7, name: "Jordan Peele", score: 75, streak: 3, xp: 2800 },
];

export default function LeaderboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500 flex items-center gap-4">
              <Trophy className="w-10 h-10 text-yellow-500" />
              Global Leaderboard
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">See how you rank against other eco-warriors around the globe.</p>
          </div>
        </div>

        <Card className="glass-card border-none overflow-hidden">
          <CardHeader className="bg-black/20 dark:bg-white/5 border-b border-white/5">
            <CardTitle className="text-xl">Top Sustainability Champions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-white/5">
              {leaderboard.map((user, i) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: i * 0.1 }}
                  key={user.rank} 
                  className={`flex items-center justify-between p-6 transition-colors ${user.isCurrentUser ? 'bg-emerald-500/10' : 'hover:bg-white/5'}`}
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 text-center font-black text-2xl text-muted-foreground">
                      {user.rank === 1 ? <Medal className="w-8 h-8 text-yellow-400 mx-auto" /> : 
                       user.rank === 2 ? <Medal className="w-8 h-8 text-gray-300 mx-auto" /> : 
                       user.rank === 3 ? <Medal className="w-8 h-8 text-amber-600 mx-auto" /> : 
                       `#${user.rank}`}
                    </div>
                    <div>
                      <h4 className={`text-lg font-bold ${user.isCurrentUser ? 'text-emerald-500' : ''}`}>
                        {user.name} {user.isCurrentUser && "(You)"}
                      </h4>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Flame className="w-4 h-4 text-orange-500"/> {user.streak} day streak</span>
                        <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500"/> {user.xp.toLocaleString()} XP</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">Eco Score</div>
                    <div className={`text-3xl font-black ${user.score >= 90 ? 'text-emerald-500' : 'text-blue-500'}`}>
                      {user.score}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
