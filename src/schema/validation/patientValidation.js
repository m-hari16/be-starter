import Joi from "joi";

export const createPatient = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().allow(""),
  phoneNumber: Joi.string().max(14).allow(""),
  homeAddress: Joi.string().required(),
  gender: Joi.string().valid("M", "F").required(),
  dateOfBirth: Joi.date().required(),
  bloodGroup: Joi.string().allow(""),
});
