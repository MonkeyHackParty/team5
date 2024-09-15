import React, { useState } from "react";
import Link from 'next/link';
import styles from "../styles/item-list.module.css"; // CSS モジュールのパス
import axios from "axios";
import { useRouter } from 'next/router'; // useRouter をインポート

const ItemList = () => {
  const [itemText, setItemText] = useState("");
  const [itemNumber, setItemNumber] = useState("");
  const [items, setItems] = useState([]);
  const router = useRouter(); // useRouter フックの使用

  const handleAddItem = () => {
    if (itemText.trim() === "" || itemNumber.trim() === "") {
      alert("ほしいものと数を両方入力してください。");
      return;
    }

    setItems([...items, { need: itemText, cnt: itemNumber }]);
    setItemText("");
    setItemNumber("");
  };

  const handleDeleteItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      // `withCredentials: true` をリクエストのオプションに追加
      const response = await axios.post('http://localhost:5000/api/needs', items, {
        withCredentials: true  // クッキー（セッションID）をリクエストに含める
      });
      
      console.log("データ送信成功:", response.data);
      
      // データ送信成功後に Mainscene へルーティング
      router.push('/MainScene'); 

    } catch (error) {
      console.error("データ送信に失敗しました:", error);
    }
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
                <p className={styles.wantItem}>{item.need}</p>
                <p>{item.cnt}個</p>
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
          <button onClick={handleSubmit}>決定</button>
      </div>
    </div>
  );
};

export default ItemList;
