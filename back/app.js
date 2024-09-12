var express = require('express');
var app = express();
require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');

// データベース接続の設定
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.use(cors());
app.use(express.json());

// セッション管理の設定
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret_key',
    resave: false,
    saveUninitialized: false,
  })
);

// ログイン済みかどうかを確認するミドルウェア
const isAuthenticated = (req, res, next) => {
  if (req.session.userId) {
    next(); // セッションがある場合、次の処理へ
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

// 新規ユーザーの登録
app.post('/api/new', (req, res) => {
  const family = req.body.family;
  const pwd = req.body.pwd;
  const users = req.body.user;

  users.forEach((user) => {
    bcrypt.hash(pwd, 10, (err, hash) => {
      if (err) throw err;

      connection.query(
        'INSERT INTO login (myname, pwd, family) VALUES (?, ?, ?)',
        [user, hash, family],
        (error, result) => {
          if (error) throw error;
          res.json({ data: result });
        }
      );
    });
  });
});

// ログイン機能の実装
app.post('/api/login', (req, res) => {
  const { myname, pwd } = req.body;

  connection.query(
    'SELECT * FROM login WHERE myname = ?',
    [myname],
    (error, results) => {
      if (error) throw error;

      if (results.length > 0) {
        const hashedPassword = results[0].pwd;

        bcrypt.compare(pwd, hashedPassword, (err, isMatch) => {
          if (err) throw err;

          if (isMatch) {
            // セッションの設定
            req.session.userId = results[0].id;
            req.session.username = myname;
            req.session.family = results[0].family;

            res.json({ message: 'Login successful' });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        });
      } else {
        res.status(401).json({ message: 'User not found' });
      }
    }
  );
});

// ニーズの追加 (ログイン済みユーザーのみ許可)
app.post('/api/needs', isAuthenticated, (req, res) => {
  const { myname, family, need, cnt } = req.body;
  connection.query(
    'INSERT INTO needs (myname, family, need, cnt) VALUES (?, ?, ?, ?)',
    [myname, family, need, cnt],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

// ニーズの更新 (ログイン済みユーザーのみ許可)
app.put('/api/needs/:id', isAuthenticated, (req, res) => {
  const cnt = req.body.cnt;
  const id = req.params.id;
  connection.query(
    'UPDATE needs SET cnt = ? WHERE id = ?',
    [cnt, id],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

// ニーズの削除 (ログイン済みユーザーのみ許可)
app.delete('/api/needs/:id', isAuthenticated, (req, res) => {
  const id = req.params.id;
  connection.query(
    'DELETE FROM needs WHERE id = ?',
    [id],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

// 家族情報の取得 (ログイン済みユーザーのみ許可)
app.get('/api/family', isAuthenticated, (req, res) => {
  const family = req.query.family;
  connection.query(
    'SELECT myname, need, cnt FROM needs WHERE family = ?',
    [family],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

// 個別ニーズの取得 (ログイン済みユーザーのみ許可)
app.post('/api/individual', isAuthenticated, (req, res) => {
  const family = req.body.family;
  connection.query(
    'SELECT myname, need, cnt FROM needs WHERE family = ?',
    [family],
    (error, result) => {
      if (error) return res.status(500).json({ error: 'Database query error' });
      res.json({ data: result });
    }
  );
});

// セッション情報を使ったユーザーのニーズ取得
app.get('/api/myneeds', isAuthenticated, (req, res) => {
  const { family } = req.session;  // セッションからfamily情報を取得
  connection.query(
    'SELECT myname, need, cnt FROM needs WHERE family = ?',
    [family],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});


// 個別ニーズ（ユーザー）の取得
app.post('/api/individual/user', (req, res) => {
  const family = req.body.family;
  connection.query(
    'SELECT myname, need, cnt FROM needs WHERE family = ? ORDER BY myname ASC',
    [family],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

// 個別ニーズ（ニーズ）の取得
app.post('/api/individual/need', (req, res) => {
  const family = req.body.family;
  connection.query(
    'SELECT myname, need, cnt FROM needs WHERE family = ? ORDER BY need ASC',
    [family],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

// ニーズのカウント取得
app.get('/api/individual/cnt', (req, res) => {
  const family = req.query.family;
  connection.query(
    'SELECT myname, need, cnt FROM needs WHERE family = ? ORDER BY cnt ASC',
    [family],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});
//場所を登録
app.post('/api/location', (req, res) => {
  const family = req.body.family;
  const locationname = req.body.location;
  const latitude = req.body.
    connection.query(
      'INSERT INTO location (family,locationname,latitude,longtitude) VALUES (?,?,?,?)',
      [family, locationname, latitude, longtitude],
      (error, result) => {
        if (error) throw error;
        res.json({ data: result });
      })
})



//場所を削除
app.delete('/api/location/:id', (req, res) => {
  const id = req.params.id;
  connection.query(
    'DELETE FROM location WHERE id = ?',
    [id],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

//場所を取得
app.get('/api/location', (req, res) => {
  const family = req.body;
  connection.query(
    'SELECT locationname FROM location WHERE family = ?',
    [family],
    (error, result) => {
      if (error) throw error;
      res.json({ data: result });
    }
  );
});

module.exports = app;