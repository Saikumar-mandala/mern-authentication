const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const UserRouter = require("./Routes/userRoute");
const ProductRouter = require("./Routes/productRoute");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "uploads")));
app.use("/auth", UserRouter);
app.use("/products", ProductRouter); // Use product routes

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection failed:", error));

app.listen(process.env.PORT, () => {
  console.log("Server is running at " + process.env.PORT);
});
