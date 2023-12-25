const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URL;

main().catch((err) => console.error("MongoDB connection error:", err));

async function main() {
  try {
    await mongoose.connect(mongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
