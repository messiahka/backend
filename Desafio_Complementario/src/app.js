import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routes/productsRouter.js";
import "./dbConfig.js";


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("<h1>Bienvenidos al Servidor</h1>");
});

app.use("/api/products", productsRouter);


app.listen(PORT, () => {
  console.log(`Listen server on ${PORT}`);
});
