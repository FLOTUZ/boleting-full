import { ValidationError } from "@/server/utils";
import * as y from "yup";

interface ValidationArgs {
  schema: y.AnySchema;
  data: any;
}

export const validateData = async ({ schema, data }: ValidationArgs) => {
  await schema.validate(data, { abortEarly: false }).catch((error) => {
    throw new ValidationError(JSON.stringify(error.errors));
  });
};
