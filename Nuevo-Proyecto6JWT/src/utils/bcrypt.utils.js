import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import '../config.js'
import objConfig from "../config.js";



export const hashData = async (password) => {
    return bcrypt.hash(password, 10);
}

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword)
}

//Generate token
export const generateToken = async (user) => {
    const token = jwt.sign(user, objConfig.jwtSecret, { expiresIn: "1h" });
    return token;
  };

