var express = require('express');
var app = express();
require('dotenv').config();
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');


//mail(捨てアカ)アカ
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shiyanshiyan553@gmail.com',
    pass: 'vbkv wiol uqhw yhjc'
  }
});

// データベース接続の設定
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect(error => {
  if (error) {
    console.error('Database connection failed:', error.stack);
    return;
  }
  console.log('Connected to database.');
});



app.use(cors({
  origin: 'http://localhost:3000', // フロントエンドのURL
  credentials: true // クッキーを許可
}));

app.use(express.json());

// セッション管理の設定
app.use(
  session({
    name: "backend_session",
    secret: process.env.SESSION_SECRET || 'default_secret_key',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false, // HTTPSの場合に有効化
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000 // クッキーの有効期限 (1日)
    }
  })
);


// ログイン済みかどうかを確認するミドルウェア
const isAuthenticated = (req, res, next) => {
  console.log(req.session);
  if (req.session.userId) {
    next(); // セッションがある場合、次の処理へ
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
};

// 新規ユーザーの登録
app.post('/api/new', (req, res) => {
  const { family, pwd, user } = req.body;

  // リクエストボディのバリデーション
  if (!family || !pwd || !user) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  //console.log(req.body);

  bcrypt.hash(pwd, 10, (err, hash) => {
    if (err) {
      console.error('Error hashing password:', err);
      return res.status(500).json({ error: 'Server error' });
    }

    connection.query(
      'INSERT INTO users (myname, pwd, family) VALUES (?, ?, ?)',
      [user, hash, family],
      (error, result) => {
        if (error) {
          console.error('Error inserting data:', error);
          return res.status(500).json({ error: 'Server error' });
        }
        //console.log(1);
        res.json({ data: result });
      }
    );
  });
});

// ログイン機能の実装
app.post('/api/login', (req, res) => {
  const { myname, pwd } = req.body;

  //console.log(req.body);

  connection.query(
    'SELECT * FROM users WHERE myname = ?',
    [myname],
    (error, results) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      if (results.length > 0) {
        const hashedPassword = results[0].pwd;

        bcrypt.compare(pwd, hashedPassword, (err, isMatch) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Internal server error' });
          }

          if (isMatch) {
            console.log("ok");
            req.session.userId = results[0].id;
            req.session.username = myname;
            req.session.family = results[0].family;
            console.log(req.session);

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

// ログアウト機能の実装
app.post('/api/logout', (req, res) => {
  // セッションを破棄する
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Failed to logout' });
    }

    // クッキーをクリアする
    res.clearCookie('backend_session'); // セッションクッキーの名前を指定
    res.json({ message: 'Logout successful' });
  });
});


// ニーズの追加 (ログイン済みユーザーのみ許可)
app.post('/api/needs', isAuthenticated, (req, res) => {
  console.log('Session at /api/needs:', req.session);
  const responsedata = req.body;
  const myname = req.session.username;
  const family = req.session.family;

  console.log(responsedata);

  // 使用するSQLのプレースホルダーの準備
  const sql = 'INSERT INTO needs (myname, family, need, cnt) VALUES ?';

  // データを変換してSQL用の配列にする
  const values = responsedata.map(item => [myname, family, item.need, item.cnt]);

  // クエリ実行
  connection.query(sql, [values], (error, result) => {
    if (error) {
      console.error("データベースエラー:", error);
      return res.status(500).json({ error: "データベースエラー" });
    }
    res.json({ data: result });
  });
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
app.delete('/api/needs/delete/:id', isAuthenticated, (req, res) => {
  const deleteid = req.params.id;
  console.log(deleteid);
  connection.query(
    'DELETE FROM needs WHERE id = ?',
    [deleteid],
    (error, result) => {
      if (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      res.json({ data: result });
    }
  );
});


// 家族情報の取得 (ログイン済みユーザーのみ許可)
app.get('/api/family', isAuthenticated, (req, res) => {
  const family = req.session.family;
  console.log(family);
  console.log(9);
  connection.query(
    'SELECT id, myname, need, cnt FROM needs WHERE family = ?',
    [family],
    (error, result) => {
      if (error) throw error;
      console.log(result);
      res.json({ data: result });
    }
  );
});


//mailsubmit
const submitmail = (req) => {
  const family = req.session.family;

  connection.query('SELECT * FROM needs WHERE family = ?', [family], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      return;
    }

    // クエリ結果が空でない場合にメールを送信
    if (results.length > 0) {

      const mailOptions = {
        from: 'shiyanshiyan553@gmail.com',
        to: 's9148492@gmail.com',
        subject: 'stackがあります',
        text: '家族の人がなにか欲しがっていますよ!!'
      };


      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log('Error:', error);
        }
        console.log('Email sent:', info.response);
      });
    } else {
      console.log('No records found.');
    }
  });
};


//ここから位置情報
//dbにいれこみ
app.post('/api/geo', (req, res) => {
  const { latitude, longitude, place } = req.body;
  const family = req.session.family;

  connection.query(
    'INSERT INTO location (place, latitude, longitude, family) VALUES (?, ?, ?, ?)',
    [place, latitude, longitude, family],
    (error, result) => {
      if (error) {
        console.error('データベースエラー:', error);
        return res.status(500).json({ message: 'データベースエラー' });
      }
      res.status(200).json({ message: 'データが送信されました。' });
    }
  );
});

//cal
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // 地球の半径（km）

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // 距離（km）

  return distance;
}

app.post('/api/location', (req, res) => {
  const { latitude, longitude } = req.body.location;
  const family = req.session.family;

  console.log(req.body);
  console.log(family, "family");

  // 緯度と経度を数値に変換
  const userLat = parseFloat(latitude);
  const userLon = parseFloat(longitude);

  connection.query(
    'SELECT * FROM location WHERE family = ?',
    [family],
    (error, results) => {
      if (error) {
        console.error('Error fetching location data:', error);
        return res.status(500).send('Error occurred while fetching location data');
      }

      console.log(results);

      let isCheck = false;

      results.forEach((position) => {
        const x = parseFloat(position.latitude);
        const y = parseFloat(position.longitude);

        // ユーザーの位置情報とデータベースの位置情報で距離を計算
        const distance = calculateDistance(x, y, userLat, userLon);

        console.log(distance);
        if (distance < 0.5) { // 距離が0.5km以内なら
          isCheck = true;
        }
      });

      if (isCheck) {
        console.log("ok");
        submitmail(req, (error) => {
          if (error) {
            return res.status(500).send('Failed to send email');
          }
          return res.status(200).send('Location is within range');
        });
      } else {
        return res.status(200).send('Location is outside range');
      }
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

module.exports = app;