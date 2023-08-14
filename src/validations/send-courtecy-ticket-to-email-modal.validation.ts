import * as y from "yup";

export const SendCourtesyTicketToEmailValidator = y.object().shape({
  note: y.string().min(1).max(50),
  email: y.string().required().email("Correo electrónico inválido"),
});
