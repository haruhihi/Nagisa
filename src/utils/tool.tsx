import { useState } from 'react';

export const useRefresh = () => {
  const [timeStamp, setTimeStamp] = useState<number>(Date.now());
  return { refreshSignal: timeStamp, refresh: () => setTimeStamp(Date.now()) };
};
