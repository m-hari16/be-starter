import { claimJWT } from "../common/authUtils";
import { CustomError } from "../common/errorHandler";

const authValidator = async (req, res, next) => {
  try {
    const token = req.header("X_USER_TOKEN");
    if (!token) {
      throw new CustomError("Unauthorized Client", 401);
    }

    const split = token.split(" ");
    if (split.length !== 2) {
      throw new CustomError("Unauthorized Client", 401);
    }

    const identity = claimJWT(split[1]);
    if (!identity.isVerified) {
      throw new CustomError("Unauthorized Client", 401);
    }

    req.header.x_identity = identity.data;

    next();
  } catch (error) {
    next(error);
  }
};

export default authValidator;
