import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import objConfig from "./config.js";
import usersRouter from './routes/users.router.js'
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'
import viewsRouter from './routes/views.router.js'
import sessionRouter from "./routes/session.router.js";
import './persistencia/mongoDB/dbConfig.js'
import {__dirname} from './dirname.utils.js'
import handlebars from 'express-handlebars'
import passport from 'passport'
import './middlewares/passportStrategies.js'
import mongoStore from "connect-mongo";


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + "/public"));
app.use(cookieParser());

//handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");

//Configuración de session
app.use(session({
    store: new mongoStore({
      mongoUrl: objConfig.uri,
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

app.use('/views', viewsRouter)
app.use('/users', usersRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)
app.use("/api/sessions", sessionRouter);
app.get('/', (req, res)=>{
    res.redirect('/views/login')
  })




const PORT = objConfig.port;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})