import * as y from "yup";

export const LoginSchema = y.object().shape({
  email: y.string().email().required(),
  password: y.string().required(),
});
