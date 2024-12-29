import { ITransactionDeleteReq } from '@dtos/meow';
import { success, fail } from '@libs/fetch';
import { prisma } from '@libs/prisma';

export async function POST(req: Request) {
  try {
    const { ids } = (await req.json()) as ITransactionDeleteReq;

    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error('IDs are required');
    }

    // 删除指定 ID 的交易记录
    const deleteTransactions = await prisma.transaction.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return success(deleteTransactions);
  } catch (error) {
    console.error(error);
    return fail(error);
  }
}
