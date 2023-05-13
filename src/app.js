import ProductManager from "./productManager.js";
import express from "express";

const productManager = new ProductManager("../products.json");
const app = express();
const port = 8080;

app.get("/products", (req, res) => {
  try {
    const limit = req.query.limit;
    const totalProducts = productManager.getProducts();
    if (limit) {
      const partialProducts = totalProducts.slice(0, limit);
      res.status(200).send({ status: "succes", data: partialProducts });
    } else {
      res.status(200).send({ status: "succes", data: totalProducts });
    }
  } catch (error) {
    res.status(401).send(error);
  }
});

app.get("/products/:id", (req, res) => {
  try {
    const pid = parseInt(req.params.id);
    const productId = productManager.getProductById(pid);
    if (productId) {
      res.status(200).send({ status: "succes", data: productId });
    } else {
      res
        .status(404)
        .send({ status: "not found", data: "the objet does not exist" });
    }
  } catch (error) {
    res.status(404).send(error);
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
