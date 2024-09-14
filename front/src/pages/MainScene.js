import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/MainScene.module.css';

const MainScene = () => {
    const [items, setItems] = useState([]);

    const handleDelete = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };

    return (
        <div className={styles.MainScene}>
            <header>
                <h1 className={styles.rogo}>シ ェ ア っ と</h1>
                <span className={styles.moveRight}>
                    <button>ログアウト</button>
                </span>
            </header>
            <div className={styles.spaceSelect}>
                <Link href="/place-register">
                    <a>
                        <button type="button">場所を登録</button>
                    </a>
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
                    <a>
                        <button type="button">追加</button>
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default MainScene;