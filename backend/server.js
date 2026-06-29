const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

console.log("Attempting to connect to MongoDB...");

// Make sure to put your actual simple password in here, with NO < or > brackets!
const dbURI = 'mongodb+srv://Srinavya:Navya2026@cluster0.wtwprkc.mongodb.net/portfolioDB?retryWrites=true&w=majority';

mongoose.connect(dbURI)
  .then(() => console.log("✅ MongoDB Connected Successfully!"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err.message));

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    imageUrl: String
});

const Project = mongoose.model('Project', projectSchema);

app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.post('/api/projects', async (req, res) => {
    const { title, description, imageUrl } = req.body;
    const newProject = new Project({ title, description, imageUrl });
    
    try {
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

app.listen(5000, () => {
    console.log('Server running on port 5000');
});

module.exports = app;