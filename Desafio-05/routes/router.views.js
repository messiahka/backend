import { Router } from "express";
import ProductManager from "../model/ProductManager.js";
import socketServer from "../app.js";
const router = Router();

//DATOS DESDE HANDLEBARS
router.get("/", async (req, res) => {
  try {
    const productManager = new ProductManager();
    const productos = await productManager.getProducts();
    res.render("home", { productos, titulo:"PRODUCTOS" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DATOS DESDE SOCKET.IO
router.get("/realtimeproducts", async (req, res) => {
  try {
    const productManager = new ProductManager();

    // Obtener data
    const productos = await productManager.getProducts();

    // Enviar data al cliente
    socketServer.on("connection", (socket) => {
      socket.emit("productos", productos);
    });

    // Renderizar vista
    res.render("realTimeProducts", {titulo:"PRODUCTOS.IO"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/realtimeproducts", async (req, res) => {
  try {
    const { title, description, price, thumbnail, code, stock, category } =
      req.body;

    const productManager = new ProductManager();

    // Agregar producto
    await productManager.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      category
    );

    // Obtener data
    const productos = await productManager.getProducts();

    // Enviar data al cliente
    socketServer.sockets.emit("productos", productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
