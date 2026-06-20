export interface UserData {
  vehicleType: string;
  dailyTravelDistance: number;
  flightFrequency: number;
  monthlyElectricityConsumption: number;
  acUsageHours: number;
  dietPreference: string;
  recyclingHabits: string;
  plasticUsage: string;
  waterConsumption: number;
}

export function calculateCarbonFootprint(data: UserData) {
  let transportEmissions = 0;
  let energyEmissions = 0;
  let foodEmissions = 0;
  let wasteEmissions = 0;

  // 1. Transport Emissions (kg CO2 per month)
  // Avg car: 0.192 kg/km, Motorcycle: 0.103 kg/km, Bus: 0.089 kg/km
  const travelDays = 30;
  if (data.vehicleType === 'Car') {
    transportEmissions += data.dailyTravelDistance * 0.192 * travelDays;
  } else if (data.vehicleType === 'Motorcycle') {
    transportEmissions += data.dailyTravelDistance * 0.103 * travelDays;
  } else if (data.vehicleType === 'Public Transport') {
    transportEmissions += data.dailyTravelDistance * 0.089 * travelDays;
  }
  
  // Flights (assuming ~250kg per short flight, spread monthly)
  transportEmissions += (data.flightFrequency * 250) / 12;

  // 2. Energy Emissions (kg CO2 per month)
  // Avg electricity: 0.85 kg/kWh
  energyEmissions += data.monthlyElectricityConsumption * 0.85;
  // AC usage: 1.5 kWh per hour, 30 days
  energyEmissions += (data.acUsageHours * 1.5 * 30) * 0.85;

  // 3. Food Emissions (kg CO2 per month)
  if (data.dietPreference === 'Vegan') foodEmissions += 60;
  else if (data.dietPreference === 'Vegetarian') foodEmissions += 90;
  else if (data.dietPreference === 'Mixed') foodEmissions += 150;
  else if (data.dietPreference === 'High Meat') foodEmissions += 250;

  // 4. Waste Emissions (kg CO2 per month)
  // Baseline waste: 20kg
  let wasteBase = 20;
  if (data.recyclingHabits === 'Poor') wasteBase += 15;
  else if (data.recyclingHabits === 'Average') wasteBase += 5;
  else if (data.recyclingHabits === 'Excellent') wasteBase -= 10;

  if (data.plasticUsage === 'High') wasteBase += 15;
  else if (data.plasticUsage === 'Medium') wasteBase += 5;
  else if (data.plasticUsage === 'Low') wasteBase -= 5;

  wasteEmissions += Math.max(0, wasteBase);

  const total = transportEmissions + energyEmissions + foodEmissions + wasteEmissions;

  return {
    transportation: Number(transportEmissions.toFixed(2)),
    energy: Number(energyEmissions.toFixed(2)),
    food: Number(foodEmissions.toFixed(2)),
    waste: Number(wasteEmissions.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

export function calculateEcoScore(totalMonthlyEmissions: number) {
  // Global average is ~400 kg per month
  // < 200: Champion, < 300: Contributor, < 500: Improving, > 500: High Impact
  if (totalMonthlyEmissions <= 200) return { score: 95, level: 'Eco Champion' };
  if (totalMonthlyEmissions <= 300) return { score: 85, level: 'Green Contributor' };
  if (totalMonthlyEmissions <= 500) return { score: 65, level: 'Improving Citizen' };
  return { score: 40, level: 'High Impact User' };
}
