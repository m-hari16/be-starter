import express from "express";
import { baseSuccessResponse } from "../common/baseResponse";
import {
  addPatient,
  conditionPatient,
  historyPatientVisit,
  listPatient,
  patientConditionReport,
  profileUserReport,
} from "../modules/patient/patient_management.module";
import authValidator from "../middleware/auth.middleware";

const routes = express.Router();

routes.post("/new", authValidator, async (req, res, next) => {
  try {
    const result = await addPatient(req.body, req.header.x_identity);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/list", authValidator, async (req, res, next) => {
  try {
    const result = await listPatient();
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/latest-condition", authValidator, async (req, res, next) => {
  try {
    const result = await conditionPatient();
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/history-visit/:e_id", authValidator, async (req, res, next) => {
  try {
    const result = await historyPatientVisit(req.params.e_id);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/last-condition/report", authValidator, async (req, res, next) => {
  try {
    const result = await patientConditionReport();
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.get("/profile/report", authValidator, async (req, res, next) => {
  try {
    const result = await profileUserReport();
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

export default routes;
