import CartManager from "../persistencia/DAOs/cartsDAOs/cartsManager.js";

const cartManager = new CartManager();

export const findAllCarts = async () => {
  try {
    const carts = await cartManager.getCarts();
    return carts;
  } catch (error) {
    throw new Error(error);
  }
};

export const addCart = async (obj) => {
  try {
    const cart = await cartManager.addCart(obj);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const getCartById = async (id) => {
  try {
    const cart = await cartManager.getCartById({ _id: id });
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCart = async (id, obj) => {
  try {
    const cart = await cartManager.getCartById({ _id: id });
    // console.log('carrito service',cart);
    cart.products.push(obj);
    const updatedCart = await cartManager.updateCart(id, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteCartById = async (id) => {
  try {
    const cart = await cartManager.deleteCart(id);
    return cart;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProductInCart = async (cid, pid, product) => {
  try {
    const cart = await cartManager.getCartById({ _id: cid });
    cart.products.map((prod) => {
      if (prod.product.toString() == pid.toString()) {
        prod.quantity = product.quantity;
      }
      return prod;
    });

    const updatedCart = await cartManager.updateCart(cid, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteProductByIdInCart = async (cid, pid) => {
  try {
    const cart = await cartManager.getCartById({ _id: cid });
    cart.products = cart.products.filter(
      (prod) => prod.product.toString() !== pid.toString()
    );
    const updatedCart = await cartManager.updateCart(cid, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteAllProductByIdInCart = async (cid) => {
  try {
    const cart = await cartManager.getCartById({ _id: cid });
    cart.products = [];
    const updatedCart = await cartManager.updateCart(cid, cart);
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};

export const purchasedCart = async (cid) => {
  try {
    const cart = await cartManager.getCartById({ _id: cid });
    // cart.purchased = true;
    const updatedCart = await cartManager.updateCart(cid, { purchased: true });
    return updatedCart;
  } catch (error) {
    throw new Error(error);
  }
};


