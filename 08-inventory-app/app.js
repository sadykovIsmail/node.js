import express from "express";
import dotenv from "dotenv";
import expressLayouts from "express-ejs-layouts";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));

// EJS + Layouts
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// Routes
app.use("/", productRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
