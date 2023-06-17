import * as yup from "yup";

export const CreatePaymentMethodValidator = yup.object().shape({
  payment_type: yup.string().required(),
  description: yup.string(),
  payment_reference: yup.string(),
});

export const UpdatePaymentMethodValidator = yup.object().shape({
  payment_type: yup.string(),
  description: yup.string(),
  payment_reference: yup.string(),
});
