import { prisma } from '@libs/prisma';
import { ITrekSearchRes } from '@dtos/meow';
import { success, fail } from '@libs/fetch';
import { getUID } from '@libs/session';

export async function POST() {
  const userId = await getUID();
  if (!userId) {
    throw new Error(`非法的 userId: ${userId}`);
  }
  try {
    const treks = await prisma.trek.findMany({
      where: {
        userId,
      },
    });

    return success<ITrekSearchRes>({ treks });
  } catch (error) {
    return fail(error);
  }
}
