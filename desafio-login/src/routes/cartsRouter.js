import { Router } from "express";
import { CartManager } from "../dao/mongoManagers/mongoCartsManager.js";
// import { CartsModel } from '../dao/models/carts.model.js';

const router = Router();
const cartManager = new CartManager("./src/db/cartsDB.json");

router.get("/", async (req, res) => {
  const carts = await cartManager.getCarts();
  res.json({ carts });
});

router.post("/", async (req, res) => {
  const products = await req.body;
  const newCart = await cartManager.addCart(products);
  res.json({ message: "carrito creado con éxito", newCart });
});

//agregar un producto al carrito
router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const products = await req.body;
  const cart = await cartManager.addProductInCart(cid, products);
  res.json({ message: "producto agregado al carrito", cart });
});

// DELETE CARRITO
router.delete("/:cid/", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.deleteCart(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(500).json({ status: "error", error: error.message });
  }
});

// vaciar carrito
router.delete("/:cid/", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.emptyCart(cid);
    res.status(200).json({ status: "success", cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

//actualizar cantidad de un producto en el carrito
router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body; // en el body poner por ejemplo: { "quantity": 2 }
    const cartManager = new CartManager();
    const cart = await cartManager.updateProductQuantity(cid, pid, quantity, {new: true});
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// eliminar un producto del carrito
router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const cart = await cartManager.deleteProductFromCart(cid, pid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// ME FALTA:

// - deletear un producto de un carrito

// router.get("/:cid", async (req, res) => {
//   const { cid } = req.params;
//   const cart = await cartManager.getCartById(cid)
//   if (cart === undefined) {
//     res.json({error: "carrito no encontrado"});
//   } else {
//     res.json({ cart });
//   }
// });

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getCartById(cid);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// agregar un array de productos al carrito
router.put("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const products = req.body;
    console.log(products);
    const cart = await cartManager.addProductsInCart(cid, [products]);
    console.log(cart);
    res.status(200).json({ status: "success", payload: cart });
  } catch (error) {
    res.status(400).json({ status: "error", error: error.message });
  }
});

// router.put("/:cid", async (req, res) => {
//   try {
//     const {cid} = req.params;
//     const products = await req.body;
//     const cart = await cartManager.addProductToCartById(cid, products);
//     res.status(200).json({ status: "success", payload: cart });
//   } catch (error) {
//     res.status(400).json({ status: "error", error: error.message });
//   }
// })

// router.put("/:cid", async (req, res) => {
//   try {
//     const { cid } = req.params;
//     const products = await req.body; // await ?
//     const cart = await cartManager.insertProductsToCart(cid, products);
//     res.status(200).json({ status: "success", payload: cart });
//   } catch (error) {
//     res.status(400).json({ status: "error", error: error.message });
//   }
// });

// cartRouter.get('/', async(req,res) => {
//     const carts = await cartManager.getCarts();
//     res.json({carts});
// });

// cartRouter.get('/:cid', async(req,res) => {
//     const cart = await cartManager.getCartById(req.params.cid);
//     res.json({cart});

// });

// cartRouter.post('/', async(req,res) => {
//     const products = await req.body;
//     const newCart = await cartManager.addCart(products);
//     res.json({message:"carrito creado con éxito",newCart});

// });

// cartRouter.post('/:cid/product/:pid',async(req,res) => {
//   const cid = req.params.cid;
//   const pid = req.params.pid;
//   const quantity = req.body.quantity;
//   const newProduct = await cartManager.addProductToCartById(cid,pid,quantity);
//   res.json({message:"producto agregado con éxito",newProduct});
// });

export default router;
