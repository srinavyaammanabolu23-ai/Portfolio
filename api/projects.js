const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const dbURI = process.env.MONGODB_URI;

let isConnected = false;

async function connectDB() {
    if (isConnected) return;

    await mongoose.connect(dbURI);

    isConnected = true;
    console.log("MongoDB Connected");
}

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

app.get("/", async (req, res) => {
    try {
        await connectDB();
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

module.exports = app;
