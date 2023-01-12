import express from 'express'
import { ProductManager } from './productManager.js'
const app = express()
const productInfo = new ProductManager('products.json')



app.get('/products', async (req,res)=>{
    const {limit} = req.query
    const products = await productInfo.getProducts(limit || 'max')
    res.json({ products })
})

app.get('/products/:idProduct', async (req,res)=>{
    const { idProduct } = req.params
    const product = await productInfo.getProductById(idProduct)
    res.json({ product })
})



const PORT = 8080

app.listen(PORT, ()=>{
    console.log(`escuchando a ${PORT}`)
})


