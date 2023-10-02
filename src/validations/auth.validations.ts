import * as y from "yup";

export const LoginSchema = y.object().shape({
  email: y.string().email().required(),
  password: y.string().required(),
});

export const LoginClientSchema = y.object().shape({
  email: y
    .string()
    .email("El email no es valido")
    .required("El email es requerido"),
  password: y.string().required("La contraseña es requerida"),
});
