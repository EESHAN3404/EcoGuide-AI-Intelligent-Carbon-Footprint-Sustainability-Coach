import { UserData } from './calculator';

export function getRecommendations(data: UserData, emissions: any) {
  const recommendations = [];

  // Transport
  if (emissions.transportation > 150) {
    recommendations.push({
      category: 'Transport',
      title: 'Consider Carpooling or Public Transport',
      description: 'Your transportation emissions are high. Using public transport twice a week can significantly reduce your footprint.',
      impact: 'High',
    });
  }
  if (data.dailyTravelDistance < 10 && data.vehicleType !== 'Bicycle' && data.vehicleType !== 'Walking') {
    recommendations.push({
      category: 'Transport',
      title: 'Active Commuting',
      description: 'For short distances under 10km, consider cycling or walking.',
      impact: 'Medium',
    });
  }

  // Energy
  if (emissions.energy > 150 || data.monthlyElectricityConsumption > 300) {
    recommendations.push({
      category: 'Energy',
      title: 'Optimize Home Energy',
      description: 'Switch to LED lighting and use energy-efficient appliances to lower your high electricity usage.',
      impact: 'High',
    });
  }
  if (data.acUsageHours > 4) {
    recommendations.push({
      category: 'Energy',
      title: 'Reduce AC Usage',
      description: 'Try using a smart thermostat or setting your AC slightly higher to save significant energy.',
      impact: 'Medium',
    });
  }

  // Food
  if (data.dietPreference === 'High Meat' || data.dietPreference === 'Mixed') {
    recommendations.push({
      category: 'Food',
      title: 'Meat-Free Mondays',
      description: 'Adopting a plant-based diet for just one day a week can reduce your food carbon footprint.',
      impact: 'Medium',
    });
  }

  // Waste
  if (data.plasticUsage === 'High' || data.plasticUsage === 'Medium') {
    recommendations.push({
      category: 'Waste',
      title: 'Reduce Single-Use Plastics',
      description: 'Switch to reusable bags, bottles, and containers to cut down your plastic waste.',
      impact: 'Medium',
    });
  }

  return recommendations;
}
