import { gql } from "graphql-tag";
export const EventsSchema = gql`
  input CreateEventInput {
    event_key: String!
    name: String!
    description: String!
    event_location: String!
    event_location_url: String!
    date: DateTime!
    start_time: DateTime!
    end_time: DateTime!
    re_entry: Boolean!
    event_logo_url: String!
    event_banner_url: String!
    hostId: Int!
    event_categories: [Int!]
  }

  input UpdateEventInput {
    event_key: String
    name: String
    description: String
    event_location: String
    event_location_url: String
    date: DateTime
    start_time: DateTime
    end_time: DateTime
    re_entry: Boolean
    event_logo_url: String
    event_banner_url: String
    hostId: Int
    event_categories: [Int!]
  }

  type Event {
    id: Int
    event_key: String
    name: String
    description: String
    event_location: String
    event_location_url: String
    date: DateTime
    start_time: DateTime
    end_time: DateTime
    re_entry: Boolean
    event_logo_url: String
    event_banner_url: String
    hostId: Int
    categoryId: Int
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    host: User
    event_categories: [EventCategory]
  }

  type Query {
    event(id: Int!): Event
    events(pagination: Pagination): [Event]
  }

  type Mutation {
    createEvent(input: CreateEventInput!): Event
    updateEvent(id: Int!, input: UpdateEventInput!): Event
    deleteEvent(id: Int!): Event
  }
`;
