import { checkUserCred, generateJWT } from "../../common/authUtils";
import { CustomError } from "../../common/errorHandler";
import { validationErrorHandler } from "../../common/validationHandler";
import UserCredential from "../../schema/database/userCredential";
import UserProfile from "../../schema/database/userProfile";
import { loginByEmail } from "../../schema/validation/loginValidation";

const signin = async (body) => {
  validationErrorHandler(loginByEmail, body);

  const userCred = await UserCredential.findOne({
    isActive: true,
    email: body.email.toLowerCase(),
  }).lean();

  if (!userCred) {
    throw new CustomError("user not registered", 404);
  }
  if (!(await checkUserCred(body.password, userCred.password))) {
    throw new CustomError("invalid user credential", 401);
  }

  const profile = await UserProfile.findOne({
    isActive: true,
    e_id: userCred.e_id,
  }).lean();

  const identityUser = {
    e_id: profile.e_id,
    fullName: profile.fullName,
    gender: profile.gender,
    profileType: profile.profileType,
  };

  const accessToken = generateJWT(identityUser);

  return {
    user: identityUser,
    accessToken,
  };
};

export { signin };
