require("dotenv").config();
const { MongoClient } = require("mongodb");
const bcrypt = require("bcrypt");

async function seedDatabase() {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const usersCollection = db.collection(process.env.USERS_COLLECTION);
    const carsCollection = db.collection(process.env.CARS_COLLECTION);

    await usersCollection.createIndex({ username: 1 }, { unique: true });
    await carsCollection.createIndex({ name: 1 });

    const users = [
        { fullName: "Admin User", email: "admin@example.com", username: "admin", password: "adminpassword" },
        { fullName: "Test User", email: "testuser@example.com", username: "testuser", password: "testpassword" },
    ];

    const cars = [
        { name: "Golf mk8", price_per_day: 50.0, year: 2015, color: "black", steering_type: "automatic", number_of_seats: 5 },
        { name: "Audi A4", price_per_day: 70.0, year: 2018, color: "white", steering_type: "manual", number_of_seats: 5 },
        { name: "Tesla Model 3", price_per_day: 120.0, year: 2020, color: "red", steering_type: "automatic", number_of_seats: 5 },
    ];

    for (const user of users) {
        const existingUser = await usersCollection.findOne({ username: user.username });
        if (!existingUser) {
            user.password = await bcrypt.hash(user.password, 10);
            await usersCollection.insertOne(user);
            console.log(`Inserted user: ${user.username}`);
        } else {
            console.log(`User already exists: ${user.username}`);
        }
    }

    for (const car of cars) {
        const existingCar = await carsCollection.findOne({ name: car.name });
        if (!existingCar) {
            await carsCollection.insertOne(car);
            console.log(`Inserted car: ${car.name}`);
        } else {
            console.log(`Car already exists: ${car.name}`);
        }
    }

    await client.close();
}

seedDatabase();
