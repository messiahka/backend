import { Router } from "express";
import { getCart, postCart, putCart, deleteCart, putProductInCart, deleteProductInCart, deleteProductsInCart} from "../controllers/carts.controller.js";

const router = Router();

// Ver carrito
router.get("/:cid", getCart);

// Crear un carrito
router.post("/", postCart);

// Agregar un producto o arreglo de productos al carrito
router.post("/:cid", putCart);

// Eliminar carrito
router.delete("/:cid/", deleteCart);

// Actualizar un producto del carrito
router.put("/:cid/product/:pid", putProductInCart);

// Eliminar un producto del carrito
router.delete("/:cid/product/:pid", deleteProductInCart);

// Vaciar el carrito
router.delete("/:cid/product", deleteProductsInCart);

export default router;