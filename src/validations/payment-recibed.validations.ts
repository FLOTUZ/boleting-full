import * as yup from "yup";

export const CreatePaymentRecibedValidator = yup.object().shape({
  payment_date: yup.date().required(),
  payment_amount: yup.number().required(),
  is_confirmed: yup.boolean().required(),
  is_refunded: yup.boolean().required(),
  authorized_dealerId: yup.number(),
});

export const UpdatePaymentRecibedValidator = yup.object().shape({
  payment_date: yup.date(),
  payment_amount: yup.number(),
  is_confirmed: yup.boolean(),
  is_refunded: yup.boolean(),
  authorized_dealerId: yup.number(),
});
