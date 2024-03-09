import { Router, json, urlencoded } from "express";
import { sessionsRouter } from "./sessions.router.js";
import { usersRouter } from "./users.router.js";
import { productsRouter } from "./products.router.js";
import { cartsRouter } from "./carts.router.js";
import { messagesRouter } from "./messages.router.js";
import { errorHandler } from "../../middlewares/errorHandler.js";
import { formattedResponses } from "../../middlewares/formattedResponses.js";
import { ordersRouter } from "./orders.router.js";
import { mocksRouter } from "./mocks.router.js";

export const apiRouter = Router();

apiRouter.use(formattedResponses);

apiRouter.use(json());
apiRouter.use(urlencoded({ extended: true }));

apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);

apiRouter.use("/products", productsRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/orders", ordersRouter);

// TODO: Messages
apiRouter.use("/messages", messagesRouter);

apiRouter.use("/mocks", mocksRouter);
apiRouter.use(errorHandler);
