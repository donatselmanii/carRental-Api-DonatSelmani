const express = require("express");
const { getRentalCars } = require("../controllers/car.controller.js");
const authMiddleware = require("../middleware/auth.middlware.js");

const router = express.Router();

router.get("/rental-cars", authMiddleware, getRentalCars);

module.exports = router;