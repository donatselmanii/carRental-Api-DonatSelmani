const { ObjectId } = require("mongodb");
const client = require("../../db/rent.js");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { fullName, email, username, password } = req.body;
    if (!fullName || !email || !username || !password) return res.status(400).json({ message: "All fields are required." });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(fullName, email, username, hashedPassword);
    const result = await client.db("carRental").collection("users").insertOne(user);
    
    res.status(201).json({ message: "User registered successfully", userId: result.insertedId });
};


module.exports = {
    register
}