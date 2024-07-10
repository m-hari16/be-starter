import Joi from "joi";

export const createPatient = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().allow(""),
  nik: Joi.string().length(16).required(),
  phoneNumber: Joi.string().max(14).allow(""),
  homeAddress: Joi.string().required(),
  gender: Joi.string().valid("M", "F").required(),
  maritalStatus: Joi.string().valid("SINGLE", "MARRIED", "DIVORCE").required(),
  dateOfBirth: Joi.date().required(),
  bloodGroup: Joi.string().allow(""),
});
