import { CartsModel } from "../../mongoDB/models/carts.model.js";

export default class CartManager {
  async getCarts() {
    try {
      const carts = await CartsModel.find().lean()
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
      return new Error(error);
    }
  }

  async updateCart(id, product) {
    try {
      const updatedCart = await CartsModel.findByIdAndUpdate(id, product, {new: true});
      return updatedCart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCartById(id) {
    try {
      const cart = await CartsModel.findOne(id).lean()
      return cart;
    } catch (error) {
      return new Error(error);
    }
  }

  //agregar productos al carrito
  async addProductInCart(cartId, body) {
    try {
      const cart = await CartsModel.findById(cartId);
      const products = body.products;
      cart.products = [...cart.products, ...products];
      await cart.save();
      const updatedCart = await CartsModel.findByIdAndUpdate(cartId, cart);
      return updatedCart;
    } catch (error) {
      return new Error(error);
    }
  }

  //eliminar el carrito
  async deleteCart(id) {
    try {
      const cart = await CartsModel.findByIdAndDelete(id);
      return cart;
    } catch (error) {
      return new Error(error);
    }
  }

  //Vaciar el carrito
  async emptyCart(id) {
    try {
      const cart = await CartsModel.findById(id);
      cart.products = [];
      await cart.save();
    } catch (error) {
      return new Error(error);
    }
  }

  //actualizar cantidad de productos de carrito
  async updateProductQuantity(cartId, productId, quantity) {
    try {
      const cart = await CartsModel.findById(cartId);
      const productCart = cart.products.find(
        (product) => product.product == productId
      );
      if (productCart) {
        productCart.quantity = quantity;
      }
      await cart.save();
      return cart;
    } catch (error) {
      return new Error(error);
    }
  }

  //eliminar producto del carrito
    async deleteProductFromCart(cartId, productId) {
        try {
            const cart = await CartsModel.findById(cartId);
            cart.products = cart.products.filter(product => product.product != productId);
            await cart.save();
            return cart;
        } catch (error) {
            return new Error(error);
        }
    }

    async markCartAsPurchased(cartId) {
      return await CartsModel.findByIdAndUpdate(cartId, { purchased: true });
    }
}
