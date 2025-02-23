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

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "Both username and password are required." });

    const user = await client.db("carRental").collection("users").findOne({ username });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
        return res.json({ message: "Login successful", token });
    }
    res.status(401).json({ message: "Invalid username or password" });
};

const myProfile = async (req, res) => {
    const user = await client.db("carRental").collection("users").findOne({ _id: new ObjectId(req.user.userId) });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ fullName: user.fullName, username: user.username, email: user.email });
};


module.exports = {
    register,
    login,
    myProfile
}