import { productsModel } from "../models/products.model.js";

export class ProductManager {
  async getProducts(limit) {
    try {
      const products = await productsModel.find();
      if (limit === "max") {
        return products;
      } else {
        return products.slice(0, limit);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(objProduct) {
    try {
      const newProduct = await productsModel.create(objProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async getProductById(id) {
    try {
        const product = await productsModel.findById(id)
        return product
    } catch (error) {
        console.log(error)
    }
  }

    async updateProductById(id, objProduct) {
        try {
            const products = await productsModel.findByIdAndUpdate(id, objProduct, {new: true})
            return products
        } catch (error) {
            console.log(error)
        }
    }

    async deleteProductById(id) {
        try {
            const product = await productsModel.findByIdAndDelete(id)
            return product
        } catch (error) {
            console.log(error)
    }
  }
}
