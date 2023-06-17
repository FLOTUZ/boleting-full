import * as yup from "yup";

export const CreateUserClientValidator = yup.object().shape({
  name: yup.string().required(),
  last_name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  roleId: yup.number().required(),
});
export const UpdateUserClientValidator = yup.object().shape({
  name: yup.string(),
  last_name: yup.string(),
  email: yup.string().email(),
  password: yup.string(),
  roleId: yup.number(),
});
