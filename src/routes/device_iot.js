import express from "express";
import { baseSuccessResponse } from "../common/baseResponse";
import authValidator from "../middleware/auth.middleware";
import {
  historyBloodGlucose,
  historyBloodOxygen,
  historyBloodPressure,
  historyHeartRate,
  historyTemperature,
} from "../modules/device-iot/device_iot.module";

const routes = express.Router();

routes.get("/blood-pressure/:eId", authValidator, async (req, res, next) => {
  try {
    const result = await historyBloodPressure(req.params.eId);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/heart-rate/:eId", authValidator, async (req, res, next) => {
  try {
    const result = await historyHeartRate(req.params.eId);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/temperature/:eId", authValidator, async (req, res, next) => {
  try {
    const result = await historyTemperature(req.params.eId);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/blood-oxygen/:eId", authValidator, async (req, res, next) => {
  try {
    const result = await historyBloodOxygen(req.params.eId);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/blood-glucose/:eId", authValidator, async (req, res, next) => {
  try {
    const result = await historyBloodGlucose(req.params.eId);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

export default routes;
