import { AutoCenter, SpinLoading } from 'antd-mobile';

export const TopLoading = () => {
  return (
    <AutoCenter>
      <SpinLoading style={{ '--size': '48px', marginTop: 100 }} color="primary" />
    </AutoCenter>
  );
};
