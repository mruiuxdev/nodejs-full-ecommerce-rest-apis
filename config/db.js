const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log(`MongoDB connected: ${mongoose.connection.host}`));
};

module.exports = connectDB;
