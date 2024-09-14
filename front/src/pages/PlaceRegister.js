import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/PlaceRegister.module.css';

const PlaceRegister = () => {
    const [place, setPlace] = useState("");
    const [places, setPlaces] = useState([]);

    const handleAddPlace = () => {
        if (place.trim() === "") {
            alert("場所を入力してください。");
            return;
        }

        setPlaces([...places, place]);
        setPlace("");
    };

    return (
        <div>
            <header>
                <h1 className={styles.rogo}>シ ェ ア っ と</h1>
                <div className={styles.logout}>
                    <Link href="/logout">
                        <a className={styles.logoutButton}>ログアウト</a>
                    </Link>
                </div>
            </header>
            <h2>行きつけの店を登録しよう</h2>
            <div className={styles.touroku}>
                <input
                    className={styles.placeHold}
                    type="text"
                    placeholder="場所を入力"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <button onClick={handleAddPlace}>登録</button>
            </div>
            <hr />
            <div className={styles.placeArea}>
                <ol>
                    {places.map((place, index) => (
                        <li key={index}>{place}</li>
                    ))}
                </ol>
            </div>
            <div className={styles.return}>
                <Link href="/main">
                    <a className={styles.returnButton}>戻る</a>
                </Link>
            </div>
        </div>
    );
};

export default PlaceRegister;