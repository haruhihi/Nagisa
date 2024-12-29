import { prisma, Category } from '@libs/prisma';
import { ICategoryRes } from '@dtos/meow';
import { success } from '@libs/fetch';

export async function POST() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        parent: true,
        children: true,
      },
    });

    return success<ICategoryRes>({ categories });
  } catch (error) {
    console.log('err', error);
    return new Response(JSON.stringify({ result: `error: ${(error as Error)?.message ?? ''}` }), {
      status: 500,
    });
  }
}
