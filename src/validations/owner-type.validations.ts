import * as y from "yup";

export const CreateOwnerTypeValidator = y.object().shape({
  name: y.string().required().max(10),
  description: y.string().max(255),
  userId: y.number().required(),
  eventId: y.number().required(),
  organizationId: y.number().required(),
});

export const UpdateOwnerTypeValidator = y.object().shape({
  name: y.string().max(10),
  description: y.string().max(255),
  userId: y.number(),
  eventId: y.number(),
  organizationId: y.number(),
  deleted: y.boolean(),
});
