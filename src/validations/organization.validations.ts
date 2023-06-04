import * as y from "yup";

export const CreateOrganizationSchema = y.object().shape({
  name: y.string().required(),
});

export const UpdateOrganizationSchema = y.object().shape({
  name: y.string().optional(),
});
