import * as y from "yup";

export const CreateEventSubCategoryValidator = y.object().shape({
  name: y.string().required(),
  description: y.string().optional(),
  event_categoryId: y.number().required(),
});

export const UpdateEventSubCategoryValidator = y.object().shape({
  name: y.string().optional(),
  description: y.string().optional(),
  event_categoryId: y.number().optional(),
});
