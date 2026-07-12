const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assetflow";
    await mongoose.connect(uri, {
      dbName: "assetflow",
    });
    console.log("MongoDB Connected to assetflow");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;