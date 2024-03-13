import * as yup from "yup";

export const CreateImageValidator = yup.object().shape({
  original_name: yup.string(),
  new_name: yup.string().required(),
  size: yup.number().required(),
  url: yup.string().required(),
});

export const UpdateImageValidator = yup.object().shape({
  original_name: yup.string(),
  new_name: yup.string(),
  size: yup.number(),
  url: yup.string(),
});
