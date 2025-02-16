const express = require("express");
const app = express();
const productCategories = require("./routes/productCategories");
const PORT = 5001;

app.use("/productCategories", productCategories);

const server = app.listen(PORT, () => {
  console.log("Server is running on port 5001");
});
