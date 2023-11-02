'use server';

import { FormListStats } from '@/components/StatsCardsWrapper/types';
import prisma from '@/lib/prisma';
import { FormSchema, FormSchemaType } from '@/types/Form';
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

export async function CreateForm(data: FormSchemaType) {
  const validation = FormSchema.safeParse(data);
  if (!validation.success) {
    throw new Error('Form not valid');
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name: name,
      description: description
    }
  });

  if (!form) {
    throw new Error('Something went wrong');
  }

  return form.id;
}

export async function GetForms() {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id: id
    }
  });
}
