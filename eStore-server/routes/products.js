const express = require("express");
const products = express.Router();
const pool = require("../shared/pool");

products.get("/", (req, res) => {
  // Query to get all products
  pool.query("select * FROM products", (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(products);
    }
  });
});

products.get("/:id", (req, res) => {
  let id = req.params.id;
  // Query to get specific product by product id
  pool.query("select * FROM products WHERE id = " + id, (err, products) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(products);
    }
  });
});

module.exports = products;
