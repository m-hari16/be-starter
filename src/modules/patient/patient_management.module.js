import { eIdGen } from "../../common/idGenerator";
import { getRandomInt } from "../../common/randomInt";
import { validationErrorHandler } from "../../common/validationHandler";
import PatientCondition from "../../schema/database/patientCondition";
import PatientVisit from "../../schema/database/patientVisit";
import UserProfile from "../../schema/database/userProfile";
import { createPatient } from "../../schema/validation/patientValidation";

const addPatient = async (body, requester) => {
  validationErrorHandler(createPatient, body);

  body.e_id = eIdGen("PATIENT");
  body.isActive = true;
  body.profileType = "PATIENT";
  body.createdBy = {
    e_id: requester.e_id,
  };
  body.createdAt = new Date();

  const profile = await UserProfile(body).save();

  const initPatient = {
    e_id: profile.e_id,
    isActive: true,
    patientProfile: body,
    createdBy: {
      e_id: requester.e_id,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await PatientCondition(initPatient).save();
  return body;
};

const listPatient = async () => {
  return await PatientCondition.find(
    { isActive: true },
    {
      _id: 0,
      e_id: 1,
      latestDesease: 1,
      isConnectedDevice: 1,
      patientProfile: 1,
      createdAt: 1,
    },
    { createdAt: -1 }
  ).lean();
};

const conditionPatient = async () => {
  const data = await PatientCondition.find({ isActive: true }).lean();

  return data
    .map((item) => ({
      e_id: item.e_id,
      patientProfile: item.patientProfile,
      latestTreatment: item?.latestTreatment || "",
      latestBloodPressure: item?.latestBloodPressure || null,
      latestHeartRate: item?.latestHeartRate || null,
      latestBloodGlucose: item?.latestBloodGlucose || null,
      latestTemperature: item?.latestTemperature || null,
      latestBloodOxygen: item?.latestBloodOxygen || null,
      isConnectedDevice: item.isConnectedDevice,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      randomVal: getRandomInt(1, 999),
    }))
    .sort((a, b) => a.randomVal - b.randomVal);
};

const addPatientVisit = async (body) => {};

const historyPatientVisit = async (e_id) => {
  return await PatientVisit.find({
    isActive: true,
    "patient.e_id": e_id,
  }).lean();
};

const patientConditionReport = async () => {
  const report = await PatientCondition.aggregate([
    {
      $facet: {
        high: [{ $match: { latestRiskStatus: "HIGH" } }, { $count: "count" }],
        moderate: [
          { $match: { latestRiskStatus: "MODERATE" } },
          { $count: "count" },
        ],
        low: [{ $match: { latestRiskStatus: "LOW" } }, { $count: "count" }],
        normal: [
          { $match: { latestRiskStatus: "NORMAL" } },
          { $count: "count" },
        ],
      },
    },
    {
      $project: {
        high: { $arrayElemAt: ["$high.count", 0] },
        moderate: { $arrayElemAt: ["$moderate.count", 0] },
        low: { $arrayElemAt: ["$low.count", 0] },
        normal: { $arrayElemAt: ["$normal.count", 0] },
      },
    },
  ]);

  return {
    high: report?.[0]?.high || 0,
    moderate: report?.[0]?.moderate || 0,
    low: report?.[0]?.low || 0,
    normal: report?.[0]?.normal || 0,
  };
};

const profileUserReport = async () => {
  const report = await UserProfile.aggregate([
    {
      $facet: {
        patient: [{ $match: { profileType: "PATIENT" } }, { $count: "count" }],
        doctor: [{ $match: { profileType: "DOCTOR" } }, { $count: "count" }],
        male: [
          { $match: { profileType: "PATIENT", gender: "M" } },
          { $count: "count" },
        ],
        female: [
          { $match: { profileType: "PATIENT", gender: "F" } },
          { $count: "count" },
        ],
      },
    },
    {
      $project: {
        patient: { $arrayElemAt: ["$patient.count", 0] },
        doctor: { $arrayElemAt: ["$doctor.count", 0] },
        male: { $arrayElemAt: ["$male.count", 0] },
        female: { $arrayElemAt: ["$female.count", 0] },
      },
    },
  ]);

  return {
    doctor: {
      total: report?.[0]?.doctor || 0,
    },
    patient: {
      total: report?.[0]?.patient || 0,
      male: report?.[0]?.male || 0,
      female: report?.[0]?.female || 0,
    },
  };
};

export {
  addPatient,
  listPatient,
  conditionPatient,
  addPatientVisit,
  historyPatientVisit,
  patientConditionReport,
  profileUserReport,
};
