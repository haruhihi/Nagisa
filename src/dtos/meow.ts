import { Category, Transaction } from '@prisma/client';
import { Prisma } from '@prisma/client';

export interface ICategoryRes {
  categories: Prisma.CategoryGetPayload<{
    include: {
      parent: true;
      children: true;
    };
  }>[];
}

export interface ICategoryCreateReq {
  parentId: Category['parentId'];
  name: Category['name'];
}

export interface ICategoryCreateRes {
  category: Category;
}

export interface ITransactionCreateReq {
  categoryId: Transaction['categoryId'];
  amount: Transaction['amount'];
  description?: Transaction['description'];
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

export interface ITransactionDeleteReq {
  ids: Transaction['id'][];
}
