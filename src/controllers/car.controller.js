const client = require("../../db/rent.js");

const getRentalCars = async (req, res) => {
    const filter = {};
    if (req.query.year) filter.year = parseInt(req.query.year);
    if (req.query.color) filter.color = req.query.color;
    if (req.query.steering_type) filter.steering_type = req.query.steering_type;
    if (req.query.number_of_seats) filter.number_of_seats = parseInt(req.query.number_of_seats);

    const cars = await client.db("carRental").collection("cars").find(filter).sort({ price_per_day: 1 }).toArray();
    if (cars.length === 0) return res.status(404).json({ message: "No cars found matching your criteria." });
    res.json(cars);
};

module.exports = {
    getRentalCars,
};