import * as y from "yup";

export const CreateRoleSchema = y.object().shape({
  name: y.string().required(),
  description: y.string().required(),
  abilities: y.array().of(y.number()).required(),
});

export const UpdateRoleSchema = y.object().shape({
  name: y.string(),
  description: y.string(),
});
