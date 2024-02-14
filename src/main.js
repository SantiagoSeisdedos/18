import "dotenv/config";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import {
  injectSocketServer,
  onConnection,
} from "./sockets/socket.controller.js";
import { sessions } from "./middlewares/sessions.js";
import { apiRouter } from "./routes/api/api.router.js";
import { webRouter } from "./routes/web/web.router.js";
import { authentication } from "./middlewares/authentication.js";
import { cookies } from "./middlewares/cookies.js";
import { BASE_URL, PORT } from "./config/config.js";
import { connect } from "../db/execution.config.js";

const app = express();

const server = app.listen(PORT, async () => {
  await connect();
  console.log(`Server on port ${PORT}: ${BASE_URL}`);
});

app.use(cookies);
app.engine("handlebars", handlebars.engine());
app.use(sessions);
app.use(authentication);
// app.use(passportInitialize, passportSession);

// Socket.io
const webSocketServer = new Server(server);

// Websocket server
webSocketServer.on("connection", onConnection(webSocketServer));
app.use(injectSocketServer(webSocketServer));

// Public files
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("static"));

// routers
app.use("/", webRouter);
app.use("/api", apiRouter);
