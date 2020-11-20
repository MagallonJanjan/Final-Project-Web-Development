const mongoose = require("mongoose");

const connectToDatabase = () => {
    mongoose
      .connect("mongodb://127.0.0.1/management", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      })
      .then(() => {
        console.log("Database connection is successful :) ");
      })
      .catch((error) => console.log(error));
  };
  
  module.exports = {
    connect: connectToDatabase,
  };