import fs from "fs";

class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./db/productos.json";
    this.id = 1;
  }

  //Generate ID
  #generateId() {
    return this.products.length != 0
      ? this.products[this.products.length - 1].id + 1
      : this.id;
  }

  //Add new
  async addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category
  ) {
    try {
      this.products = await this.getProducts();
      const newProduct = {};

      if (
        !this.products.some((x) => x.code === code) &&
        ![title, description, price, code, stock, category].some(
          (y) => y === "" || y === undefined
        )
      ) {
        newProduct.id = this.#generateId();
        newProduct.code = code;
        newProduct.title = title;
        newProduct.description = description;
        newProduct.price = price;
        newProduct.thumbnail = [];
        
        if(Array.isArray(thumbnail))
          thumbnail.forEach((x) => newProduct.thumbnail.push(x));
        else
        newProduct.thumbnail.push(thumbnail);

        newProduct.stock = stock;
        newProduct.category = category;
        newProduct.status = true;

        this.products.push(newProduct);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(this.products, null, 2),
          "utf-8"
        );

        return newProduct;
      }

      return false;
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get all
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const infoProductos = await fs.promises.readFile(this.path, "utf-8");
        this.products = await JSON.parse(infoProductos);
        return this.products;
      } else {
        return [];
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  //Get by ID
  async getProductById(id) {
    try {
      this.products = await this.getProducts();
      const product = this.products.find((x)=> x.id === parseInt(id))
      if(product === undefined) {
        return console.log("Not Found")
      } else {
        return product
      }
       
    } catch (error) {
      throw new Error(error);
    }
  }

  //Update
  async updateProductById(id, obj) {
    this.products = await this.getProducts();
    const index = this.products.findIndex((x) => x.id === parseInt(id));
    if (index === -1) {
      throw new Error("Not Found");
  } else {
    const updatedProduct = { ...this.products[index], ...obj };
    this.products.splice(index, 1, updatedProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
    return updatedProduct;
  }
}
  

  //Delete
  async deleteProductById(id) {
    this.products = await this.getProducts();
    const product = this.products.find((x) => x.id === parseInt(id));
    if (product === undefined) {
      return console.log("Not Found");
    } else {
      const index = this.products.indexOf(product);
      this.products.splice(index, 1);
    }
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2))
  }
  
}

export default ProductManager;



