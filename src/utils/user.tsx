import { useEffect, useState } from 'react';
import { post } from '@libs/fetch';
import { IUserInfoRes } from '@dtos/meow';
import { useRefresh } from './tool';

export const useUserInfo = () => {
  const [res, setRes] = useState<IUserInfoRes>();
  const { refreshSignal, refresh } = useRefresh();

  useEffect(() => {
    async function fetchUserInfo() {
      const res = await post<null, IUserInfoRes>('/api/user/info', null);
      setRes(res);
    }
    fetchUserInfo();
  }, [refreshSignal]);

  return {
    ...res,
    reQuery: () => {
      setRes(undefined);
      refresh();
    },
  };
};
