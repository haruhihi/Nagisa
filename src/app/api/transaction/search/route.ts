import { prisma } from '@libs/prisma';
import { ITransactionSearchRes } from '@dtos/meow';
import { success, fail } from '@libs/fetch';
import { getSession } from '@libs/session';

export async function POST() {
  try {
    const userId = (await getSession())?.userId;

    if (!userId) {
      throw new Error(`User not found:${userId}`);
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: Number(userId),
      },
      include: {
        category: true,
      },
    });

    return success<ITransactionSearchRes>({
      transactions,
    });
  } catch (error) {
    return fail(error);
  }
}
