import mongoose from "mongoose";
import dotenv from "dotenv";
import { mainConnection } from "./connection";

dotenv.config();

let dbConnect = null;
if (process.env.NODE_ENV == "test") {
  dbConnect = `${process.env.MONGO_TESTING_URI}`;
} else {
  dbConnect = `${process.env.MONGO_MAIN_URI}`;
}

const connection = mongoose.createConnection(`${dbConnect}`, mainConnection);

connection.on("open", function (ref) {
  console.log(`open connection to ${dbConnect}.`);
});

connection.on(`connected`, function (ref) {
  console.log(`connected to ${dbConnect}.`);
});

connection.on(`disconnected`, function (ref) {
  console.log(`disconnected from ${dbConnect}.`);
});

connection.on(`close`, function (ref) {
  console.log(`close connection to ${dbConnect}`);
});

connection.on(`error`, function (err) {
  console.log(`error connection to ${dbConnect}!`);
  console.log(`caused by : ${err}`);
});

connection.on(`reconnect`, function (ref) {
  console.log(`reconnect to ${dbConnect}.`);
});

export default connection;
