import * as yup from "yup";

export const CreateAbilityValidator = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
});

export const UpdateAbilityValidator = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
});
