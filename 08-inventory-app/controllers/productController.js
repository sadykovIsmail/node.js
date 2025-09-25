import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../models/productModel.js";

// Show all products
export async function showProducts(req, res) {
  const products = await getProducts();
  res.render("products", { products });
}

// Show new product form
export function newProductForm(req, res) {
  res.render("new");
}

// Handle new product
export async function addProduct(req, res) {
  const { name, quantity, price } = req.body;
  await createProduct(name, quantity, price);
  res.redirect("/products");
}

// Show edit form
export async function editProductForm(req, res) {
  const product = await getProductById(req.params.id);
  res.render("edit", { product });
}

// Handle update
export async function updateProductHandler(req, res) {
  const { name, quantity, price } = req.body;
  await updateProduct(req.params.id, name, quantity, price);
  res.redirect("/products");
}

// Handle delete
export async function deleteProductHandler(req, res) {
  await deleteProduct(req.params.id);
  res.redirect("/products");
}
