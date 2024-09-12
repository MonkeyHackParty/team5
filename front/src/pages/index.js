import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.css';
import Button from '../components/Button';

const Home = () => {

  const router = useRouter();  // useRouterのインスタンスを作成

  // ログインページへの遷移関数
  const handleLogin = () => {
    router.push('/login');  // 'login' ページに遷移
  };

  // 新規登録ページへの遷移関数
  const handleRegister = () => {
    router.push('/register');  // 'register' ページに遷移
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundWave}></div>

        <p className={styles.message}>あっという間に家族と共有</p>
        

        <Image
          className={styles.logo}
          src="/images/HomeLogo.png"
          alt="シェアっと ロゴ"
          width={494}
          height={114}
        />

      <div className={styles.buttonContainer}>
        <Button variant="primary" onClick={handleLogin}>ログイン</Button>  {/* ログインボタン */}
        <Button variant="secondary" onClick={handleRegister}>新規登録</Button>  {/* 新規登録ボタン */}
      </div>

    </div>
  );
};

export default Home;