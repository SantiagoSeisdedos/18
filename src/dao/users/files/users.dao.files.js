// users.dao.files.js
import fs from "fs/promises";
import { User } from "./users.model.files.js";
import { errorStatusMap } from "../../../utils/errorCodes.js";
import { areHashesEqual, hashPassword } from "../../../utils/crypto.js";
import { ADMIN_EMAIL } from "../../../config/config.js";

export class UsersDaoFiles {
  constructor(path) {
    this.path = path;
  }

  async #readUsers() {
    try {
      const { path } = this;
      const userData = JSON.parse(await fs.readFile(path, "utf-8"));
      if (!userData) {
        const error = new Error("No users found");
        error.code = errorStatusMap.NOT_FOUND;
        throw error;
      }
      return userData;
    } catch (error) {
      throw error;
    }
  }

  async #writeUsers(users) {
    try {
      const { path } = this;
      await fs.writeFile(path, JSON.stringify(users, null, 2));
    } catch (error) {
      console.error("#writeUsers DAO.FILE Error: ", error.code || error);
      throw new Error("Error writing users");
    }
  }

  async register(userData) {
    try {
      if (!userData.email || !userData.password) {
        const error = new Error("Missing required fields");
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }
      const users = await this.#readUsers();

      const existingUser = users.find((user) => user.email === userData.email);
      if (existingUser) {
        const error = new Error("User email already exists");
        error.code = errorStatusMap.DUPLICATED_KEY;
        throw error;
      }

      userData.password = hashPassword(userData.password);
      if (userData.email === ADMIN_EMAIL) userData.rol = "admin";
      const newUser = new User(userData);
      users.push(newUser.toPOJO());
      await this.#writeUsers(users);
      return newUser.toPOJO();
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(email) {
    try {
      const users = await this.#readUsers();
      return users.find((user) => user.email === email);
    } catch (error) {
      throw new Error("Error getting current user");
    }
  }

  async getUsers() {
    try {
      return await this.#readUsers();
    } catch (error) {
      throw new Error("Error getting users");
    }
  }

  async authentication(credentials) {
    try {
      const { email, password } = credentials;
      const users = await this.#readUsers();
      const user = users.find((user) => user.email === email);

      if (!user || !areHashesEqual(password, user.password)) {
        const error = new Error("Invalid credentials");
        error.code = errorStatusMap.UNAUTHORIZED;
        throw error;
      }

      return {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        rol: user.rol,
        profilePicture: user.profilePicture,
        cart: user.cart,
      };
    } catch (error) {
      throw error;
    }
  }

  async login(username, password) {
    try {
      const credentials = { username, password };
      const user = await this.authentication(credentials);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
