import { FormListStats } from '@/components/StatsCardWrapper/types';
import prisma from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs';

class UserNotFoundError extends Error {}

export async function GetFormStats(): Promise<FormListStats> {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id
    },
    _sum: {
      visits: true,
      submissions: true
    }
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = visits > 0 ? submissions / visits : 0;
  const bounceRate = 1 - submissionRate;

  return { visits, submissions, submissionRate, bounceRate };
}
