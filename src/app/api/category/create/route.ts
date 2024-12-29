import { prisma } from '@libs/prisma';
import { ICategoryCreateReq, ICategoryCreateRes } from '@dtos/meow';
import { success, fail } from '@libs/fetch';

export async function POST(request: Request) {
  try {
    const { name, parentId } = (await request.json()) as ICategoryCreateReq;

    if (!name || !parentId) {
      throw new Error(`非法的 params, name: ${name}, parent: ${parentId}`);
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        parentId,
      },
    });

    return success<ICategoryCreateRes>({ category: newCategory });
  } catch (error) {
    return fail(error);
  }
}
