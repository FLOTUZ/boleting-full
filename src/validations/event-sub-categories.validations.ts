import * as y from "yup";

export const CreateEventSubCategorySchema = y.object().shape({
  name: y.string().required(),
  description: y.string().optional(),
  parent_event_categoryId: y.number().required(),
});

export const UpdateEventSubCategorySchema = y.object().shape({
  name: y.string().optional(),
  description: y.string().optional(),
  parent_event_categoryId: y.number().optional(),
});
