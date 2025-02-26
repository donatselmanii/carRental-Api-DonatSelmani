require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes.js");
const carRoutes = require("./routes/car.routes.js");

const app = express();
const PORT = process.env.PORT || 8083;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/cars", carRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));