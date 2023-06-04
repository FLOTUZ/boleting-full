import * as y from "yup";

export const CreateEventSchema = y.object().shape({
  name: y.string().required(),
  description: y.string().required().max(255),
  event_location: y.string().required().max(255),
  event_location_url: y.string().required().max(1000),
  start_date: y.date().required(),
  end_date: y.date().required(),
  start_time: y.string().required().max(5),
  end_time: y.string().required().max(5),
  re_entry: y.boolean().required(),
  event_logo_url: y.string().max(1000),
  event_banner_url: y.string().max(1000),
  sub_categories: y.array(y.number()).required(),
  event_social_media: y.array(y.string().max(1000)),
});

export const UpdateEventSchema = y.object().shape({
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
