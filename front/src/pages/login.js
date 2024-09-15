// pages/login.js
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Login.module.css';
import Button from '../components/Button';
import useNavigation from '../utils/navigation';
import TextInput from '../components/TextInput';
import axios from 'axios';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { navigateToMainScene } = useNavigation(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !password) {
      setError('すべてのフィールドを入力してください。');
      return;
    }

    try {
      const submitdata = { myname: username, pwd: password };

      const response = await axios.post('http://localhost:5000/api/login', submitdata,{withCredentials: true});
      
      if (response.data && response.data.message === 'Login successful') {
        console.log('ログイン成功:', response.data);
        setError('');
        navigateToMainScene();
      } else {
        setError('ログインに失敗しました。');
      }
    } catch (err) {
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
          <Button type="submit" variant="primary">ログイン</Button>
          <p className={styles.link}>
            <Link href="/register">アカウントをお持ちでない方はこちら</Link>
          </p>
        </div>
      </form>
    </div>
  );
}
