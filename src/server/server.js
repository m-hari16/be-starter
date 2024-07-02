import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import mainDB from "../config/main_db";
import mainRoutesV1 from "../routes/index.routes";
import { errorHandler } from "../common/errorHandler";
import { baseErrorResponse } from "../common/baseResponse";

dotenv.config();

global.main_db = mainDB;

const server = express();

server.use(cors());
server.use(helmet());
server.use(express.json({ limit: "5mb" }));
server.use(express.urlencoded({ limit: "5mb", extended: true }));
server.use(cookieParser());

// checking health svc
server.get("/health", (req, res) => {
  res.send("Service is healthy");
});
server.get("/", (req, res) => {
  res.send("No service here");
});

// Register base routes below
server.use("/api/v1", mainRoutesV1);

// Handler routes not found
server.use((req, res, next) => {
  return res.status(404).send(baseErrorResponse("Invalid Routes"));
});

// Centralize Error Handler
server.use(errorHandler);

export default server;
