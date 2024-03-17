import { tokenizeUserInCookie } from "../middlewares/tokens.js";
import {
  authenticateUser,
  deleteAuthToken,
} from "../services/sessions.service.js";

export async function sesionControllerLoginUser(req, res, next) {
  try {
    const user = await authenticateUser(req.body);
    req.user = user;

    if (!user) {
      const error = new Error("Invalid credentials");
      error.code = 401;
      throw error;
    }

    await tokenizeUserInCookie(req, res, next);

    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}

export function sessionControllerLogoutUser(req, res) {
  return deleteAuthToken(req, res);
}
