import * as y from "yup";

export const CreateCourtesyTicketValidator = y.object().shape({
  note: y.string().required().min(1).max(50),
  eventId: y.number().required(),
  access_typeId: y.number().required(),
});

export const CreateTicketValidator = y.object().shape({
  id: y.number().required(),
  note: y.string().required().max(50),
  is_used: y.boolean().default(false),
  eventId: y.number().required(),
  access_typeId: y.number(),
});

export const UpdateTicketValidator = y.object().shape({
  id: y.number(),
  note: y.string().max(50),
  price: y.number(),
  is_paid: y.boolean().default(false),
  is_used: y.boolean().default(false),
  access_typeId: y.number(),
});
