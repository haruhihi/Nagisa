import { useEffect, useState } from 'react';
import { post } from '@libs/fetch';
import { ITransactionSearchRes } from '@dtos/meow';

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
