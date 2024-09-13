import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/MainScene.css';


const MainScene = () => {
    const [items, setItems] = useState([
        { id: 1, text: 'リンゴ', quantity: 9 }
    ]);

    const handleDelete = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    return (
        <div className="MainScene">
            <header>
                <h1 className="rogo">シ ェ ア っ と</h1>
                <span className="move-right">
                    <button>ログアウト</button>
                </span>
            </header>
            <div className="space-select">
                <Link to="/place-register">
                    <button type="button">場所を登録</button>
                </Link>
            </div>
            <div>
                <ol>
                    {items.map(item => (
                        <li key={item.id}>
                            <div className="list-row">
                                <p className="todo-item">{item.text}</p>
                                <p>{item.quantity}個</p>
                                <button className="delete" onClick={() => handleDelete(item.id)}>削除</button>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="plus">
                <Link to="/item-list">
                    <button type="button">追加</button>
                </Link>
            </div>
        </div>
    );
};

export default MainScene;
