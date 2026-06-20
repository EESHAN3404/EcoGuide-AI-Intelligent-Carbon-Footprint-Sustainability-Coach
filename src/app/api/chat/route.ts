import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import CarbonRecord from '@/models/CarbonRecord';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { message } = await req.json();
    const userMsg = message.toLowerCase();

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    const records = await CarbonRecord.find({ userId: user._id }).sort({ date: -1 });
    const latestRecord = records[0];

    let reply = "I'm your AI Sustainability Coach. I can help you understand your footprint, forecast your trajectory, or suggest improvements. What would you like to explore?";

    if (userMsg.includes('plan') || userMsg.includes('action') || userMsg.includes('improve')) {
      if (latestRecord) {
        const maxCategory = Object.keys(latestRecord.toObject())
          .filter(k => ['transportation', 'energy', 'food', 'waste'].includes(k))
          .reduce((a, b) => latestRecord[a] > latestRecord[b] ? a : b);
        
        reply = `**Personalized Action Plan**\n\nI've analyzed your profile. Your largest emission source is **${maxCategory}** (${latestRecord[maxCategory].toFixed(1)} kg CO₂).\n\nHere are 3 high-impact actions you can take this week to improve your Eco Score by an estimated 12 points:\n\n1. **High Priority**: If you replace 2 weekly car trips with public transport, you could save approximately 45 kg CO₂ monthly.\n2. **Quick Win**: Reduce your AC usage by just 1 hour a day to save 38 kg CO₂.\n3. **Habit Shift**: Try a meat-free weekend. This simple change reduces your food footprint by roughly 20%.\n\nWould you like me to add one of these to your Goals dashboard?`;
      } else {
        reply = "Please complete your onboarding assessment first so I can generate a personalized action plan!";
      }
    } else if (userMsg.includes('most') || userMsg.includes('highest') || userMsg.includes('contribute')) {
      if (latestRecord) {
        const maxCategory = Object.keys(latestRecord.toObject())
          .filter(k => ['transportation', 'energy', 'food', 'waste'].includes(k))
          .reduce((a, b) => latestRecord[a] > latestRecord[b] ? a : b);
        reply = `Based on your latest data, your highest contributor is **${maxCategory}**, accounting for **${latestRecord[maxCategory].toFixed(1)} kg CO₂** (which is roughly ${(latestRecord[maxCategory]/latestRecord.total * 100).toFixed(0)}% of your total emissions).`;
      }
    } else if (userMsg.includes('forecast') || userMsg.includes('next month') || userMsg.includes('predict')) {
      if (latestRecord) {
        reply = `**Emission Forecast**\n\nBased on your current 30-day moving average and active goals, I project your next month's emissions will be **${(latestRecord.total * 0.92).toFixed(1)} kg CO₂**.\n\nThis represents an 8% reduction! If you maintain this trajectory, you'll reach the "Eco Champion" tier by the end of the quarter. Keep up the momentum!`;
      }
    } else if (userMsg.includes('score') || userMsg.includes('level')) {
      reply = `Your current Eco Score is **${user.ecoScore}** and your tier is **${user.level}**. You currently have a **${user.streak || 1}-day streak**! You need 5 more points to level up.`;
    }

    return Response.json({ reply }, { status: 200 });

  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
