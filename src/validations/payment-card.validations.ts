import * as yup from "yup";

export const CreatePaymentCardValidator = yup.object().shape({
  is_credit_card: yup.boolean().required(),
  nick_name: yup.string().required(),
  owner_name: yup.string().required(),
  card_number: yup.string().required(),
  expiration_date: yup.date().required(),
  country: yup.string().required(),
  is_default: yup.boolean().required(),
  user_clientId: yup.number().required(),
  payment_methodId: yup.number().required(),
});

export const UpdatePaymentCardValidator = yup.object().shape({
  is_credit_card: yup.boolean(),
  nick_name: yup.string(),
  owner_name: yup.string(),
  card_number: yup.string(),
  expiration_date: yup.date(),
  country: yup.string(),
  is_default: yup.boolean(),
  user_clientId: yup.number(),
  payment_methodId: yup.number(),
});
