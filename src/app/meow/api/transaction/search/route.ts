import { prisma } from "@libs/prisma";
import { ITransactionSearchRes } from "@dtos/meow";
import { success } from "@libs/fetch";

export async function POST() {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: 1,
      },
      include: {
        category: true,
      },
    });

    return success<ITransactionSearchRes>({
      transactions,
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
