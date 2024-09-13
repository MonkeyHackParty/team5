import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/ItemList.css';

const ItemList = () => {
    const [items, setItems] = useState([
        { id: 1, text: 'リンゴ', quantity: 9 }
    ]);

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="ItemList">
            <header>
                <h1 className="rogo">シ ェ ア っ と</h1>
            </header>
            <h2>ほしいものを追加しよう</h2>
            <div className="input-area">
                <input id="add-text" type="text" placeholder="ほしいものを入力" />
                <input id="number" type="number" className="number" placeholder="数" />
                <button id="add-button">追加</button>
            </div>
            <hr />
            <div className="wannting-list">
                <ol id="wannting-list">
                    {items.map(item => (
                        <li key={item.id}>
                            <div className="list-row">
                                <p className="want-item">{item.text}</p>
                                <p>{item.quantity}個</p>
                                <button className="delete" onClick={() => handleDelete(item.id)}>削除</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="kettei">
                <Link to="/">
                    <button>決定</button>
                </Link>
            </div>
        </div>
    );
};

export default ItemList;
