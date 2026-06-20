"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Target, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function GoalsPage() {
  const { status } = useSession();
  const router = useRouter();
  const [goals, setGoals] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
    fetchGoals();
  }, [status, router]);

  async function fetchGoals() {
    try {
      const res = await fetch('/api/dashboard');
      if (res.ok) {
        const data = await res.json();
        setGoals(data.goals || []);
      }
    } catch (e) {
      console.error(e);
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData);

    try {
      const res = await fetch('/api/goals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success('Goal added successfully');
        setOpen(false);
        fetchGoals();
      } else {
        toast.error('Failed to add goal');
      }
    } catch (e) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sustainability Goals</h1>
          <p className="text-muted-foreground">Set targets and track your progress to reduce your footprint.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger>
            <Button className="gap-2"><Plus className="w-4 h-4"/> New Goal</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Goal Title</Label>
                <Input id="title" name="title" required placeholder="e.g. Reduce electricity by 10%" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" name="category" required placeholder="e.g. Energy" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="targetDate">Target Date</Label>
                <Input id="targetDate" name="targetDate" type="date" required />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Saving...' : 'Save Goal'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {goals.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent className="space-y-4">
            <Target className="w-12 h-12 mx-auto text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold">No goals yet</h3>
            <p className="text-muted-foreground">Start by creating your first sustainability goal.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <Card key={goal._id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{goal.category}</Badge>
                  <Badge className={goal.status === 'completed' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'}>
                    {goal.status}
                  </Badge>
                </div>
                <CardTitle className="text-xl mt-3">{goal.title}</CardTitle>
                <CardDescription>Target: {new Date(goal.targetDate).toLocaleDateString()}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{goal.progress}%</span>
                </div>
                <Progress value={goal.progress} className="h-2" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
