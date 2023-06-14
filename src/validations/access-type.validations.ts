import * as y from "yup";

export const CreateAccessTypeSchema = y.object().shape({
  name: y.string().required().max(15),
  description: y.string().required().max(255),
  enter_and_exit_option: y.boolean(),
  userId: y.number().required(),
  organizationId: y.number().required(),
  eventId: y.number().required(),
});

export const UpdateAccessTypeSchema = y.object().shape({
  name: y.string().max(15),
  description: y.string().max(255),
  enter_and_exit_option: y.boolean(),
  userId: y.number(),
  organizationId: y.number(),
  eventId: y.number(),
  deleted: y.boolean(),
});
