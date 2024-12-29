import { prisma } from '@libs/prisma';
import { ICategoryRes } from '@dtos/meow';
import { success, fail } from '@libs/fetch';

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
    return fail(error);
  }
}
