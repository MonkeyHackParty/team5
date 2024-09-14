import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/PlaceRegister.module.css';

export default function PlaceRegister() {
    const [place, setPlace] = useState('');

    const handlePlaceChange = (e) => {
        setPlace(e.target.value);
    };

    const handleRegister = () => {
        // 登録処理
        console.log('登録する場所:', place);
        setPlace('');
    };

    return (
        <div className={styles.PlaceRegister}>
            <header>
                <h1 className={styles.rogo}>シ ェ ア っ と</h1>
            </header>
            <h2>行きつけの店を登録しよう</h2>
            <div className={styles.touroku}>
                <input type="text" placeholder="場所を入力" value={place} onChange={handlePlaceChange} />
                <button onClick={handleRegister}>登録</button>
            </div>
            <div className={styles.return}>
                <Link href="/mainscene">
                    <button>戻る</button>
                </Link>
            </div>
        </div>
    );
};
