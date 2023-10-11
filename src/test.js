const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

const dbConfig = {
  host: 'localhost',
  port: 3306,
  database: 'Asus_Store',
  user: 'root',
  password: 'Mama4ika12345',
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Eroare la conectarea la MySQL:', err);
  } else {
    console.log('Conectat la MySQL');
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


app.get('/get-data', (req, res) => {
  connection.query('SELECT * FROM pc', (err, results) => {
    if (err) {
      console.error('Eroare la executarea interogării:', err);
      res.status(500).json({ error: 'Eroare la interogare' });
    } else {
      console.log('Rezultatul interogării:', results);
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Serverul rulează la adresa http://localhost:${port}`);
});
