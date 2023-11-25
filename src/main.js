import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import axios from "axios";

import { apiRouter } from "./routes/api.router.js";
import { webRouter } from "./routes/web.router.js";

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

// Websocket
webSocketServer.on("connection", async (socket) => {
  async function getProducts() {
    return await axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => res.data)
      .catch((err) => alert(err.message));
  }

  async function deleteProduct(id) {
    return await axios
      .delete(`${BASE_URL}/api/products/${id}`)
      .then((res) => res.data)
      .catch((err) => alert(err.message));
  }

  async function addProduct(
    title,
    description,
    price,
    thumbnail,
    code,
    status,
    stock,
    category
  ) {
    return await axios
      .post(`${BASE_URL}/api/products`, {
        title,
        description,
        price,
        thumbnail,
        code,
        status,
        stock,
        category,
      })
      .then((res) => res.data)
      .catch((err) => console.log(err));
  }

  // User Conected
  socket.broadcast.emit("new-user", socket.handshake.auth.username);

  // Get products
  socket.emit("getProducts", await getProducts());

  // Delete product
  socket.on("deleteProduct", async (id) => {
    await deleteProduct(id);
    webSocketServer.emit("getProducts", await getProducts());
  });

  // Add product
  socket.on(
    "addProduct",
    async (
      title,
      description,
      price,
      thumbnail,
      code,
      status,
      stock,
      category
    ) => {
      await addProduct(
        title,
        description,
        parseInt(price),
        thumbnail,
        code,
        status,
        parseInt(stock),
        category
      );
      webSocketServer.emit("getProducts", await getProducts());
    }
  );

  // User Disconected
  socket.on("disconnecting", () => {
    socket.broadcast.emit("user-disconnected", socket.handshake.auth.username);
  });
});
