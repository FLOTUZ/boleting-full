import * as y from "yup";

export const CreateBuyCartValidator = y.object().shape({
  total_price: y.number().required(),
  user_clientId: y.number().required(),
  payment_methodId: y.number().required(),
  selled_tickets: y.array().of(y.number()).required(),
});

export const UpdateBuyCartValidator = y.object().shape({
  total_price: y.number(),
  user_clientId: y.number(),
  payment_methodId: y.number(),
  selled_tickets: y.array().of(y.number()),
  deleted: y.boolean(),
});
