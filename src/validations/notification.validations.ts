import * as yup from "yup";

export const CreateNotificationValidator = yup.object().shape({
  title: yup.string().required().max(50),
  description: yup.string().required().max(255),
  redirect_url: yup.string().required().max(255),
  is_read: yup.boolean().required(),
  userId: yup.number(),
  user_clientId: yup.number(),
});

export const UpdateNotificationValidator = yup.object().shape({
  title: yup.string().max(50),
  description: yup.string().max(255),
  redirect_url: yup.string().max(255),
  is_read: yup.boolean(),
  userId: yup.number(),
  user_clientId: yup.number(),
});
