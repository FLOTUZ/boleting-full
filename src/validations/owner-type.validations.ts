import * as y from "yup";

export const CreateOwnerTypeSchema = y.object().shape({
  name: y.string().required().max(10),
  description: y.string().max(255),
  userId: y.number().required(),
  eventId: y.number().required(),
  organizationId: y.number().required(),
});

export const UpdateOwnerTypeSchema = y.object().shape({
  name: y.string().max(10),
  description: y.string().max(255),
  userId: y.number(),
  eventId: y.number(),
  organizationId: y.number(),
  deleted: y.boolean(),
});
