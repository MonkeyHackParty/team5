import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../styles/MainScene.module.css';
import axios from 'axios';
import Position from './position';

const MainScene = () => {
    const [items, setItems] = useState([]);


    const handleDelete = (id) => {
        console.log("Attempting to delete item with ID:", id); // ID の確認
        if (id === undefined || id === null) {
            console.error("Invalid ID:", id);
            return;
        }
        axios.delete(`http://localhost:5000/api/needs/delete/${id}`, { withCredentials: true })
            .then(() => {
                setItems(items.filter((item) => item.id !== id));
            })
            .catch(error => {
                console.error("Error deleting item:", error);
            });
    };

    const handleLogout = () => {
        axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true })
            .then(() => {
                window.location.href = '/login';
            })
            .catch(error => {
                console.error("Error during logout:", error);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/family', { withCredentials: true })
            .then(response => {
                const res = response.data.data.map((item) => ({
                    id: item.id,
                    text: item.need,
                    quantity: item.cnt
                }));
                setItems(res);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className={styles.MainScene}>
            <header>
                <h1 className={styles.rogo}>シ ェ ア っ と</h1>
                <span className={styles.moveRight}>
                    <button onClick={handleLogout}>ログアウト</button>
                </span>
            </header>
            <Position />
            <div className={styles.spaceSelect}>
                <Link href="/place-register">
                    <button type="button">場所を登録</button>
                </Link>
            </div>
            <div>
                <ol>
                    {items.map((item) => (
                        <li key={item.id}>
                            <div className={styles.listRow}>
                                <p className={styles.todoItem}>{item.text}</p>
                                <p>{item.quantity}個</p>
                                <button
                                    className={styles.delete}
                                    onClick={() => handleDelete(item.id)}
                                >
                                    削除
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className={styles.plus}>
                <Link href="/item-list">
                    <button type="button">追加</button>
                </Link>
            </div>
        </div>
    );
};

export default MainScene;
