import * as y from "yup";

export const CreateEventCategorySchema = y.object().shape({
  name: y.string().required(),
  description: y.string().optional(),
  sub_categories: y.array().of(y.number()).optional(),
});

export const UpdateEventCategorySchema = y.object().shape({
  name: y.string().optional(),
  description: y.string().optional(),
  sub_categories: y.array().of(y.number()).optional(),
});
