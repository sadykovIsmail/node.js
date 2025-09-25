import express from "express";
import {
  showProducts,
  newProductForm,
  addProduct,
  editProductForm,
  updateProductHandler,
  deleteProductHandler,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", (req, res) => res.render("index"));
router.get("/products", showProducts);
router.get("/products/new", newProductForm);
router.post("/products", addProduct);
router.get("/products/:id/edit", editProductForm);
router.post("/products/:id", updateProductHandler);
router.post("/products/:id/delete", deleteProductHandler);

export default router;
