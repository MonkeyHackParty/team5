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
          src="/images/HomeLogo.png"
          alt="Logo"
          width={1200}
          height={300}
          className={styles.logo}
        />
        
        <div className={styles.buttonContainer}>
          <Button variant="primary" onClick={navigateToLogin}>ログイン</Button>
          <Button variant="secondary" onClick={navigateToRegister}>新規登録</Button>
        </div>
      </div>
  );
};

export default Home;