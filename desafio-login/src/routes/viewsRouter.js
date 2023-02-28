import { Router } from "express";
import { ProductManager } from "../dao/mongoManagers/mongoProductsManager.js";
import { productsModel } from "../dao/models/products.model.js";
import { CartsModel } from "../dao/models/carts.model.js";
import { auth, isAdmin, isLogged } from "../middlewares/auth.middleware.js";


const router = Router();

//DATOS DESDE HANDLEBARS

router.get("/admin", auth, isAdmin, async (req, res) => {
  try {
    const productManager = new ProductManager();
    let products = await productManager.getProducts();
    const {limit=10, page=1, category} = req.query //default 10 y 1
    
    if(!category){
      products = await productsModel.find().limit(limit).skip(page-1).lean()
    } else {
      products = await productsModel.find({category}).limit(limit).skip(page-1).lean()
    }
    res.render("adminProducts", { products, titulo: "PRODUCTOS", email: req.session.email, first_name: req.session.first_name, last_name: req.session.last_name, age: req.session.age });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


router.get("/registro", isLogged,(req, res) => {
  res.render("registro");
});

router.get("/errorRegistro", (req, res) => {
  res.render("errorRegistro");
});

router.get("/login", isLogged, (req, res) => {
  res.render("login");
});


router.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});


router.get("/products", auth, async (req, res) => {
  try {
    const productManager = new ProductManager();
    let products = await productManager.getProducts();
    const {limit=10, page=1, category} = req.query //default 10 y 1
    
    if(!category){
      products = await productsModel.find().limit(limit).skip(page-1).lean()
    } else {
      products = await productsModel.find({category}).limit(limit).skip(page-1).lean()
    }
    res.render("products", { products, titulo: "PRODUCTOS", email: req.session.email, first_name: req.session.first_name, last_name: req.session.last_name, age: req.session.age });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
//   try {
//     // /?limit=1&page=1
//     const {limit=10, page=1, category} = req.query //default 10 y 1
//     let products 
//     if(!category){
//       products = await productsModel.find().limit(limit).skip(page-1).lean()
//     }else{
//       products = await productsModel.find({category}).limit(limit).skip(page-1).lean()
//     }
//     console.log(products)
//       res.render('products', {products})
// } catch (error) {
//     console.log(error)
// }
});

router.get('/carts/:cartId', async(req,res) => {
  const {cartId} = req.params
  const cart = await CartsModel.find({_id:cartId}).lean()
  if(!cart){
      res.json({message: 'Cart not found'})
  }else{
      res.render('cart', {cart});
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
