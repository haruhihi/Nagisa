'use client';
import { FloatingBubble, Modal, Form, Button, Input, List, SwipeAction, SpinLoading } from 'antd-mobile';
import { AddCircleOutline } from 'antd-mobile-icons';
import { useState } from 'react';
import { getCategoryOptions, useCategories } from '@utils/category';
import { ICategoryCreateReq, ICategoryCreateRes } from '@dtos/meow';
import { post } from '@libs/fetch';
import { FormCascader } from '@components/form-cascader';

export default function App() {
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const categoryRes = useCategories();

  const onClick = () => {
    setVisible(true);
  };

  if (!categoryRes) {
    return <SpinLoading style={{ '--size': '48px' }} color="primary" />;
  }
  const cascaderOptions = getCategoryOptions(categoryRes.categories);

  const { categories, reQuery } = categoryRes;

  return (
    <div>
      <List>
        {(categories ?? []).map((category) => (
          <SwipeAction
            key={category.id}
            rightActions={[
              {
                key: 'unsubscribe',
                text: '删除',
                color: 'red',
                onClick: async () => {},
              },
            ]}
          >
            <List.Item>
              {`Id: ${category.id}`} {category.name} {'<'} {category.parent?.name ?? '顶级'}
            </List.Item>
          </SwipeAction>
        ))}
      </List>
      <FloatingBubble
        style={{
          '--initial-position-bottom': '100px',
          '--initial-position-right': '24px',
          '--edge-distance': '44px',
        }}
        onClick={onClick}
      >
        <AddCircleOutline fontSize={32} />
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
            onFinish={async (values: { name: string; parent: string[] }) => {
              if (!values) return console.log('values is empty');
              const { name, parent } = values;
              const res = await post<ICategoryCreateReq, ICategoryCreateRes>('/api/category/create', {
                name,
                parentId: Number(parent[parent.length - 1]),
              });
              reQuery();
              setVisible(false);
              console.log(res);
            }}
          >
            <Form.Item name="parent" label="父级" rules={[{ required: true, message: '请选择父级' }]}>
              <FormCascader options={cascaderOptions ?? []} categoryVisible={categoryVisible} setCategoryVisible={(visible: boolean) => setCategoryVisible(visible)} />
            </Form.Item>
            <Form.Item name="name" label="类名" rules={[{ required: true, message: '类名不能为空' }]}>
              <Input placeholder="请输入类名" type="string" />
            </Form.Item>
          </Form>
        }
      ></Modal>
    </div>
  );
}
