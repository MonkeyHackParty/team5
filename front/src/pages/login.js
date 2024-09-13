// pages/login.js
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Login.module.css'
import Button from '../components/Button';
import useNavigation from '../utils/navigation';
import TextInput from '../components/TextInput';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { navigateToMain } = useNavigation(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // 簡単なバリデーション
    if (!username || !password) {
      setError('すべてのフィールドを入力してください。');
      return;
    }

    try {
      // バックエンドの API エンドポイントに POST リクエストを送信
      // ここで成功するレスポンスをモックする
      const response = {
        ok: true,
        json: async () => ({ message: 'ログイン成功しました。' }),
      };

      // 上記のモックされたレスポンスを `fetch` が返すようにする
      const result = await response.json();
      console.log('ログイン成功:', result);
      setError('');
      // ログイン後に /memo_list ページにリダイレクト
      navigateToMain();
    } catch (err) {
      // エラーメッセージの設定
      setError('ログインに失敗しました。');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundWave}></div>
      <p className={styles.message}>おかえりなさい</p>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput
          id="username"
          label="ユーザー名"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          error={username === '' && error ? 'ユーザー名は必須です。' : ''}
        />
        <TextInput
          id="password"
          label="パスワード"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          error={password === '' && error ? 'パスワードは必須です。' : ''}
        />
        <div className={styles.buttonContainer}>
        <Button type="submit" variant="primary">ログイン</Button>  {/* ログインボタン */}
        </div>
      </form>
      <p className={styles.link}>
         <Link href="/register">アカウントをお持ちでない方はこちら</Link>
      </p>
    </div>
  );
}
