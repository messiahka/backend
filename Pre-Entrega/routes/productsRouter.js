import { Router } from "express";
import { ProductManager } from "../controller/productsManager.js";


const productsRouter = Router()
const productManager = new ProductManager('./db/productsDB.json')

productsRouter.get('/', async (req, res)=>{
    const products = await productManager.getProducts()
    res.json({ products })
})

productsRouter.get('/products', async (req, res)=>{
    const {limit} = req.query;
    const products = await productManager.getProducts(limit || 'max')
    res.json( {products})
})
// INTENTAR CARGAR ALGOOOOOOO





// app.get('/products', async (req,res)=>{
//     const {limit} = req.query
//     const products = await productInfo.getProducts(limit || 'max')
//     res.json({ products })
// })


export default productsRouter;