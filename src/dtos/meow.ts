import { Category, Transaction, Trek, User } from '@prisma/client';
import { Prisma } from '@prisma/client';

export interface ICategoryRes {
  categories: Prisma.CategoryGetPayload<{
    include: {
      parent: true;
      children: true;
    };
  }>[];
}

export interface ITrekSearchRes {
  treks: Trek[];
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
  date: number;
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

export interface ITransactionSearchReq {
  page: number;
  pageSize: number;
}

export interface ITransactionDeleteReq {
  ids: Transaction['id'][];
}

export interface ISignReq {
  account: string;
  password: string;
  nickname?: string;
}

export interface IUserInfoRes {
  user: User;
}

export interface ITrekCreateReq {
  date: number;
  count: Trek['count'];
  type: string;
}

export interface ITrekCreateRes {
  trek: Trek;
}
