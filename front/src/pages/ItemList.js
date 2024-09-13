import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/ItemList.module.css'; // Make sure this path is correct

export default function Itemlist() {
    const [items, setItems] = useState([
        { id: 1, text: 'リンゴ', quantity: 9 }
    ]);

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className={styles.ItemList}>
            <header>
                <h1 className={styles.rogo}>シ ェ ア っ と</h1>
            </header>
            <h2>ほしいものを追加しよう</h2>
            <div className={styles.inputArea}>
                <input id="add-text" type="text" placeholder="ほしいものを入力" />
                <input id="number" type="number" className={styles.number} placeholder="数" />
                <button id="add-button">追加</button>
            </div>
            <hr />
            <div className={styles.wanntingList}>
                <ol id="wannting-list">
                    {items.map(item => (
                        <li key={item.id}>
                            <div className={styles.listRow}>
                                <p className={styles.wantItem}>{item.text}</p>
                                <p>{item.quantity}個</p>
                                <button className={styles.delete} onClick={() => handleDelete(item.id)}>削除</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className={styles.kettei}>
                <Link href="/mainscene">
                    <button>決定</button>
                </Link>
            </div>
        </div>
    );
};


