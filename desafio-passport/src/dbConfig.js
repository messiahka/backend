import mongoose from "mongoose";

const URI_MONGO =
  "mongodb+srv://tutta:coderhouse@cluster0.rnglliv.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.set('strictQuery', false)
mongoose.connect(URI_MONGO, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Conectado a la base de datos");
  }
});