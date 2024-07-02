import { validationErrorHandler } from "../../common/validationHandler";
import { loginByEmail } from "../../schema/validation/loginValidation";

const signin = async (body) => {
  validationErrorHandler(loginByEmail, body);

  return {};
};

export { signin };
