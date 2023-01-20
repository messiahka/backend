import { Router } from "express";
import { ProductManager } from "../controller/productsController.js";

const productsRouter = Router();
const productManager = new ProductManager("./db/productsDB.json");

productsRouter.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.json({ products });
});

productsRouter.get("/products", async (req, res) => {
  const { limit } = req.query;
  const products = await productManager.getProducts(limit || "max");
  res.json({ products });
});

productsRouter.get("/:pid", async (req, res) => {
  const product = await productManager.getProductById(req.params.pid);
  res.json({ product });
});

productsRouter.post("/", async (req, res) => {
  const product = await req.body;
  const newProduct = await productManager.addProduct(product);
  res.json({ message: "producto creado con éxito", newProduct });
});

productsRouter.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const obj = req.body;
  console.log(id, obj);
  try {
    const updatedProduct = await productManager.updateProductById(id, obj);
    res.json({ message: "producto actualizado con éxito", updatedProduct });
  } catch (error) {
    return error;
  }
});

productsRouter.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const deletedProduct = await productManager.deleteProductById(id);
  res.json({ message: "producto eliminado con éxito", deletedProduct });
});

export default productsRouter;
