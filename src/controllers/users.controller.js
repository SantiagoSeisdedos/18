import { tokenizeUserInCookie } from "../middlewares/tokens.js";
import { usersService } from "../services/users.service.js";

export const UserController = {
  async register(req, res, next) {
    try {
      const user = await usersService.register(req.body);
      req.user = user;
      await tokenizeUserInCookie(req, res, next);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  async getCurrentUser(req, res, next) {
    try {
      const user = await usersService.getCurrentUser(req.user.email);
      const { name, lastName, email, rol, profilePicture, cart } = user;
      console.log("USER: ", user);
      return res.json({ name, lastName, email, rol, profilePicture, cart });
    } catch (error) {
      next(error);
    }
  },

  async getUsers(req, res, next) {
    try {
      const users = await usersService.getUsers();
      return res.json(users);
    } catch (error) {
      next(error);
    }
  },
};
