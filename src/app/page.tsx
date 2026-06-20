import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Leaf, Activity, Award, BarChart3 } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-6 py-4 flex justify-between items-center border-b">
        <div className="flex items-center gap-2 text-green-600">
          <Leaf className="w-6 h-6" />
          <span className="text-xl font-bold">EcoGuide AI</span>
        </div>
        <div className="space-x-4">
          <Link href="/login">
            <Button variant="outline">Log in</Button>
          </Link>
          <Link href="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-24 px-6 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-transparent">
            Your Personal Carbon Footprint & Sustainability Coach
          </h1>
          <p className="text-xl text-muted-foreground mb-10">
            Track your emissions, get AI-powered personalized insights, and start reducing your impact on the environment today.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/register">
              <Button size="lg" className="h-12 px-8 text-lg">Get Started</Button>
            </Link>
          </div>
        </section>

        <section className="bg-muted py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-card p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Smart Tracking</h3>
              <p className="text-muted-foreground">Log your daily activities and let our engine accurately calculate your carbon footprint across all categories.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mb-6">
                <Activity className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI Recommendations</h3>
              <p className="text-muted-foreground">Receive dynamic, context-aware suggestions tailored to your lifestyle to help you easily reduce emissions.</p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-full flex items-center justify-center mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Goals & Achievements</h3>
              <p className="text-muted-foreground">Set sustainability goals, track your progress, earn badges, and improve your Eco Score over time.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EcoGuide AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
