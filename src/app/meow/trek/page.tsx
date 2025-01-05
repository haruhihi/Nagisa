'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Card, Modal, Toast } from 'antd-mobile';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { RightOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { post } from '@libs/fetch';
import { handleError, useRefresh } from '@utils/tool';
import { ITrekSearchRes } from '@dtos/meow';
import { TopLoading } from '@components/loading';

export default function App() {
  const [res, setRes] = useState<ITrekSearchRes>();
  const refresh = useRefresh();
  useEffect(() => {
    post<null, ITrekSearchRes>('/api/trek/search')
      .then((res) => {
        setRes(res);
        console.log(res);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [refresh.refreshSignal]);

  if (!res) {
    return <TopLoading />;
  }

  return (
    <div>
      <ATrek type="健身" res={res} onRefresh={() => refresh.refresh()} />
      <ATrek type="可乐" res={res} onRefresh={() => refresh.refresh()} />
    </div>
  );
}

const ATrek: React.FC<{ type: string; res: ITrekSearchRes; onRefresh: () => void }> = (props) => {
  const {
    type,
    onRefresh,
    res: { treks },
  } = props;
  const existedTreks = treks.filter((t) => t.type === type);
  return (
    <Card
      title={<div style={{ fontWeight: 'normal' }}>{type}</div>}
      extra={<RightOutline />}
      style={{ borderRadius: '16px' }}
    >
      <div className={styles.content}>
        <Calendar
          renderDate={(date) => {
            return (
              <div
                className={classNames(styles['custom-cell'], {
                  [styles['custom-cell-selected']]: existedTreks.some((trek) => {
                    return dayjs(trek.date).isSame(dayjs(date), 'day');
                  }),
                })}
              >
                {dayjs(date).date()}
              </div>
            );
          }}
          selectionMode="single"
          onChange={(originDate: Date | null) => {
            const date = dayjs(originDate).startOf('day');
            Modal.confirm({
              content: `是否打卡 ${type} ${date.format('YYYY-MM-DD')}`,
              onConfirm: async () => {
                try {
                  await post('/api/trek/create', {
                    date: date.unix() * 1000,
                    count: 1,
                    type,
                  });
                  Toast.show({
                    content: '打卡成功',
                    afterClose: () => onRefresh(),
                  });
                } catch (error) {
                  handleError(error);
                }
              },
            });
          }}
        />
      </div>
    </Card>
  );
};
