import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import dayjs from "dayjs";
import bcrypt from "bcrypt";

dotenv.config();

const secretKey = process.env.JWT_KEY;
const tokenExpired = process.env.TOKEN_EXPIRED || 30;

export const generateJWT = (payload = {}) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: `${tokenExpired}d` });
  const tokenExpiredAt = dayjs()
    .add(tokenExpired, "days")
    .format("YYYY-MM-DD HH:mm:ss");

  return {
    token,
    tokenExpiredAt,
  };
};

export const claimJWT = (token) => {
  try {
    const data = jwt.verify(token, secretKey);
    return {
      data,
      isVerified: true,
    };
  } catch (error) {
    return {
      error,
      isVerified: false,
    };
  }
};

export const hashCred = async (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

export const checkUserCred = async (password, passwordHash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, function (err, res) {
      if (err) reject(err);
      resolve(res);
    });
  });
};
