import { prisma, Category } from "@libs/prisma";
import { ICategoryRes } from "@dtos/meow";
import { success } from "@libs/fetch";

export async function POST() {
  try {
    // const params = (await request.json());

    const categories: Category[] = await prisma.category.findMany();

    // 递归构建分类树
    const buildTree = (
      categories: Category[],
      parentId: number | null = null
    ): ICategoryRes["options"] => {
      
      return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => {
          const children = buildTree(categories, category.id)
          return {
            label: category.name,
            value: category.id,
            children: children.length ? children : undefined,
          }
        });
    };

    const options = buildTree(categories);

    return success<ICategoryRes>({
      options,
    });
  } catch (error) {
    console.log("err", error);
    return new Response(
      JSON.stringify({ result: `error: ${(error as Error)?.message ?? ""}` }),
      {
        status: 500,
      }
    );
  }
}
