import { useEffect, useState } from 'react';
import { post } from '@libs/fetch';
import { ITransactionSearchRes, ITransactionSearchReq } from '@dtos/meow';

const DEFAULT_PAGE = 0;
const DEFAULT_PAGE_SIZE = 15;

export const useTransactions = () => {
  const [page, setPage] = useState<number>(DEFAULT_PAGE);
  const [transactions, setTransactions] = useState<ITransactionSearchRes['transactions']>();
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchTransactions = async (page: number) => {
    const res = await post<ITransactionSearchReq, ITransactionSearchRes>('/api/transaction/search', {
      page,
      pageSize: DEFAULT_PAGE_SIZE,
    });
    if (!transactions || page === DEFAULT_PAGE) {
      setTransactions(res.transactions);
    } else {
      setTransactions([...transactions, ...res.transactions]);
    }

    if (res.transactions.length < DEFAULT_PAGE_SIZE) {
      setHasMore(false);
    }

    if (res.transactions.length > 0) {
      setPage(page);
    }
  };

  useEffect(() => {
    fetchTransactions(DEFAULT_PAGE);
  }, []);

  return {
    transactions,
    loadMore: async () => {
      return fetchTransactions(page + 1);
    },
    hasMore,
    reQuery: async () => {
      setTransactions(undefined);
      fetchTransactions(DEFAULT_PAGE);
    },
  };
};
