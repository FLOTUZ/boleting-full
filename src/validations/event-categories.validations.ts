import * as y from "yup";

export const CreateEventCategoryValidator = y.object().shape({
  name: y.string().required(),
  description: y.string().optional(),
  sub_categories: y.array().of(y.number()).optional(),
});

export const UpdateEventCategoryValidator = y.object().shape({
  name: y.string().optional(),
  description: y.string().optional(),
  sub_categories: y.array().of(y.number()).optional(),
});
