import dotenv from "dotenv";

dotenv.config();

const mainConnection = {
  dbName:
    process.env.NODE_ENV === "test"
      ? `${process.env.MONGO_TESTING_DB}`
      : `${process.env.MONGO_MAIN_DB}`,
  user:
    process.env.NODE_ENV === "test"
      ? `${process.env.MONGO_TESTING_USERNAME}`
      : `${process.env.MONGO_MAIN_USERNAME}`,
  pass:
    process.env.NODE_ENV == "test"
      ? `${process.env.MONGO_TESTING_PASSWORD}`
      : `${process.env.MONGO_MAIN_PASSWORD}`,
};

export { mainConnection };
