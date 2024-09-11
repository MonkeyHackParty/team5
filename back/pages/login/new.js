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

  module.exports = new;