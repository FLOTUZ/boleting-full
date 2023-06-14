import * as y from "yup";

export const CreateTicketSchema = y.object().shape({
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
  buy_cartId: y.number().required(),
});

export const UpdateTicketSchema = y.object().shape({
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
  buy_cartId: y.number().required(),
});
