const express = require("express");
const cors = require("cors");
const app = express();
const products = require("./routes/products");
const productCategories = require("./routes/productCategories");
const users = require("./routes/users");
const PORT = 5001;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json()); // Resolves the data received in the body of the request before it passes to the relevant route
app.use("/products", products);
app.use("/productCategories", productCategories);
app.use("/users", users);

const server = app.listen(PORT, () => {
  console.log("Server is running on port 5001");
});
