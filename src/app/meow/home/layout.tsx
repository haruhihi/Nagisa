"use client"
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'
import type { FC } from 'react'
import { NavBar, TabBar } from 'antd-mobile'
import {
  AppOutline,
  MessageOutline,
  UnorderedListOutline,
  UserOutline,
} from 'antd-mobile-icons'

import styles from './index.module.scss'

const Bottom: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const tabs = [
    {
      key: '/meow/home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: '/meow/home/bill',
      title: '账单',
      icon: <UnorderedListOutline />,
    },
    {
      key: '/meow/home/time-machine',
      title: '消息',
      icon: <MessageOutline />,
    },
    {
      key: '/meow/home/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={value => router.push(value)}>
      {tabs.map(item => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}


const App: React.FC<{children: React.ReactNode}> = (props) => {
    return (
      <div className={styles.app}>
        <div className={styles.top}>
          <NavBar>配合路由使用</NavBar>
        </div>
        <div className={styles.body}>
          {props.children}
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
      )
  }

  export default App

  
  
  function Home() {
    return <div>首页</div>
  }
  
  function Todo() {
    return <div>待办</div>
  }
  
  function Message() {
    return <div>消息</div>
  }
  
  function PersonalCenter() {
    return <div>我的</div>
  }