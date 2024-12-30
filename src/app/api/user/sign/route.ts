import { prisma } from '@libs/prisma';
import { ISignReq } from '@dtos/meow';
import { success, fail } from '@libs/fetch';
import { createSession } from '@libs/session';

export async function POST(request: Request) {
  try {
    const { account, password, nickname } = (await request.json()) as ISignReq;

    let user = await prisma.user.findUnique({
      where: { account },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          account,
          nickname: nickname ?? account,
          password,
        },
      });
    }

    if (user.password !== password && user.account !== account) {
      throw new Error('账号或密码错误');
    }

    // 4. Create user session
    await createSession(`${user.id}`);
    // 5. Success
    return success({ user });
  } catch (error) {
    return fail(error);
  }
}
