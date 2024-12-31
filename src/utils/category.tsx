import { useEffect, useState } from 'react';
import { post } from '@libs/fetch';
import { ICategoryRes, ITransactionSearchRes } from '@dtos/meow';
import { CascaderOption } from 'antd-mobile';
import { useRefresh } from './tool';
import {
  ShopOutlined,
  CustomerServiceOutlined,
  CoffeeOutlined,
  MedicineBoxOutlined,
  BookOutlined,
  RocketOutlined,
  CarOutlined,
  TeamOutlined,
  AccountBookOutlined,
} from '@ant-design/icons';

export const useCategories = () => {
  const [res, setRes] = useState<ICategoryRes>();
  const { refreshSignal, refresh } = useRefresh();

  useEffect(() => {
    async function fetchCategory() {
      const res = await post<null, ICategoryRes>('/api/category/search');
      setRes(res);
    }
    fetchCategory();
  }, [refreshSignal]);

  return res
    ? {
        ...res,
        reQuery: () => {
          setRes(undefined);
          refresh();
        },
      }
    : undefined;
};

export const getCategoryFromValue = (value: string, categories?: ICategoryRes['categories']) => {
  if (!categories) return undefined;
  return categories.find((category) => `${category.id}` === value);
};

export const getCategoryOptions = (categories: ICategoryRes['categories']) => {
  // 转换成 options
  const buildCategoryTree = (
    categories: ICategoryRes['categories'],
    parentId: number | null = null
  ): CascaderOption[] => {
    return categories
      .filter((category) => category.parentId === parentId)
      .map((category) => {
        const children = buildCategoryTree(categories, category.id);
        return {
          value: String(category.id),
          label: category.name,
          children: children.length ? children : undefined,
        };
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

export const getIconFromCategoryId = (id: number) => {
  return iconMap[id] || AccountBookOutlined;
};

const iconMap: { [index: number]: any } = {
  1: ShopOutlined,
  7: ShopOutlined,
  8: ShopOutlined,
  23: ShopOutlined,
  26: ShopOutlined,
  27: ShopOutlined,
  2: CoffeeOutlined,
  9: CoffeeOutlined,
  10: CoffeeOutlined,
  11: CoffeeOutlined,
  18: CoffeeOutlined,
  3: MedicineBoxOutlined,
  12: MedicineBoxOutlined,
  13: MedicineBoxOutlined,
  4: BookOutlined,
  22: BookOutlined,
  24: BookOutlined,
  34: BookOutlined,
  5: RocketOutlined,
  14: RocketOutlined,
  15: RocketOutlined,
  16: RocketOutlined,
  6: CustomerServiceOutlined,
  17: CustomerServiceOutlined,
  25: CarOutlined,
  28: CarOutlined,
  29: CarOutlined,
  30: CarOutlined,
  31: TeamOutlined,
  32: TeamOutlined,
  33: TeamOutlined,
};
