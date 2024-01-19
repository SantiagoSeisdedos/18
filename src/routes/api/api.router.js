import { Router, json, urlencoded } from "express";

import { sessionsRouter } from "./sessions.router.js";
import { usersRouter } from "./users.router.js";

import { productsRouter } from "./products.router.js";
import { cartsRouter } from "./carts.router.js";
import { messagesRouter } from "./messages.router.js";
import { errorStatusMap } from "../../utils/errorCodes.js";

export const apiRouter = Router();

apiRouter.use(json());
apiRouter.use(urlencoded({ extended: true }));

// AUTH
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/messages", messagesRouter);

// Error handler
apiRouter.use((error, req, res, next) => {
  const typeError = Object.keys(errorStatusMap).find(
    (key) => errorStatusMap[key] === error.code
  );
  res.status(error.code).json({
    status: "error",
    message: `${typeError}: ${error.message}`,
  });
});
