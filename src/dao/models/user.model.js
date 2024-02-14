// import mongoose from "mongoose";
// import { randomUUID } from "node:crypto";
// import { areHashesEqual, hashPassword } from "../../utils/crypto.js";
// import { errorStatusMap } from "../../utils/errorCodes.js";

// import { DEFAULT_USER_AVATAR_PATH, ADMIN_EMAIL } from "../../config/config.js";

// const collection = "users";

// const schema = new mongoose.Schema(
//   {
//     _id: { type: String, default: randomUUID },
//     name: { type: String, required: true },
//     lastName: { type: String, default: "(sin especificar)" },
//     email: { type: String, unique: true, required: true },
//     age: { type: Number },
//     password: { type: String, default: "(no aplica)" },
//     rol: { type: String, enum: ["admin", "user"], default: "user" },
//     profilePicture: { type: String, default: DEFAULT_USER_AVATAR_PATH },
//     cart: {
//       type: [
//         {
//           _id: { type: String, ref: "cart", default: randomUUID },
//         },
//       ],
//       default: "",
//     },
//   },
//   {
//     strict: "throw",
//     versionKey: false,
//     statics: {
//       login: async function (email, password) {
//         let userData;

//         if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
//           userData = {
//             email: "admin",
//             name: "admin",
//             lastName: "admin",
//             rol: "admin",
//           };
//         } else {
//           const user = await mongoose
//             .model(collection)
//             .findOne({ email })
//             .lean();

//           if (!user) {
//             throw new Error("Login failed: Invalid credentials");
//           }

//           if (!areHashesEqual(password, user["password"])) {
//             throw new Error("Login failed: Invalid credentials");
//           }

//           userData = {
//             email: user["email"],
//             name: user["name"],
//             lastname: user["lastname"],
//             rol: "user",
//           };
//         }
//         return userData;
//       },
//       register: async function (userData) {
//         try {
//           if (!userData.email || !userData.password)
//             throw new Error("INCORRECT_DATA: Missing required fields");

//           userData.password = hashPassword(userData.password);
//           if (userData.email === ADMIN_EMAIL) userData.rol = "admin";
//           const user = await this.create(userData);
//           return user.toObject();
//         } catch (error) {
//           const typedError = new Error(error.message);
//           typedError.code =
//             error.code === 11000
//               ? errorStatusMap.DUPLICATED_KEY
//               : errorStatusMap.UNEXPECTED_ERROR;
//           throw typedError;
//         }
//       },
//       authentication: async function ({ username, password }) {
//         console.log("username", username);
//         console.log("password", password);
//         try {
//           const user = await this.findOne({ username });
//           console.log("user", user);
//           if (!user || !areHashesEqual(password, user?.password)) {
//             console.log("!user _ _ _ ");
//             const error = new Error("Invalid credentials");
//             error.code = errorStatusMap.UNAUTHORIZED;
//             throw error;
//           }
//           return user.toObject();
//         } catch (error) {
//           throw error;
//         }
//       },
//     },
//   }
// );

// export const userModel = mongoose.model(collection, schema);
