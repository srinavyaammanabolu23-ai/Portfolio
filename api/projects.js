const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI;

let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  await mongoose.connect(dbURI);
  isConnected = true;
}

const Project =
  mongoose.models.Project ||
  mongoose.model(
    "Project",
    new mongoose.Schema({
      title: String,
      description: String,
      imageUrl: String,
    })
  );

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  try {
    await connectDB();

    const projects = await Project.find();

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
