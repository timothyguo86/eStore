const express = require("express");
const mysql = require("mysql2");
const app = express();
const PORT = 5001;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1289",
  database: "estore",
  port: 3306,
  multipleStatements: true,
});

app.get("/", (req, res) => {
  // Query to get all categories
  pool.query("select * FROM categories", (err, categories) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(categories);
    }
  });
});

const server = app.listen(PORT, () => {
  console.log("Server is running on port 5001");
});
