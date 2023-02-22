import { CartsModel } from "../models/carts.model.js";

export class CartManager {
  async getCarts() {
    try {
      const carts = await CartsModel.find();
      return carts;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addCart(products) {
    try {
      const newCart = await CartsModel.create(products);
      return newCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartsModel.find({ _id: id });
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  //agregar productos al carrito
  async addProductInCart(cartId, body) {
    try {
      const cart = await CartsModel.findById(cartId);
      const products = body.products;
      console.log("holaaaaa", body);
      console.log(products);
      cart.products = [...cart.products, ...products];
      await cart.save();
      const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart);
      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Eliminar el carrito
  async deleteCart(id) {
    try {
      const cart = await CartsModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Vaciar el carrito
  async emptyCart(id) {
    try {
      const cart = await CartsModel.findById(id);
      cart.products = [];
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  // actualizar cantidad producto de carrito
  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await CartsModel.findById(cartId);
      const productCart = cart.products.find((x) => x.product == productId);
      if (productCart) {
        productCart.quantity = quantity;
      }
      // const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart, {new: true});
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  // Eliminar producto de carrito
  async deleteProductFromCart(cartId, productId) {
    try {
      const cart = await CartsModel.findById(cartId);
      cart.products = cart.products.filter((x) => x.product != productId);
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  //  ME FALTA:

  // - deletear un producto de un carrito

  // async addProductsInCart(cartId, productId) {
  //   try {
  //     const cart = await CartsModel.findById(cartId);
  //     cart.products.push(productId);
  //     cart.save();
  //     return cart;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // }

  // async addProductToCartById(cid, pid, quantity) {
  //     try {
  //         const cart = await CartsModel.findById(cid);
  //         const product = cart.products.find((product) => product._id == pid);
  //         if (product) {
  //             product.quantity += quantity;
  //         } else {
  //             cart.products.push({ _id: pid, quantity: quantity });
  //         }
  //         await cart.save();
  //         return cart;
  //     } catch (error) {
  //         throw new Error(error);
  //     }
  // }

  //   async addProductToCartById(cid, pid, quantity) {
  //     try {
  //       const cart = await CartsModel.findById(cid);
  //       const product = cart.products.find((product) => product._id == pid);
  //       if (product) {
  //         product.quantity += quantity;
  //       } else {
  //         cart.products.push({ _id: pid, quantity: quantity });
  //       }
  //       await cart.save();
  //       return cart;
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}

