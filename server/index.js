const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
const UserRouter = require("./Routes/userRoute");

const app = express();

app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

app.use("/auth", UserRouter);

mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Database connected successfully'))
  .catch((error) => console.error('Database connection failed:', error));

app.listen(process.env.PORT, () => {
  console.log("Server is running at " + process.env.PORT);
});
