import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import CarbonRecord from '@/models/CarbonRecord';
import { calculateCarbonFootprint, calculateEcoScore } from '@/lib/calculator';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return Response.json({ message: 'User not found' }, { status: 404 });
    }

    // Update user profile
    Object.assign(user, data);
    user.isOnboarded = true;

    // Calculate footprint
    const emissions = calculateCarbonFootprint(data);
    const ecoScoreData = calculateEcoScore(emissions.total);

    user.ecoScore = ecoScoreData.score;
    user.level = ecoScoreData.level;
    
    if (!user.badges.includes('First Assessment')) {
      user.badges.push('First Assessment');
    }

    await user.save();

    // Create a carbon record for this month
    await CarbonRecord.create({
      userId: user._id,
      date: new Date(),
      transportation: emissions.transportation,
      energy: emissions.energy,
      food: emissions.food,
      waste: emissions.waste,
      total: emissions.total,
    });

    return Response.json({ message: 'Onboarding completed', user }, { status: 200 });
  } catch (error) {
    console.error('Onboarding error:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
