import { prisma } from '@libs/prisma';
import { success, fail } from '@libs/fetch';
import { getSession } from '@libs/session';

export async function POST() {
  try {
    const userId = (await getSession())?.userId;

    if (!userId) {
      throw new Error(`User not found:${userId}`);
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    return success({ user });
  } catch (error) {
    return fail(error);
  }
}
