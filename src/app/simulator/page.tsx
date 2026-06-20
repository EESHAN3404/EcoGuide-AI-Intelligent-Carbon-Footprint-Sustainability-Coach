"use client";

import { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Zap, Car, Leaf, TrendingDown } from 'lucide-react';

export default function SimulatorPage() {
  const [acReduction, setAcReduction] = useState([0]);
  const [carReduction, setCarReduction] = useState([0]);
  const [meatReduction, setMeatReduction] = useState([0]);

  // Rough calculation constants (kg CO2 per unit per month)
  const CO2_PER_AC_HOUR = 1.5 * 0.85 * 30; // ~38 kg/month per hour daily
  const CO2_PER_CAR_DAY = 15 * 0.192 * 4; // ~11 kg/month per weekly day not driven
  const CO2_PER_MEAT_DAY = 10; // ~10 kg/month per weekly meat-free day

  const totalSaved = (acReduction[0] * CO2_PER_AC_HOUR) + 
                     (carReduction[0] * CO2_PER_CAR_DAY) + 
                     (meatReduction[0] * CO2_PER_MEAT_DAY);

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-10 max-w-5xl mx-auto">
        <div className="flex justify-between items-end">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-cyan-500">
              Carbon Savings Simulator
            </h1>
            <p className="text-muted-foreground mt-2 text-lg">See the real-world impact of your lifestyle changes.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="glass-card border-none md:col-span-2">
            <CardHeader>
              <CardTitle>Adjust Your Habits</CardTitle>
              <CardDescription>Drag the sliders to see how small changes compound into massive savings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2"><Zap className="w-5 h-5 text-orange-500"/> Reduce AC Usage</div>
                  <Badge variant="secondary">{acReduction[0]} hours/day</Badge>
                </div>
                <Slider max={10} step={1} value={acReduction} onValueChange={(val) => setAcReduction(val as number[])} className="w-full" />
                <p className="text-sm text-muted-foreground text-right">-{(acReduction[0] * CO2_PER_AC_HOUR).toFixed(1)} kg CO₂/mo</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2"><Car className="w-5 h-5 text-blue-500"/> Car-Free Days</div>
                  <Badge variant="secondary">{carReduction[0]} days/week</Badge>
                </div>
                <Slider max={7} step={1} value={carReduction} onValueChange={(val) => setCarReduction(val as number[])} className="w-full" />
                <p className="text-sm text-muted-foreground text-right">-{(carReduction[0] * CO2_PER_CAR_DAY).toFixed(1)} kg CO₂/mo</p>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2"><Leaf className="w-5 h-5 text-emerald-500"/> Meat-Free Days</div>
                  <Badge variant="secondary">{meatReduction[0]} days/week</Badge>
                </div>
                <Slider max={7} step={1} value={meatReduction} onValueChange={(val) => setMeatReduction(val as number[])} className="w-full" />
                <p className="text-sm text-muted-foreground text-right">-{(meatReduction[0] * CO2_PER_MEAT_DAY).toFixed(1)} kg CO₂/mo</p>
              </div>

            </CardContent>
          </Card>

          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full">
            <Card className="glass-card border-none h-full bg-gradient-to-b from-emerald-500/20 to-cyan-500/5 relative overflow-hidden flex flex-col justify-center items-center text-center p-8">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
              <TrendingDown className="w-16 h-16 text-emerald-500 mb-6" />
              <h3 className="text-xl font-medium text-muted-foreground">Projected Monthly Savings</h3>
              <div className="text-6xl font-black text-emerald-400 mt-4 mb-2">
                {totalSaved.toFixed(0)} <span className="text-2xl text-muted-foreground">kg</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                That's equivalent to planting <span className="font-bold text-emerald-500">{Math.floor(totalSaved / 20)}</span> trees every month!
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
}
