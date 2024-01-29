import * as yup from "yup";

export const CreateAuthorizedDealerValidator = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  telephone: yup.string().required(),
  email: yup.string().email(),
  commision: yup.number().required(),
  address: yup.string().required(),
  userId: yup.number().required(),
});

export const UpdateAuthorizedDealerValidator = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
  telephone: yup.string(),
  email: yup.string().email(),
  commision: yup.number(),
  address: yup.string(),
});
