import * as y from "yup";

export const CreateEventSchema = y.object().shape({
  event_key: y.string().required(),
  name: y.string().required(),
  description: y.string().required(),
  event_location: y.string().required(),
  event_location_url: y.string().required(),
  date: y.date().required(),
  start_time: y.date().required(),
  end_time: y.date().required(),
  re_entry: y.boolean().required(),
  event_logo_url: y.string().required(),
  event_banner_url: y.string().required(),
  hostId: y.number().required(),
  categories: y.array(y.number()).required(),
});

export const UpdateEventSchema = y.object().shape({
  event_key: y.string(),
  name: y.string(),
  description: y.string(),
  event_location: y.string(),
  event_location_url: y.string(),
  date: y.date(),
  start_time: y.date(),
  end_time: y.date(),
  re_entry: y.boolean(),
  event_logo_url: y.string(),
  event_banner_url: y.string(),
  hostId: y.number(),
  categories: y.array(y.number()),
});
