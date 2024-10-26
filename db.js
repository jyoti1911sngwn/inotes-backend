const mongoose = require('mongoose');

// Use the MongoDB URI from environment variables
const mongoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connected");
    })
    .catch((err) => {
      console.log("Error while connecting to the database", err);
    });
};

module.exports = connectToMongo;
