import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config()
const app = express();

app.get("/", (_, res) => {
    res.json({message: "Welcome to RealEstate API..."})
})

mongoose.connect(process.env.MONGO_URI).then(
    () => {
        console.log("Successfully connected to the database...")
    }
).catch((error) => {
    console.log("There was an error connecting to the database");
    console.error(error);
})

app.listen(3000, () => {
    console.log(`Server running on port 3000...`);
})