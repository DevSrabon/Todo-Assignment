const mongoose = require("mongoose");

// Database connection setup
const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Todo",
  };

  try {
    mongoose.connect(process.env.DATABASE, connectionParams);
    console.log("Database connected successfully");
  } catch (error) {
    console.log(error);
    console.log("Database connection failed");
  }
});
