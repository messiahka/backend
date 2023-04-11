import { Router } from "express";
import  ProductManager  from '../persistencia/productsManager.js'
import { ProductsModel } from "../persistencia/models/products.model.js";
import { CartsModel } from "../persistencia/models/carts.model.js";
import { isLogged } from "../middlewares/auth.middleware.js";
// import { auth, isAdmin, isLogged, jwtValidation } from "../middlewares/auth.middleware.js";

const router = Router();



// router.get("/", (req, res) => {
//   res.render("products");
// })


//DATOS DESDE HANDLEBARS

router.get("/admin", async (req, res) => {
  res.render("adminPerfil", { email: req.session.email });
});

router.get("/adminProducts", async (req, res) => {
  try {
    const productManager = new ProductManager();
    let products = await productManager.findAll();
    const { limit = 20, page = 1, category } = req.query; //default 10 y 1

    if (!category) {
      products = await ProductsModel
        .find()
        .limit(limit)
        .skip(page - 1)
        .lean();
    } else {
      products = await ProductsModel
        .find({ category })
        .limit(limit)
        .skip(page - 1)
        .lean();
    }
    res.render("adminProducts", {
      products,
      email: req.session.email,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      age: req.session.age,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/registro", isLogged,(req, res) => {
  res.render("registro");
});

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

router.get("/login", isLogged,(req, res) => {
  res.render("login");
});

router.get("/perfil", async (req, res) => {
  res.render("perfil", { email: req.session.email });
});

router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

router.get("/products", async (req, res) => {
  try {
    const productManager = new ProductManager();
    let products = await productManager.findAll();
    const { limit = 20, page = 1, category } = req.query; //default 10 y 1

    if (!category) {
      products = await ProductsModel
        .find()
        .limit(limit)
        .skip(page - 1)
        .lean();
    } else {
      products = await ProductsModel
        .find({ category })
        .limit(limit)
        .skip(page - 1)
        .lean();
    }
    res.render("products", {
      products,
      email: req.session.email,
      first_name: req.session.first_name,
      last_name: req.session.last_name,
      age: req.session.age,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/carts/:cartId", async (req, res) => {
  const { cartId } = req.params;
  const cart = await CartsModel.find({ _id: cartId }).lean();
  if (!cart) {
    res.json({ message: "Cart not found" });
  } else {
    res.render("cart", { cart });
  }
});

//DATOS DESDE SOCKET.IO
// router.get("/realtimeproducts", async (req, res) => {
//   try {
//     const productManager = new ProductManager();

//     // Obtener data
//     const productos = await productManager.getProducts();

//     // Enviar data al cliente
//     socketServer.on("connection", (socket) => {
//       socket.emit("productos", productos);
//     });

//     // Renderizar vista
//     res.render("realTimeProducts", {titulo:"PRODUCTOS.IO"});
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post("/realtimeproducts", async (req, res) => {
//   try {
//     const { title, description, price, thumbnail, code, stock, category } =
//       req.body;

//     const productManager = new ProductManager();

//     // Agregar producto
//     await productManager.addProduct(
//       title,
//       description,
//       price,
//       thumbnail,
//       code,
//       stock,
//       category
//     );

//     // Obtener data
//     const productos = await productManager.getProducts();

//     // Enviar data al cliente
//     socketServer.sockets.emit("productos", productos);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

export default router;
