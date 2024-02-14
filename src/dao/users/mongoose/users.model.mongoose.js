import mongoose from "mongoose";
import { randomUUID } from "node:crypto";

import { areHashesEqual, hashPassword } from "../../../utils/crypto.js";
import { errorStatusMap } from "../../../utils/errorCodes.js";

import {
  ADMIN_EMAIL,
  DEFAULT_USER_AVATAR_PATH,
} from "../../../config/config.js";

const userSchema = new mongoose.Schema(
  {
    _id: { type: String, default: randomUUID },
    name: { type: String, required: true },
    lastName: { type: String, default: "(sin especificar)" },
    email: { type: String, unique: true, required: true },
    age: { type: Number },
    password: { type: String, default: "(no aplica)" },
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    profilePicture: { type: String, default: DEFAULT_USER_AVATAR_PATH },
    cart: {
      type: [
        {
          _id: { type: String, ref: "cart", default: randomUUID },
        },
      ],
      default: "",
    },
  },
  {
    strict: "throw",
    versionKey: false,
    statics: {
      login: async function (email, password) {
        let userData;

        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          userData = {
            email: "admin",
            name: "admin",
            lastName: "admin",
            rol: "admin",
          };
        } else {
          const user = await mongoose
            .model(collection)
            .findOne({ email })
            .lean();

          if (!user) {
            throw new Error("Login failed: Invalid credentials");
          }

          if (!areHashesEqual(password, user["password"])) {
            throw new Error("Login failed: Invalid credentials");
          }

          userData = {
            email: user["email"],
            name: user["name"],
            lastname: user["lastname"],
            rol: "user",
          };
        }
        return userData;
      },
      register: async function (userData) {
        try {
          if (!userData.email || !userData.password) {
            const error = new Error("Missing required fields");
            error.code = errorStatusMap.INCORRECT_DATA;
            throw error;
          }

          userData.password = hashPassword(userData.password);

          if (userData.email === ADMIN_EMAIL) userData.rol = "admin";
          const user = await this.create(userData);

          return user.toObject();
        } catch (error) {
          if (error.code === 11000) {
            const typedError = new Error("User email already exists");
            typedError.code = errorStatusMap.DUPLICATED_KEY;
            throw typedError;
          } else throw error;
        }
      },
      authentication: async function ({ username, password, email }) {
        try {
          const user = await this.findOne({ username });
          if (!user || !areHashesEqual(password, user?.password)) {
            const error = new Error("Invalid credentials");
            error.code = errorStatusMap.UNAUTHORIZED;
            throw error;
          }
          return user.toObject();
        } catch (error) {
          throw error;
        }
      },
    },
  }
);

export default userSchema;
