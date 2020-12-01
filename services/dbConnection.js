const mongoose = require("mongoose");

const connectToDatabase = () => {
    mongoose
      .connect("mongodb://josephJohn:josephJohn@cluster0-shard-00-00.shguv.mongodb.net:27017,cluster0-shard-00-01.shguv.mongodb.net:27017,cluster0-shard-00-02.shguv.mongodb.net:27017/jobChase?ssl=true&replicaSet=atlas-odtvhg-shard-0&authSource=admin&retryWrites=true&w=majority", {
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