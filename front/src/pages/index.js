import React from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Button from '../components/Button';
import useNavigation from '../utils/navigation';  // ナビゲーションユーティリティをインポート

const Home = () => {

  const { navigateToLogin, navigateToRegister } = useNavigation();  // ナビゲーション用のカスタムフックを使用

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
        <Button variant="primary" onClick={navigateToLogin}>ログイン</Button>  {/* ログインボタン */}
        <Button variant="secondary" onClick={navigateToRegister}>新規登録</Button>  {/* 新規登録ボタン */}
      </div>

    </div>
  );
};

export default Home;
