import * as y from "yup";

export const CreateAccessTypeValidatorForm = y.object().shape({
  name: y.string().required().max(15),
  description: y.string().required().max(1000),
  enter_and_exit_option: y.boolean(),
  price: y.number().required().min(0),
  eventId: y.number().required(),
});

export const CreateAccessTypeValidator = y.object().shape({
  name: y.string().required().max(15),
  description: y.string().required().max(1000),
  enter_and_exit_option: y.boolean(),
  price: y.number().required().min(0),
  eventId: y.number().required(),
});

export const UpdateAccessTypeValidator = y.object().shape({
  name: y.string().max(15),
  description: y.string().max(1000),
  enter_and_exit_option: y.boolean(),
  eventId: y.number(),
  deleted: y.boolean(),
});
