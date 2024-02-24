import { errorStatusMap } from "../utils/errorCodes.js";

export function isAuthenticated(req, res, next) {
  // if (!req.isAuthenticated()) {
  //   return res
  //     .status(403)
  //     .json({ status: "error", message: "You are not authenticated" });
  // }
  next();
}

export function isAuthorized(roles) {
  return async function (req, res, next) {
    const { rol } = req.user;
    if (roles.includes(rol)) {
      return next();
    }
    const typedError = new Error("You are not authorized");
    typedError.code = errorStatusMap.FORBIDDEN;
    next(typedError);
  };
}
