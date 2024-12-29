'use client';
import { useRouter, usePathname } from 'next/navigation';
import React from 'react';
import type { FC } from 'react';
import { TabBar } from 'antd-mobile';
import { HistogramOutline, MessageOutline, UnorderedListOutline, UserOutline } from 'antd-mobile-icons';

import styles from './index.module.scss';

const Bottom: FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const tabs = [
    {
      key: '/meow/category',
      title: '类别',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/meow/bill',
      title: '账单',
      icon: <HistogramOutline />,
    },
    {
      key: '/meow/time-machine',
      title: '时光机',
      icon: <MessageOutline />,
    },
    {
      key: '/meow/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ];

  return (
    <TabBar activeKey={pathname} onChange={(value) => router.push(value)} safeArea>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};

const App: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className={styles.app}>
      {/* <div className={styles.top}>
        <NavBar>Meow</NavBar>
      </div> */}
      <div className={styles.body}>{props.children}</div>
      <div className={styles.bottom}>
        <Bottom />
      </div>
    </div>
  );
};

export default App;
