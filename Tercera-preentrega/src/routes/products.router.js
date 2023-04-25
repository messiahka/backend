import { Router } from "express";
import { getProducts, createOneProduct, getOneProduct, updateOneProduct, deleteOneProduct } from "../controllers/products.controller.js";

const router = Router();

router.get('/', getProducts);
router.post('/', createOneProduct);
router.get('/:id', getOneProduct);
router.put('/:id', updateOneProduct);
router.delete('/:id', deleteOneProduct);




export default router