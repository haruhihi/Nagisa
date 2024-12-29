import { useEffect, useState } from 'react';
import { post } from '@libs/fetch';
import { ICategoryRes, ITransactionSearchRes } from '@dtos/meow';
import { CascaderOption } from 'antd-mobile';

export const useCategories = () => {
  const [res, setRes] = useState<ICategoryRes>();

  useEffect(() => {
    async function fetchCategory() {
      const res = await post<null, ICategoryRes>('/api/category');
      setRes(res);
    }
    fetchCategory();
  }, []);

  return res;
};

export const getCategoryFromValue = (value: string, categories?: ICategoryRes['categories']) => {
  if (!categories) return undefined;
  return categories.find((category) => `${category.id}` === value);
};

export const getCategoryOptions = (categories: ICategoryRes['categories']) => {
  // 转换成 options
  const buildCategoryTree = (categories: ICategoryRes['categories'], parentId: number | null = null): CascaderOption[] => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => {
        const children = buildCategoryTree(categories, category.id)
        return {
          value: String(category.id),
          label: category.name,
          children: children.length ? children : undefined,
        }
      });
  };

  return buildCategoryTree(categories);
};

export const useTransactions = () => {
  const [res, setRes] = useState<ITransactionSearchRes>();
  const [timeStamp, setTimeStamp] = useState<number>(Date.now());

  useEffect(() => {
    async function fetchTransactions() {
      const res = await post<null, ITransactionSearchRes>('/api/transaction/search');
      setRes(res);
    }
    fetchTransactions();
  }, [timeStamp]);

  return {
    ...res,
    reQuery: () => {
      setRes(undefined);
      setTimeStamp(Date.now());
    },
  };
};
