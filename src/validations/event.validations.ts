import * as y from "yup";

export const CreateEventValidator = y.object().shape({
  name: y.string().required(),
  description: y.string().required("Please enter a valid location").max(255),
  event_location: y.string().required().max(255),
  event_location_url: y.string().required().max(1000),
  start_date: y.date().required(),
  end_date: y.date(),
  start_time: y.string().required().max(5),
  end_time: y.string().required().max(5),
  re_entry: y.boolean().required(),
  event_logo_url: y.string().max(1000),
  event_banner_url: y.string().max(1000),
  sub_categories: y
    .array(y.number())
    .min(1, "Select at least one sub category")
    .of(y.number().required())
    .required(),
  event_social_media: y.array(y.string().max(1000)),
});

export const UpdateEventValidator = y.object().shape({
  event_key: y.string(),
  name: y.string(),
  description: y.string(),
  event_location: y.string(),
  event_location_url: y.string().max(1000),
  start_date: y.date(),
  end_date: y.date(),
  start_time: y.string(),
  end_time: y.string(),
  re_entry: y.boolean(),
  event_logo_url: y.string().max(1000),
  event_banner_url: y.string().max(1000),
  sub_categories: y.array(y.number()),
  event_social_media: y.array(y.string().max(1000)),
});
