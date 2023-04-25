import mongoose from "mongoose";
import objConfig from "../../config.js";

const URI = objConfig.uri;

try {
    await mongoose.connect(URI)
    console.log("DB connected");
} catch (error) {
    console.log(error);
}