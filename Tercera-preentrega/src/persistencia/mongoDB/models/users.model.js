import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  full_name: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    required: true,
    default: "user",
  },
});

export const UsersModel = mongoose.model("Users", usersSchema);
