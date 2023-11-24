import { Router } from "express";
import { upload } from "../middlewares/middlewares.js";

export const webRouter = Router();

webRouter.get("/", (req, res) => {
  try {
    res.render("index.handlebars", { title: "Home" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error loading home" });
  }
});

webRouter.get("/realTimeProducts", (req, res) => {
  try {
    console.log("Cliente conectado");
    res.render("realTimeProducts.handlebars", { title: "Real Time Products" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error loading products" });
  }
});

webRouter.get("/images", (req, res) => {
  try {
    res.render("images.handlebars", { title: "Images" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error loading images" });
  }
});

webRouter.post("/images", upload.single("image"), (req, res) => {
  try {
    if (req.file.filename) res.json({ url: req.file.filename });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error uploading image" });
  }
});
