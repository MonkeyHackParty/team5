import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Register.module.css';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import useNavigation from '../utils/navigation';

export default function Register() {
  const [familyName, setFamilyName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { navigateToMain } = useNavigation(); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Simple validation
    if (!familyName || !username || !password) {
      setError('すべてのフィールドを入力してください。');
      return;
    }

    try {
      // Simulate backend response
      const response = {
        ok: true,
        json: async () => ({ message: '登録成功しました。' }),
      };

      // Handle the simulated response
      const result = await response.json();
      console.log('登録成功:', result);
      setError('');
      navigateToMain();
    } catch (err) {
      setError('登録に失敗しました。');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backgroundWave}></div>
      <p className={styles.message}>ようこそ</p>
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} className={styles.form}>
        <TextInput
          id="familyName"
          label="ファミリーネーム"
          type="text"
          value={familyName}
          onChange={(e) => setFamilyName(e.target.value)}
          required
          error={familyName === '' && error ? 'ファミリーネームは必須です。' : ''}
        />
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
          <Button type="submit" variant="secondary">新規登録</Button>
          <p className={styles.link}>
        <Link href="/login">アカウントをお持ちの方はこちら</Link>
      </p>
        </div>
      </form>
      
    </div>
  );
}
