import * as yup from "yup";

export const CreateMailValidator = yup.object().shape({
  to: yup.string().required().max(255),
  subject: yup.string().required().max(255),
  text: yup.string().required().max(2000),
  userId: yup.number(),
  user_clientId: yup.number(),
});

export const UpdateMailValidator = yup.object().shape({
  to: yup.string().max(255),
  subject: yup.string().max(255),
  text: yup.string().max(2000),
  userId: yup.number(),
  user_clientId: yup.number(),
});
