const mongoose = require("mongoose");

const dbURI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(dbURI, {
      dbName: "portfolioDB",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;

  console.log("✅ Connected to Database:", mongoose.connection.name);

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
    return res.status(405).json({
      message: "Method Not Allowed",
    });
  }

  try {
    await connectDB();

    console.log("Database:", mongoose.connection.name);

    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();

    console.log("Collections:", collections);

    const projects = await Project.find({});

    console.log("Projects:", projects);

    return res.status(200).json(projects);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      error: err.message,
    });
  }
};
