import { Router } from "express";

import { sessionsRouter } from "./sessions.router.js";
import { usersRouter } from "./users.router.js";

import { productsRouter } from "./products.router.js";
import { cartsRouter } from "./carts.router.js";
import { messagesRouter } from "./messages.router.js";

export const apiRouter = Router();

// AUTH
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/messages", messagesRouter);
