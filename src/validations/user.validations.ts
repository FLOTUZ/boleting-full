import * as y from "yup";

export const CreateUserSchema = y.object().shape({
  name: y.string().required(),
  email: y.string().email().required(),
  password: y.string().required(),
  last_name: y.string().required(),
  roles: y.array().of(y.number().required()).required(),
});

export const UpdateUserSchema = y.object().shape({
  name: y.string(),
  email: y.string().email(),
  password: y.string(),
  last_name: y.string(),
  roles: y.array().of(y.number().required()),
});
