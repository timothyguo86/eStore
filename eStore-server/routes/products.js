const express = require("express");
const products = express.Router();
const pool = require("../shared/pool");

products.get("/", (req, res) => {
  let mainCategoryId = req.query.maincategoryid;
  let subCategoryId = req.query.subcategoryid;
  let keyword = req.query.keyword;

  let query = "select * FROM products";

  if (mainCategoryId) {
    query = `select products.*
             from products,
                  categories
             where products.category_id = categories.id
               and categories.parent_category_id = ${mainCategoryId}`;
  }
  if (subCategoryId) {
    query += ` WHERE category_id = ${subCategoryId}`;
  }
  if (keyword && keyword.length >= 3) {
    query += " and keywords LIKE '%" + keyword + "%'";
  }

  // Query to get all products
  pool.query(query, (err, products) => {
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
  pool.query(
    `select *
       FROM products
       WHERE id = ${id}`,
    (err, products) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(products);
      }
    },
  );
});

module.exports = products;
