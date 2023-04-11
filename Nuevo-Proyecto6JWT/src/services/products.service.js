import ProductsManager from "../persistencia/productsManager.js";

const productsManager = new ProductsManager();

// export async function getProducts() {
//   try {
//     const products = await productsManager.getProducts();
//     return products;
//   } catch (error) {
//     return new Error(error);
//   }
// }

// export async function getProducts(page, limit) {
//   try {
//     const products = await productsManager.getProducts(page, limit);
//     return products;
//   } catch (error) {
//     return new Error(error);
//   }
// }

export async function findAllProducts(querys) {
  try {
    const {
      limit = 10,
      page = 1,
      lean = true,
      collation = {
        locale: "en",
        strength: 2,
      },
    } = querys;

    const query = {};
    const options = { limit, page, collation, lean };

    Object.keys(querys).forEach((key) => {
      const tags = [
        "title",
        "description",
        "price",
        "stock",
        "code",
        "category",
        "status",
      ];

      if (tags.includes(key.toLowerCase()) && querys[key] != "") {
        query[key] = querys[key];
      }

      if (key == "sort" && querys[key] != "") {
        options[key] = { price: querys[key] == "asc" ? 1 : -1 };
      }
    });


    const products = await productsManager.findAll(query, options);
    return products;
  } catch (error) {
    throw new Error(error);
  }
}


export async function addProduct(objProduct) {
  try {
    const newProduct = await productsManager.addProduct(objProduct);
    return newProduct;
  } catch (error) {
    return new Error(error);
  }
}

export async function getProductById(id) {
  try {
    const product = await productsManager.getProductById(id);
    return product;
  } catch (error) {
    return new Error(error);
  }
}

export async function updateProductById(id, objProduct) {
  try {
    const products = await productsManager.updateProductById(id, objProduct);
    return products;
  } catch (error) {
    return new Error(error);
  }
}

export async function deleteProductById(id) {
  try {
    const product = await productsManager.deleteProductById(id);
    return product;
  } catch (error) {
    return new Error(error);
  }
}
