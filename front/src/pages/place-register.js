import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/PlaceRegister.module.css';
import axios from 'axios';

const PlaceRegister = () => {
    const [place, setPlace] = useState("");
    const [places, setPlaces] = useState([]);

    const handleAddPlace = async () => {
        if (place.trim() === "") {
            alert("場所を入力してください。");
            return;
        }

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;

                    // 地名と座標を追加
                    const newPlace = { place, latitude, longitude };
                    setPlaces([...places, newPlace]);
                    setPlace("");

                    console.log(places);
                    // サーバーにデータを送信
                    try {
                        const response = await axios.post('http://localhost:5000/api/geo', newPlace, { withCredentials: true });
                        alert(response.data.message);
                    } catch (error) {
                        console.error("データ送信エラー:", error);
                        alert("データの送信に失敗しました。");
                    }
                },
                (error) => {
                    // エラーハンドリング
                    const errorInfo = [
                        "原因不明のエラーが発生しました…。",
                        "位置情報の取得が許可されませんでした…。",
                        "電波状況などで位置情報が取得できませんでした…。",
                        "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
                    ];
                    const errorNo = error.code;
                    alert(`[エラー番号: ${errorNo}]\n${errorInfo[errorNo]}`);
                },
                {
                    enableHighAccuracy: false,
                    timeout: 8000,
                    maximumAge: 2000,
                }
            );
        } else {
            alert("お使いの端末は、GeoLocation APIに対応していません。");
        }
    };

    return (
        <div>
            <header>
                <h1 className={styles.rogo}>シ ェ ア っ と</h1>
                <div className={styles.logout}>
                    <Link href="/logout">
                        <button className={styles.logoutButton}>ログアウト</button>
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
                    {places.map((item, index) => (
                        <li key={index}>
                            {item.place}
                        </li>
                    ))}
                </ol>
            </div>
            <div className={styles.return}>
                <Link href="/MainScene">
                    <button className={styles.returnButton}>戻る</button>
                </Link>
            </div>
        </div>
    );
};

export default PlaceRegister;
