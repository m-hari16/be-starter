import { eIdGen } from "../../common/idGenerator";
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
  const data = await PatientCondition.find(
    { isActive: true },
    { _id: 0 },
    { updatedAt: -1 }
  ).lean();

  return data.map((item) => ({
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
  }));
};

const addPatientVisit = async (body) => {};

const historyPatientVisit = async (e_id) => {
  return await PatientVisit.find({
    isActive: true,
    "patient.e_id": e_id,
  }).lean();
};

export {
  addPatient,
  listPatient,
  conditionPatient,
  addPatientVisit,
  historyPatientVisit,
};
