const mongoose = require("mongoose");

const db = "mongodb+srv://rashi:Class@1996@cluster0.nwasn.mongodb.net/food-app?retryWrites=true&w=majority";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);

    process.exit(1); //Exit Process with failure
  }
};

module.exports = connectMongoDB;