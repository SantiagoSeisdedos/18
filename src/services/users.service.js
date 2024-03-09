import { daoUsers } from "../dao/daoInstance.js";
import { errorStatusMap } from "../utils/errorCodes.js";

class UserService {
  async register(userData) {
    try {
      const newUser = await daoUsers.register(userData);
      if (!newUser) {
        const error = new Error("Missing required fields");
        error.code = errorStatusMap.INCORRECT_DATA;
        throw error;
      }
      return newUser;
    } catch (error) {
      throw error;
    }
  }

  async getCurrentUser(email) {
    try {
      const currentUser = await daoUsers.getCurrentUser(email);
      if (!currentUser) {
        const error = new Error("User not found");
        error.code = errorStatusMap.NOT_FOUND;
        throw error;
      }
      return currentUser;
    } catch (error) {
      throw error;
    }
  }

  async getUsers() {
    try {
      const users = await daoUsers.getUsers();
      if (!users) {
        const error = new Error("No users found");
        error.code = errorStatusMap.NOT_FOUND;
        throw error;
      }
      return users;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(email, userData) {
    try {
      const updatedUser = await daoUsers.updateUser(email, userData);
      if (!updatedUser) {
        const error = new Error("User not found");
        error.code = errorStatusMap.NOT_FOUND;
        throw error;
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

}

export const usersService = new UserService();
