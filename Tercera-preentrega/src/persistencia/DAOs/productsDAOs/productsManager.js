import { ProductsModel } from "../../mongoDB/models/products.model.js";

export default class ProductsManager {
  async findAll(query, options) {
    try {
      const newProduct = ProductsModel.paginate(query, options)
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(objProduct) {
    try {
      const newProduct = await ProductsModel.create(objProduct);
      return newProduct;
    } catch (error) {
      return new Error(error);
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductsModel.findById(id);
      return product;
    } catch (error) {
      return new Error(error);
    }
  }

  async updateProductById(id, objProduct) {
    try {
      const products = await ProductsModel.findByIdAndUpdate(id, objProduct, {
        new: true,
      });
      return products;
    } catch (error) {
      return new Error(error);
    }
  }

  async deleteProductById(id) {
    try {
      const product = await ProductsModel.findByIdAndDelete(id);
      return product;
    } catch (error) {
      return new Error(error);
    }
  }

  
}


