import { useEffect, useState } from "react";
import { post } from "@libs/fetch";
import { ICategoryRes, ITransactionSearchRes } from "@dtos/meow";

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategoryRes>();

  useEffect(() => {
    async function fetchOptions() {
      const res = await post<null, ICategoryRes>("/api/category");
      setCategories(res);
    }
    fetchOptions();
  }, []);

  return categories;
};

export const useTransactions = () => {
  const [res, setRes] = useState<ITransactionSearchRes>();
  const [timeStamp, setTimeStamp] = useState<number>(Date.now());

  useEffect(() => {
    async function fetchTransactions() {
      const res = await post<null, ITransactionSearchRes>(
        "/api/transaction/search"
      );
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
