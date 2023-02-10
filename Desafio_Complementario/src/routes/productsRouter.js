import { Router } from "express";
// import { ProductManager } from "../dao/fileManagers/productsManager.js";
import  { ProductManager } from "../dao/mongoManagers/mongoProductsManager.js";


const router = Router()
const productManager = new ProductManager('./src/db/productsDB.json')

router.get('/', async (req, res)=>{
    const products = await productManager.getProducts()
    res.json({ products })
})

router.get('/products', async (req, res)=>{
    const {limit} = req.query;
    const products = await productManager.getProducts(limit || 'max')
    res.json( {products})
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    const product = await productManager.getProductById(id)
    res.json({product})
})

router.post('/', async (req, res)=>{
    const {title, description, code, price, stock, category, thumbnails} = req.body;
    const product = await productManager.addProduct({title, description, code, price, stock, category, thumbnails})
    res.json({message: 'Producto agregado', product})
})

router.put('/:id', async (req, res)=>{
    const {id} = req.params
    const {title, description, code, price, stock, category, thumbnails} = req.body;
    const product = await productManager.updateProductById(id, {title, description, code, price, stock, category, thumbnails})
    res.json({message: 'Producto actualizado', product})
})

router.delete('/:id', async (req, res)=>{
    const {id} = req.params
    const product = await productManager.deleteProductById(id)
    res.json({message: 'Producto eliminado', product})
})



export default router;