import * as yup from "yup";

export const CreateActivityLogValidator = yup.object().shape({
  titte: yup.string().required(),
  description: yup.string(),
  useful_link: yup.string(),
  type: yup.string().required(),
  userId: yup.number(),
  userClientId: yup.number(),
  applicationId: yup.number(),
});

export const UpdateActivityLogValidator = yup.object().shape({
  titte: yup.string(),
  description: yup.string(),
  useful_link: yup.string(),
  type: yup.string(),
  userId: yup.number(),
  userClientId: yup.number(),
  applicationId: yup.number(),
});
