// components/TextInput.js
import React from 'react';
import styles from './TextInput.module.css'; // スタイルシートを適用

const TextInput = ({ id, label, type, value, onChange, required, error }) => {
  return (
    <div className={styles.inputContainer}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={styles.input}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextInput;
