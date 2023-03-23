import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import productsRouter from "./routes/products.router.js";
import cartsRouter from "./routes/cart.router.js";
import chatRouter from "./routes/chat.router.js";
import viewsRouter from "./routes/views.router.js";
import usersRouter from "./routes/users.router.js";
import sessionRouter from "./routes/session.router.js";
import { Server } from "socket.io";
import "./dbConfig.js";
import { messagesModel } from "../src/dao/models/messages.model.js";

//passport
import passport from "passport";
import './passport/passportStrategies.js'

//file session
import FileStore from "session-file-store";
const fileStore = FileStore(session);

//mongo session
import mongoStore from "connect-mongo";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

// Configuración de handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

// Configuración de session
app.use(session({
    store: new mongoStore({
      mongoUrl: 'mongodb+srv://tutta:coderhouse@cluster0.rnglliv.mongodb.net/ecommerce?retryWrites=true&w=majority'
    }),
    resave: false,
    saveUninitialized: false,
    secret: "sessionKey",
    cookie: {maxAge: 10000}
}))

//inicializar passport
app.use(passport.initialize())
//passport va a guardar la info de session
app.use(passport.session())

//rutas
app.use("/api/products", productsRouter);
app.use("/chat", chatRouter);
app.use("/api/cart", cartsRouter);
app.use('/users', usersRouter)
app.use("/views", viewsRouter);
app.use("/api/sessions", sessionRouter);
app.get('/', (req, res)=>{
  res.redirect('/views/login')
})

// ruta session
// app.post("/session", (req, res) => {
//   console.log(req.body) // username - password
//   const { username, password } = req.body;
//   req.session.username = username;
//   req.session.password = password;
//   res.json({ message: "session iniciada con exito" });
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy((error) => {
//     if (error) console.log(error);
//     else console.log('session finalizada');
//   });
// });

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
