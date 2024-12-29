"use client";
import {
  FloatingBubble,
  Cascader,
  Modal,
  Form,
  Button,
  Input,
  List,
} from "antd-mobile";
import dayjs from "dayjs";
import { HandPayCircleOutline } from "antd-mobile-icons";
import { useState } from "react";
import { useCategories, useTransactions } from "./help";
import {
  ICategoryRes,
  ITransactionCreateReq,
  ITransactionCreateRes,
} from "@/dtos/meow";
import { post } from "@libs/fetch";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [categoryVisible, setCategoryVisible] = useState(false);
  const categories = useCategories();
  const { transactions, reQuery } = useTransactions();

  const onClick = () => {
    setVisible(true);
    setCategoryVisible(true);
  };

  if (!categories) {
    return "Loding...";
  }

  const { options } = categories;

  return (
    <div>
      <List>
        {(transactions ?? []).map((transaction) => (
          <List.Item
            key={transaction.id}
            description={dayjs(transaction.createdAt).format("YYYY-MM-DD")}
          >
            <div>
              {transaction.category.name}: {transaction.amount}
            </div>
          </List.Item>
        ))}
      </List>
      <FloatingBubble
        style={{
          "--initial-position-bottom": "100px",
          "--initial-position-right": "24px",
          "--edge-distance": "44px",
        }}
        onClick={onClick}
      >
        <HandPayCircleOutline fontSize={32} />
      </FloatingBubble>

      <Modal
        visible={visible}
        closeOnMaskClick
        content={
          <Form
            layout="horizontal"
            footer={
              <Button block type="submit" color="primary" size="large">
                提交
              </Button>
            }
            onFinish={async (values: {
              amount: string;
              category: string[];
            }) => {
              if (!values) return console.log("values is empty");
              const { amount, category } = values;
              const res = await post<
                ITransactionCreateReq,
                ITransactionCreateRes
              >("/api/transaction/create", {
                amount: Number(amount),
                categoryId: Number(category[category.length - 1]),
              });
              setVisible(false);
              reQuery();
              console.log(res);
            }}
          >
            <Form.Item
              name="category"
              label="分类"
              rules={[{ required: true, message: "请选择分类" }]}
            >
              <FormCascader
                options={options}
                categoryVisible={categoryVisible}
                setCategoryVisible={(visible: boolean) =>
                  setCategoryVisible(visible)
                }
              />
            </Form.Item>

            <Form.Item
              name="amount"
              label="金额"
              rules={[{ required: true, message: "金额不能为空" }]}
            >
              <Input placeholder="请输入金额" type="number" />
            </Form.Item>
          </Form>
        }
      ></Modal>
    </div>
  );
}

const FormCascader: React.FC<{
  value?: string[];
  onChange?: (value: unknown) => void;
  options: ICategoryRes["options"];
  categoryVisible: boolean;
  setCategoryVisible: (visiable: boolean) => void;
}> = (props) => {
  const {
    value,
    onChange = () => {},
    options,
    categoryVisible,
    setCategoryVisible,
  } = props;
  console.log(value);
  return (
    <div onClick={() => setCategoryVisible(true)}>
      <div>{getLabelsFromValue(options, value)}</div>
      <Cascader
        options={options}
        visible={categoryVisible}
        onClose={() => setCategoryVisible(false)}
        onConfirm={(value) => onChange(value)}
      />
    </div>
  );
};

const getLabelsFromValue = (
  options: ICategoryRes["options"],
  value?: string[]
) => {
  if (!value) {
    return "请选择类别";
  }
  const labels = [];
  let currentOptions = options;

  for (const val of value) {
    const option = currentOptions.find((opt) => opt.value === val);
    if (option) {
      labels.push(option.label);
      currentOptions = option.children || [];
    } else {
      break;
    }
  }

  return labels[labels.length - 1] || "请选择类别";
};
