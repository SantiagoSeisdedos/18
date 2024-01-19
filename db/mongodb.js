import mongoose from "mongoose";
import "dotenv/config";

const MONGODB_URL = process.env.MONGODB_URL;

await mongoose.connect(MONGODB_URL);

export { usuariosManager } from "./Usuario.js";
