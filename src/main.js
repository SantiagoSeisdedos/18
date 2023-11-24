import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";

import { apiRouter } from "./routes/api.router.js";
import { webRouter } from "./routes/web.router.js";
import productManager from "./services/ProductManager.js";

export const BASE_URL = "http://localhost:8080";
const app = express();

app.engine("handlebars", handlebars.engine());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(8080, () => {
  console.log(`conectado: ${BASE_URL}`);
});

// Socket.io
const webSocketServer = new Server(server);

// Public files
app.use(express.static("public"));
app.use(express.static("views"));
app.use(express.static("static"));

// routers
app.use("/", webRouter);
app.use("/api", apiRouter);

webSocketServer.on("connection", async (socket) => {
  // User Conected
  socket.broadcast.emit("new-user", socket.handshake.auth.username);

  // Get products
  socket.emit("getProducts", await productManager.getProducts());

  // Delete product
  socket.on("deleteProduct", async (id) => {
    await productManager.deletrProductById(id);
    webSocketServer.emit("getProducts", await productManager.getProducts());
  });

  // Add product
  socket.on(
    "addProduct",
    async (
      title,
      description,
      price,
      code,
      stock,
      status,
      category,
      thumbnail
    ) => {
      await productManager.addProduct(
        title,
        description,
        parseInt(price),
        thumbnail,
        code,
        status,
        parseInt(stock),
        category
      );
      webSocketServer.emit("getProducts", await productManager.getProducts());
    }
  );

  // User Disconected
  socket.on("disconnecting", () => {
    socket.broadcast.emit("user-disconnected", socket.handshake.auth.username);
  });
});

// 02:32:00
