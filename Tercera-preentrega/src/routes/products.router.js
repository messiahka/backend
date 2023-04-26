import { Router } from "express";
import productsController from "../controllers/products.controller.js";
//ACTIVAR DESPUES
// import { isAdminAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/:pid", productsController.getProductById);
//AGREGAR LUEGO isAdminAuth
router.post("/", productsController.addProduct);
router.put("/:pid", productsController.updateProduct);
router.delete("/:pid", productsController.deleteProduct);

export default router;
