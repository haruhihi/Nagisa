import { prisma } from '@libs/prisma';
import { ITransactionCreateRes, ITransactionCreateReq } from '@dtos/meow';
import { success, fail } from '@libs/fetch';

export async function POST(request: Request) {
  try {
    const { categoryId, amount, description } = (await request.json()) as ITransactionCreateReq;

    const newTransaction = await prisma.transaction.create({
      data: {
        userId: 1,
        categoryId: categoryId,
        amount,
        description,
        date: new Date(),
      },
    });

    return success<ITransactionCreateRes>({
      transaction: newTransaction,
    });
  } catch (error) {
    return fail(error);
  }
}
