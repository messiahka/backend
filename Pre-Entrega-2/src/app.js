import express from "express";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routes/productsRouter.js";
import cartsRouter from "./routes/cartsRouter.js";
import chatRouter from "./routes/chatRouter.js";
import viewsRouter from "./routes/viewsRouter.js";
import { Server } from "socket.io";
import "./dbConfig.js";
import { messagesModel } from "../src/dao/models/messages.model.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

// Configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//rutas
app.use("/api/products", productsRouter);
app.use("/chat", chatRouter);
app.use("/api/cart", cartsRouter);
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Listen server on ${PORT}`);
});

// Configuración de socket.io
const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => {
  console.log("usuario conectado", socket.id);

  socket.on("disconnect", () => {
    console.log("usuario desconectado", socket.id);
  });

  const mensajes = [];

  //chat
  socket.on("mensaje", (info) => {
    mensajes.push(info);
    socketServer.emit("chat", mensajes);
    async function addMessage() {
      try {
        const newMessage = await messagesModel.create(info);
        return newMessage;
      } catch (error) {
        console.log(error);
      }
    }
    addMessage();
    console.log(info);
  });
});

export default socketServer;
