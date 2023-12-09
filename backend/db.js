// Connected mongoDB compass for backend date
const mongoose = require("mongoose");

const mongoURL =
  "mongodb+srv://laibaafzal0222:Laiba.123@cluster0.m6nppzs.mongodb.net/?retryWrites=true&w=majority";
mongoose.set("strictQuery", false);
const connectToMongo = async () => {
  mongoose.connect(mongoURL, () => {
    console.log("connected to mongoDB successfully");
  });
};
module.exports = connectToMongo;
