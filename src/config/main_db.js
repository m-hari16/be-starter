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
  console.info(`open connection to ${dbConnect}.`);
});

connection.on(`connected`, function (ref) {
  console.info(`connected to ${dbConnect}.`);
});

connection.on(`disconnected`, function (ref) {
  console.info(`disconnected from ${dbConnect}.`);
});

connection.on(`close`, function (ref) {
  console.info(`close connection to ${dbConnect}`);
});

connection.on(`error`, function (err) {
  console.info(`error connection to ${dbConnect}!`);
  console.info(`caused by : ${err}`);
});

connection.on(`reconnect`, function (ref) {
  console.info(`reconnect to ${dbConnect}.`);
});

export default connection;
