'use client';
import { FloatingBubble, Modal, Form, Button, Input, List, SwipeAction, Empty } from 'antd-mobile';
import dayjs from 'dayjs';
import { HandPayCircleOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { useTransactions } from '@utils/transaction';
import { useCategories, getCategoryOptions } from '@utils/category';
import { ITransactionCreateReq, ITransactionCreateRes } from '@dtos/meow';
import { post } from '@libs/fetch';
import { FormCascader } from '@components/form-cascader';
import { TopLoading } from '@components/loading';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const categoryRes = useCategories();
  const { transactions, reQuery } = useTransactions();

  const onClick = () => {
    setVisible(true);
    setCategoryVisible(true);
  };

  if (!categoryRes || transactions === undefined) {
    return <TopLoading />;
  }

  const cascaderOptions = getCategoryOptions(categoryRes.categories);

  return (
    <div>
      {transactions.length > 0 ? (
        <List>
          {(transactions ?? []).map((transaction) => (
            <SwipeAction
              key={transaction.id}
              rightActions={[
                {
                  key: 'unsubscribe',
                  text: '删除',
                  color: 'red',
                  onClick: async () => {
                    await post('/api/transaction/delete', { ids: [transaction.id] });
                    reQuery();
                  },
                },
              ]}
            >
              <List.Item key={transaction.id} description={dayjs(transaction.createdAt).format('YYYY-MM-DD')}>
                <div>
                  {transaction.category.name}: {transaction.amount}
                </div>
              </List.Item>
            </SwipeAction>
          ))}
        </List>
      ) : (
        <Empty style={{ padding: '64px 0' }} imageStyle={{ width: 128 }} description="暂无数据" />
      )}
      <FloatingBubble
        style={{
          '--initial-position-bottom': '100px',
          '--initial-position-right': '24px',
          '--edge-distance': '44px',
        }}
        onClick={onClick}
      >
        <HandPayCircleOutline fontSize={32} />
      </FloatingBubble>

      <Modal
        visible={visible}
        closeOnMaskClick
        showCloseButton
        onClose={() => setVisible(false)}
        content={
          <Form
            layout="horizontal"
            footer={
              <Button block type="submit" color="primary" size="large">
                提交
              </Button>
            }
            style={{ marginTop: '20px' }}
            onFinish={async (values: { amount: string; category: string[] }) => {
              if (!values) return console.log('values is empty');
              const { amount, category } = values;
              const res = await post<ITransactionCreateReq, ITransactionCreateRes>('/api/transaction/create', {
                amount: Number(amount),
                categoryId: Number(category[category.length - 1]),
              });
              setVisible(false);
              reQuery();
              console.log(res);
            }}
          >
            <Form.Item name="category" label="分类" rules={[{ required: true, message: '请选择分类' }]}>
              <FormCascader options={cascaderOptions ?? []} categoryVisible={categoryVisible} setCategoryVisible={(visible: boolean) => setCategoryVisible(visible)} />
            </Form.Item>

            <Form.Item name="amount" label="金额" rules={[{ required: true, message: '金额不能为空' }]}>
              <Input placeholder="请输入金额" type="number" />
            </Form.Item>
          </Form>
        }
      ></Modal>
    </div>
  );
}
