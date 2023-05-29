import * as y from "yup";

export const CreateEventSchema = y.object().shape({
  name: y.string().required(),
  description: y.string().required(),
  event_location: y.string().required(),
  event_location_url: y.string().required(),
  date: y.string().required(),
  start_time: y.string().required(),
  end_time: y.string().required(),
  re_entry: y.boolean().required(),
  event_logo_url: y.string(),
  event_banner_url: y.string(),
  event_categories: y.array(y.number()).required(),
});

export const UpdateEventSchema = y.object().shape({
  event_key: y.string(),
  name: y.string(),
  description: y.string(),
  event_location: y.string(),
  event_location_url: y.string(),
  date: y.date(),
  start_time: y.string(),
  end_time: y.string(),
  re_entry: y.boolean(),
  event_logo_url: y.string(),
  event_banner_url: y.string(),
  event_categories: y.array(y.number()),
});
