import { Router } from "express";
import { productsModel } from "../dao/models/products.model.js";


const router = Router();
// const productManager = new ProductManager("./src/db/productsDB.json");

// router.get("/", async (req, res) => {
//   const products = await productManager.getProducts();
//   res.json({ products });
//  })

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, code , sort="asc"} = req.query;
  if (code) {
    const products = await productsModel.paginate({ code }, { limit, page });
    res.json({ products });
  } else if (sort==="asc"){
    const products = await productsModel.paginate({}, { limit, page, sort: { price: 1 } });
    res.json({ products });
  } else if (sort==="desc") {
    const products = await productsModel.paginate({}, { limit, page, sort: { price: -1 } });
    res.json({ products });
  }
})

// router.get("/", async (req, res) => {
//   const { limit = 10, page = 1, code } = req.query;
//   const sort = { price: -1 }; 
//   const query = code ? { code } : {};
//   const products = await productsModel.paginate(query, { limit, page, sort });
//   res.json({ products });
// });


























 

// router.get("/:sort", async (req, res) => {
//   const { sort } = req.params;
//   if (sort === "asc") {
//     const products = await productsModel.aggregate([
//       {
//         $sort: { price: 1 },
//       },
//     ]);
//     res.json({ products });
//   } else if (sort === "desc") {
//     const products = await productsModel.aggregate([
//       {
//         $sort: { price: -1 },
//       },
//     ]);
//     res.json({ products });
//   }
// });


// router.get('/pagination', async (req, res) => {
//   const {limit=5, page=1} = req.query
//     const users = await productsModel.paginate({}, {limit, page})
//     res.json({users})
// })

// router.get("/products", async (req, res) => {
//   const { limit } = req.query;
//   const products = await productManager.getProducts(limit || "max");
//   res.json({ products });

// });

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productManager.getProductById(id);
  res.json({ product });
});

router.post("/", async (req, res) => {
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const product = await productManager.addProduct({
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  });
  res.json({ message: "Producto agregado", product });
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const product = await productManager.updateProductById(id, {
    title,
    description,
    code,
    price,
    stock,
    category,
    thumbnails,
  });
  res.json({ message: "Producto actualizado", product });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const product = await productManager.deleteProductById(id);
  res.json({ message: "Producto eliminado", product });
});

export default router;
