import { errorStatusMap } from "../utils/errorCodes.js";

export function isAuthenticated(req, res, next) {
  console.log("req.body =>", req.body);
  // if (!req.isAuthenticated()) {
  //   return res
  //     .status(403)
  //     .json({ status: "error", message: "You are not authenticated" });
  // }
  next();
}

export function isAuthorized(roles) {
  return async function (req, res, next) {
    console.log("EEE E E EisAuthorized =>", req.user, "roles =>", roles);
    const { rol } = req.user;
    if (roles.includes(rol)) {
      console.log("isAuthorized =>", true, "roles =>", roles);
      return next();
    }
    const typedError = new Error("You are not authorized");
    typedError.code = errorStatusMap.FORBIDDEN;
    next(typedError);
  };
}
