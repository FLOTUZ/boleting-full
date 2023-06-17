import * as yup from "yup";

export const CreateApplicationValidator = yup.object().shape({
  name: yup.string().required().max(50),
  description: yup.string().max(255),
  token: yup.string().required().max(255),
  expires_in: yup.number(),
  roleId: yup.number().required(),
});

export const UpdateApplicationValidator = yup.object().shape({
  name: yup.string().max(50),
  description: yup.string().max(255),
  token: yup.string().max(255),
  expires_in: yup.number(),
  roleId: yup.number(),
});
