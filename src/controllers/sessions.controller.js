import {
  authenticateUser,
  deleteAuthToken,
} from "../services/sessions.service.js";

export async function loginUser(req, res, next) {
  try {
    const user = await authenticateUser(req.body);
    if (!user) {
      const error = new Error("Invalid credentials");
      error.code = 401;
      throw error;
    }

    res.status(201).json({
      status: "success",
      message: "Login successful!",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
}

export function logoutUser(req, res) {
  deleteAuthToken(req, res);
}
