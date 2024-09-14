import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/ItemList.module.css'; // Make sure this path is correct

const ItemList = () => {
    const [itemText, setItemText] = useState("");
    const [itemNumber, setItemNumber] = useState("");
    const [items, setItems] = useState([]);

    const handleAddItem = () => {
        if (itemText.trim() === "" || itemNumber.trim() === "") {
            alert("ほしいものと数を両方入力してください。");
            return;
        }

        setItems([...items, { text: itemText, number: itemNumber }]);
        setItemText("");
        setItemNumber("");
    };

    const handleDeleteItem = (index) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div>
            <header>
                <h1 className={styles.rogo}>シ ェ ア っ と</h1>
                <div className={styles.logout}>
                    <form action="/logout">
                        <button className={styles.logoutButton}>ログアウト</button>
                    </form>
                </div>
            </header>
            <p className={styles.user}>ユーザー名</p>
            <h2>ほしいものを追加しよう</h2>
            <div className={styles.inputArea}>
                <input
                    className={styles.textHold}
                    id="add-text"
                    type="text"
                    placeholder="ほしいものを入力"
                    value={itemText}
                    onChange={(e) => setItemText(e.target.value)}
                />
                <input
                    id="number"
                    type="number"
                    className={styles.number}
                    placeholder="数"
                    value={itemNumber}
                    onChange={(e) => setItemNumber(e.target.value)}
                />
                <button id="add-button" onClick={handleAddItem}>
                    追加
                </button>
            </div>
            <hr />
            <div className={styles.wantingList}>
                <ol id="wannting-list">
                    {items.map((item, index) => (
                        <li key={index}>
                            <div className={styles.listRow}>
                                <p className={styles.wantItem}>{item.text}</p>
                                <p>{item.number}個</p>
                                <button
                                    className={styles.delete}
                                    onClick={() => handleDeleteItem(index)}
                                >
                                    削除
                                </button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className={styles.kettei}>
                <a href="/main">
                    <button>決定</button>
                </a>
            </div>
        </div>
    );
};

export default ItemList;