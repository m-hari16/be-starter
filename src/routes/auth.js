import express from "express";
import { signin } from "../modules/auth-user/authentication.module";
import { baseSuccessResponse } from "../common/baseResponse";

const routes = express.Router();

routes.post("/signin", async (req, res, next) => {
  try {
    const result = await signin(req.body);
    return res.status(200).json(baseSuccessResponse(result));
  } catch (error) {
    next(error);
  }
});

routes.post("/signout", (req, res) => {
  // TODO LOGOUT
});

export default routes;
