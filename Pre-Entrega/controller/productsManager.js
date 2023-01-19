import fs from "fs";

export class ProductManager {
  constructor(path) {
    this.path = path;
  }

  async getProducts(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const infoProducts = await fs.promises.readFile(this.path, "utf-8");
        if (limit === "max") {
          const infoProductsJS = JSON.parse(infoProducts);
          return infoProductsJS;
        } else {
          const infoProductsJS = JSON.parse(infoProducts).slice(0, limit);
          return infoProductsJS;
        }
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async addProduct(
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails
  ) {
    try {
      const product = {
        id: await this.#generateId(),
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: [],
      };
      const products = await this.getProducts();
      products.push(product);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
    } catch (error) {
      throw new Error(error);
    }
  }

  async getProductById(id) {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === parseInt(id));
    if (product === undefined) {
      return console.log("Producto no Encontrado");
    } else {
      return product;
    }
  }

  async updateProductById(id, obj) {
    const products = await this.getProducts();
    const index = products.findIndex((product) => product.id === parseInt(id));
    if (index === -1) {
      throw new Error("Producto no Encontrado");
    } else {
      const updatedProduct = { ...products[index], ...obj };
      products.splice(index, 1, updatedProduct);
      await fs.promises.writeFile(this.path, JSON.stringify(products));
      return updatedProduct;
    }
  }

  async deleteProductById(id) {
    const products = await this.getProducts();
    const product = products.find((product) => product.id === parseInt(id));
    if (product === undefined) {
      return console.log("Producto no encontrado");
    } else {
      const index = products.indexOf(product);
      products.splice(index, 1);
    }
    await fs.promises.writeFile(this.path, JSON.stringify(products));
  }

  async #generateId() {
    const products = await this.getProducts();
    let id = products.length === 0 ? 1 : products[products.length - 1].id + 1;
    return id;
  }
}

const products = [
  {
    id: 1,
    nombre: "Pera",
    Tipo: "Fruta",
  },
  {
    id: 2,
    nombre: "Manzana",
    tipo: "Fruta",
  },
  {
    id: 3,
    nombre: "Tomate",
    tipo: "Verdura",
  },
];

function deletearObj(id) {
  const product = products.find((objeto) => objeto.id === parseInt(id));
  if (product === undefined) {
    return console.log("not Found");
  } else {
    const index = products.indexOf(product);
    products.splice(index, 1);
  }
}

deletearObj(3);

console.log(products);
