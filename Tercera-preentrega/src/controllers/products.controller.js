import {
  findAllProducts,
  addProduct,
  getProductById,
  updateProductById,
  deleteProductById
  
} from "../services/products.service.js";


export async function getProducts(req, res) {
    try {
      const products = await findAllProducts(req.query);
      res.json({ msg: "Products", products });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }



export async function createOneProduct(req, res) {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnails
  ) {
    res.status(400).json({ message: "Faltan datos" });
  }

  

  try {
    const newProduct = await addProduct(req.body);
    res.status(201).json({ message: "Producto creado", product: newProduct });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function getOneProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await getProductById(id);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateOneProduct(req, res) {
  const { id } = req.params;
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !stock ||
    !category ||
    !thumbnails
  ) {
    res.status(400).json({ message: "Faltan datos" });
  }
  try {
    const product = await updateProductById(id, req.body);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.status(200).json({ message: "Producto actualizado", product });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteOneProduct(req, res) {
  const { id } = req.params;
  try {
    const product = await deleteProductById(id);
    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.status(200).json({ message: "Producto eliminado", product });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
