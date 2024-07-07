import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

const prefixApp = process.env.PREFIX_APP || "QF";

export const eIdGen = (code) => {
  const identityType = {
    PATIENT: "004",
    DOCTOR: "003",
    NURSE: "002",
    ADMIN: "001",
  };

  const today = dayjs().format("YYMMDD");
  const timeStamp = dayjs().unix().toString().slice(5);

  return `${prefixApp}-${today}${identityType[code]}${timeStamp}`;
};
