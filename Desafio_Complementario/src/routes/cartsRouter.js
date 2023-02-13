import {Router} from 'express';
import { CartManager } from '../controller/cartsController.js';

const cartRouter = Router();
const cartManager = new CartManager('./db/cartsDB.json');

cartRouter.get('/', async(req,res) => {
    const carts = await cartManager.getCarts();
    res.json({carts});  
});

cartRouter.get('/:cid', async(req,res) => {
    const cart = await cartManager.getCartById(req.params.cid);
    res.json({cart});
  
});

cartRouter.post('/', async(req,res) => {
    const products = await req.body;
    const newCart = await cartManager.addCart(products);
    res.json({message:"carrito creado con éxito",newCart});
  
});

cartRouter.post('/:cid/product/:pid',async(req,res) => {
  const cid = req.params.cid;
  const pid = req.params.pid;
  const quantity = req.body.quantity;
  const newProduct = await cartManager.addProductToCartById(cid,pid,quantity);
  res.json({message:"producto agregado con éxito",newProduct});
});



export default cartRouter;