import { prisma } from '@libs/prisma';
import { ITransactionCreateRes, ITransactionCreateReq } from '@dtos/meow';
import { success, fail } from '@libs/fetch';
import { getSession } from '@libs/session';

export async function POST(request: Request) {
  try {
    const { categoryId, amount, date, description } = (await request.json()) as ITransactionCreateReq;
    const userId = (await getSession())?.userId;

    if (!userId) {
      throw new Error(`User not found:${userId}`);
    }

    const newTransaction = await prisma.transaction.create({
      data: {
        userId: Number(userId),
        categoryId: categoryId,
        amount,
        description,
        date: new Date(date),
      },
    });

    return success<ITransactionCreateRes>({
      transaction: newTransaction,
    });
  } catch (error) {
    return fail(error);
  }
}
