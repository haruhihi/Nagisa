import { AutoCenter, SpinLoading } from 'antd-mobile';

export const TopLoading = () => {
  return (
    <AutoCenter>
      <SpinLoading style={{ '--size': '48px', marginTop: 150 }} color="primary" />
    </AutoCenter>
  );
};
