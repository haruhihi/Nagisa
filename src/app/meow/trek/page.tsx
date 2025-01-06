'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Card, FloatingBubble, Modal, Toast, Input, Form, Button } from 'antd-mobile';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { AddCircleOutline, RightOutline } from 'antd-mobile-icons';
import styles from './index.module.scss';
import { post } from '@libs/fetch';
import { handleError, useRefresh } from '@utils/tool';
import { ITrekSearchRes } from '@dtos/meow';
import { TopLoading } from '@components/loading';

export default function App() {
  const [res, setRes] = useState<ITrekSearchRes>();
  const [selectedType, setSelectedType] = useState<string>();
  const [newTypes, setNewTypes] = useState<string[]>([]);
  const refresh = useRefresh();
  useEffect(() => {
    post<null, ITrekSearchRes>('/api/trek/search')
      .then((res) => {
        setRes(res);
        setSelectedType(res.treks[0]?.type);
        console.log(res);
      })
      .catch((err) => {
        handleError(err);
      });
  }, [refresh.refreshSignal]);

  const onCreate = (newTypes: string) => {
    setNewTypes((types) => [...types, newTypes]);
  };

  if (!res || !selectedType) {
    return <TopLoading />;
  }

  let allTypes = res.treks.map((t) => t.type).concat(newTypes);
  allTypes = [...new Set(allTypes)];

  return (
    <div>
      <ATrek type={selectedType} res={res} onRefresh={() => refresh.refresh()} />
      {allTypes.length !== 0 ? (
        <>
          {allTypes.map((type, index) => {
            return (
              <FloatingBubble
                key={type}
                className={classNames({ [styles['un-selected-bubble']]: selectedType !== type })}
                style={{
                  '--initial-position-bottom': `${180 + 80 * index}px`,
                  '--initial-position-right': '24px',
                  '--edge-distance': '44px',
                }}
                onClick={() => {
                  setSelectedType(type);
                }}
              >
                {type}
              </FloatingBubble>
            );
          })}
          <AddButton onCreate={onCreate} />
        </>
      ) : (
        <AddButton onCreate={onCreate} />
      )}
    </div>
  );
}

const AddButton: React.FC<{ onCreate: (newType: string) => void }> = (props) => {
  const { onCreate } = props;

  return (
    <FloatingBubble
      style={{
        '--initial-position-bottom': `${100}px`,
        '--initial-position-right': '24px',
        '--edge-distance': '44px',
      }}
      onClick={async () => {
        const handler = Modal.show({
          title: '请输入新增的类型',
          content: (
            <Form
              layout="horizontal"
              footer={
                <Button block type="submit" color="primary" size="large">
                  新增
                </Button>
              }
              onFinish={(values) => {
                onCreate(values.newType);
                handler.close();
              }}
            >
              <Form.Item name="newType" label="类型" rules={[{ required: true, message: '类型不能为空' }]}>
                <Input placeholder="请输入新类型" />
              </Form.Item>
            </Form>
          ),
        });
      }}
    >
      <AddCircleOutline fontSize={32} />
    </FloatingBubble>
  );
};

const ATrek: React.FC<{ type: string; res: ITrekSearchRes; onRefresh: () => void }> = (props) => {
  const {
    type,
    onRefresh,
    res: { treks },
  } = props;
  const existedTreks = treks.filter((t) => t.type === type);
  const isSelected = (date: Date) => {
    return existedTreks.some((trek) => {
      return dayjs(trek.date).isSame(dayjs(date), 'day');
    });
  };
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
                  [styles['custom-cell-selected']]: isSelected(date),
                })}
              >
                {dayjs(date).date()}
              </div>
            );
          }}
          selectionMode="single"
          onChange={(originDate: Date | null) => {
            console.log(originDate);
            const date = dayjs(originDate).startOf('day');
            if (!originDate) {
              return;
            }
            if (isSelected(originDate)) {
              Modal.confirm({
                content: `是否取消打卡 ${type} ${date.format('YYYY-MM-DD')}`,
                onConfirm: async () => {
                  try {
                    await post('/api/trek/delete', {
                      date: date.unix() * 1000,
                      type,
                    });
                    Toast.show({
                      content: '取消打卡成功',
                      afterClose: () => onRefresh(),
                    });
                  } catch (error) {
                    handleError(error);
                  }
                },
              });
              return;
            }
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
