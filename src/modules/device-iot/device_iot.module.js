import BloodGlucose from "../../schema/database/bloodGlucose";
import BloodOxygen from "../../schema/database/bloodOxygen";
import BloodPressure from "../../schema/database/bloodPressure";
import HeartRate from "../../schema/database/heartRate";
import Temperature from "../../schema/database/temperature";

const historyBloodPressure = async (eId) => {
  return await BloodPressure.find({ isActive: true, e_id: eId })
    .sort({ createdAt: -1 })
    .lean();
};

const historyHeartRate = async (eId) => {
  return await HeartRate.find({ isActive: true, e_id: eId })
    .sort({ createdAt: -1 })
    .lean();
};

const historyTemperature = async (eId) => {
  return await Temperature.find({ isActive: true, e_id: eId })
    .sort({ createdAt: -1 })
    .lean();
};

const historyBloodOxygen = async (eId) => {
  return await BloodOxygen.find({ isActive: true, e_id: eId })
    .sort({ createdAt: -1 })
    .lean();
};

const historyBloodGlucose = async (eId) => {
  return await BloodGlucose.find({ isActive: true, e_id: eId })
    .sort({ createdAt: -1 })
    .lean();
};

export {
  historyBloodPressure,
  historyHeartRate,
  historyTemperature,
  historyBloodOxygen,
  historyBloodGlucose,
};
