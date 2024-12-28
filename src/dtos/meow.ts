import { Transaction } from "@prisma/client";
import { Prisma } from "@prisma/client";

interface CategoryOption {
  label: string;
  value: string;
  children?: CategoryOption[];
}

export interface ICategoryRes {
  options: CategoryOption[];
}

export interface ITransactionCreateReq {
  categoryId: number;
  amount: number;
  description?: string;
}

export interface ITransactionCreateRes {
  transaction: Transaction;
}

export interface ITransactionSearchRes {
  transactions: Prisma.TransactionGetPayload<{
    include: {
      category: true;
    };
  }>[];
}
