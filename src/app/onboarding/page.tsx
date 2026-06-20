"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    age: '', country: '', city: '', familySize: '', occupation: '',
    vehicleType: '', dailyTravelDistance: '', flightFrequency: '',
    monthlyElectricityConsumption: '', acUsageHours: '',
    dietPreference: '', recyclingHabits: '', plasticUsage: '', waterConsumption: ''
  });

  if (!session) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  async function onSubmit() {
    setLoading(true);
    const payload = {
      ...formData,
      age: Number(formData.age),
      familySize: Number(formData.familySize),
      dailyTravelDistance: Number(formData.dailyTravelDistance),
      flightFrequency: Number(formData.flightFrequency),
      monthlyElectricityConsumption: Number(formData.monthlyElectricityConsumption),
      acUsageHours: Number(formData.acUsageHours),
      waterConsumption: Number(formData.waterConsumption),
    };

    const res = await fetch('/api/onboarding', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await update({ isOnboarded: true });
      toast.success('Assessment complete!');
      router.push('/dashboard');
      router.refresh();
    } else {
      toast.error('Something went wrong');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 p-4">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Eco Assessment</CardTitle>
          <CardDescription>Step {step} of 3</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Personal Info</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Age</Label>
                  <Input name="age" type="number" value={formData.age} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Family Size</Label>
                  <Input name="familySize" type="number" value={formData.familySize} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input name="country" value={formData.country} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input name="city" value={formData.city} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Travel & Energy</h3>
              <div className="space-y-2">
                <Label>Primary Vehicle Type</Label>
                <Select onValueChange={(v) => handleSelect('vehicleType', v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select vehicle" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Car">Car</SelectItem>
                    <SelectItem value="Motorcycle">Motorcycle</SelectItem>
                    <SelectItem value="Public Transport">Public Transport</SelectItem>
                    <SelectItem value="Bicycle">Bicycle</SelectItem>
                    <SelectItem value="Walking">Walking</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Daily Travel (km)</Label>
                  <Input name="dailyTravelDistance" type="number" value={formData.dailyTravelDistance} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Flights / Year</Label>
                  <Input name="flightFrequency" type="number" value={formData.flightFrequency} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Monthly Electricity (kWh)</Label>
                  <Input name="monthlyElectricityConsumption" type="number" value={formData.monthlyElectricityConsumption} onChange={handleChange} />
                </div>
                <div className="space-y-2">
                  <Label>Daily AC Usage (Hours)</Label>
                  <Input name="acUsageHours" type="number" value={formData.acUsageHours} onChange={handleChange} />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Diet & Waste</h3>
              <div className="space-y-2">
                <Label>Diet Preference</Label>
                <Select onValueChange={(v) => handleSelect('dietPreference', v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select diet" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vegan">Vegan</SelectItem>
                    <SelectItem value="Vegetarian">Vegetarian</SelectItem>
                    <SelectItem value="Mixed">Mixed (Some Meat)</SelectItem>
                    <SelectItem value="High Meat">High Meat Consumption</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Recycling Habits</Label>
                <Select onValueChange={(v) => handleSelect('recyclingHabits', v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select habit" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Poor">Poor (Rarely recycle)</SelectItem>
                    <SelectItem value="Average">Average (Sometimes)</SelectItem>
                    <SelectItem value="Good">Good (Mostly recycle)</SelectItem>
                    <SelectItem value="Excellent">Excellent (Always)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Plastic Usage</Label>
                <Select onValueChange={(v) => handleSelect('plasticUsage', v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select usage" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low (Use reusables)</SelectItem>
                    <SelectItem value="Medium">Medium (Sometimes use single-use)</SelectItem>
                    <SelectItem value="High">High (Often use single-use)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Daily Water Consumption (Liters)</Label>
                <Input name="waterConsumption" type="number" value={formData.waterConsumption} onChange={handleChange} />
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={step === 1}>Back</Button>
          {step < 3 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : (
            <Button onClick={onSubmit} disabled={loading}>{loading ? 'Saving...' : 'Finish'}</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
