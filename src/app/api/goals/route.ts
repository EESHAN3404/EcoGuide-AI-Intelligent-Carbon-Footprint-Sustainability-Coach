import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Goal from '@/models/Goal';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { title, description, category, targetDate } = await req.json();

    await dbConnect();
    const user = await User.findOne({ email: session.user.email });

    const goal = await Goal.create({
      userId: user._id,
      title,
      description,
      category,
      targetDate,
    });

    return Response.json({ message: 'Goal created', goal }, { status: 201 });
  } catch (error) {
    console.error('Goal creation error:', error);
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
}
