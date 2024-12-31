'use client';
import { useState, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { useRouter } from 'next/navigation';
import { useUserInfo } from '@utils/user';

export default function App() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const router = useRouter();

  const userInfo = useUserInfo();

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream);

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  return (
    <div>
      {isStandalone ? null : (
        <div>
          <h3>Install App</h3>
          <button>Add to Home Screen</button>
          {isIOS && (
            <p>
              To install this app on your iOS device, tap the share button
              <span role="img" aria-label="share icon">
                {' '}
                ⎋{' '}
              </span>
              and then Add to Home Screen
              <span role="img" aria-label="plus icon">
                {' '}
                ➕{' '}
              </span>
              .
            </p>
          )}
        </div>
      )}
      -------------
      <h3>User Info</h3>
      <p>account: {userInfo?.user?.account}</p>
      <p>nickname: {userInfo?.user?.nickname}</p>
      <Button block color="primary" size="large" onClick={() => router.push('/user/sign')}>
        切换账号
      </Button>
    </div>
  );
}
