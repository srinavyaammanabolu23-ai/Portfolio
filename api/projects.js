const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI;

let cached = global.mongoose || { conn: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  cached.conn = await mongoose.connect(dbURI);
  global.mongoose = cached;

  return cached.conn;
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
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const projects = await Project.find();

    return res.status(200).json(projects);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
