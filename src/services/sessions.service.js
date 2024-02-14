import { daoUsers } from "../dao/daoInstance.js";
import { deleteTokenFromCookie } from "../middlewares/tokens.js";

export async function authenticateUser(credentials) {
  console.log("sessions.service credentials", credentials)
  const user = await daoUsers.authentication(credentials);
  return user;
}

export function deleteAuthToken(req, res, next) {
  deleteTokenFromCookie(req, res, next).json({
    status: "success",
    message: "Token deleted successfully!",
  });
}
