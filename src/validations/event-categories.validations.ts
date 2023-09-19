import * as y from "yup";

export const CreateEventCategoryValidator = y.object().shape({
  name: y.string().max(50).min(3).required(),
  description: y.string().max(255).optional(),
  sub_categories: y.array().of(y.number()).optional(),
});

export const UpdateEventCategoryValidator = y.object().shape({
  name: y.string().max(50).min(3).optional(),
  description: y.string().max(255).optional(),
  sub_categories: y.array().of(y.number()).optional(),
});
