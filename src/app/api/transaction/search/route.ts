import { prisma } from '@libs/prisma';
import { ITransactionSearchReq, ITransactionSearchRes } from '@dtos/meow';
import { success, fail } from '@libs/fetch';
import { getSession } from '@libs/session';
import { isNil } from 'lodash-es';

export async function POST(req: Request) {
  try {
    const { page, pageSize } = (await req.json()) as ITransactionSearchReq;

    const userId = (await getSession())?.userId;

    if (!userId) {
      throw new Error(`User not found:${userId}`);
    }

    if (isNil(page) || isNil(pageSize)) {
      throw new Error('Page and pageSize are required');
    }

    const transactions = await prisma.transaction.findMany({
      where: {
        userId: Number(userId),
      },
      orderBy: {
        date: 'desc',
      },
      skip: page * pageSize,
      take: pageSize,
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
