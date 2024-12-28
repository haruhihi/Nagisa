"use client";
import { FloatingBubble, Cascader } from "antd-mobile";
import { HandPayCircleOutline } from "antd-mobile-icons";
import { useEffect, useState } from "react";
import { post } from "@libs/fetch";
import { ICategoryRes } from "@dtos/meow";

export default function App() {
  const [visible, setVisible] = useState(false);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await post<ICategoryRes>("/meow/api/category");
      setOptions(res.options);
    }
    fetchPosts();
  }, []);

  const onClick = () => {
    setVisible(true);
  };

  return (
    <div>
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

      <Cascader
        options={options}
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </div>
  );
}
