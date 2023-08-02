import * as y from "yup";

export const CreateCourtesyTicketValidator = y.object().shape({
  note: y.string().required().min(1).max(50),
  price: y.number().default(0),
  is_paid: y.boolean(),
  access_typeId: y.number(),
  owner_typeId: y.number(),
});

export const CreateTicketValidator = y.object().shape({
  id: y.number().required(),
  note: y.string().required().max(50),
  serial_number: y.string().required().max(6),
  price: y.number().required(),
  is_paid: y.boolean().required().default(false),
  is_used: y.boolean().default(false),
  service_charge: y.number().required(),
  eventId: y.number().required(),
  access_typeId: y.number(),
  owner_typeId: y.number(),
  buy_cartId: y.number(),
});

export const UpdateTicketValidator = y.object().shape({
  id: y.number().required(),
  note: y.string().required().max(50),
  serial_number: y.string().required().max(6),
  price: y.number().required(),
  is_paid: y.boolean().required().default(false),
  is_used: y.boolean().default(false),
  service_charge: y.number().required(),
  eventId: y.number().required(),
  access_typeId: y.number(),
  owner_typeId: y.number(),
  buy_cartId: y.number(),
});
