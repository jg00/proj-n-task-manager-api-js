const mongoose = require("mongoose");

const connectDB = (url) => {
  // Effectively we are returning a Promise
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
