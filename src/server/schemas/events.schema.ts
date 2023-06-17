import { gql } from "graphql-tag";
export const EventsSchema = gql`
  input CreateEventInput {
    name: String!
    description: String!
    event_location: String!
    event_location_url: String!
    start_date: DateTime!
    end_date: DateTime
    start_time: String!
    end_time: String!
    re_entry: Boolean!
    event_logo_url: String!
    event_banner_url: String!
    sub_categories: [Int!]
  }

  input UpdateEventInput {
    name: String
    description: String
    event_location: String
    event_location_url: String
    date: DateTime
    start_date: DateTime
    end_date: DateTime
    end_time: String
    re_entry: Boolean
    event_logo_url: String
    event_banner_url: String
    userId: Int
    sub_categories: [Int]
  }

  type Event {
    id: ID!
    event_key: String
    name: String
    description: String
    event_location: String
    event_location_url: String
    start_date: DateTime
    end_date: DateTime
    start_time: String
    end_time: String
    re_entry: Boolean
    event_logo_url: String
    event_banner_url: String
    userId: Int
    organizationId: Int
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    createdBy: User
    sub_categories: [EventSubCategory!]
    organization: Organization
    access_types: [AccessType!]
    owner_types: [OwnerType!]
  }

  type Query {
    event(id: Int!): Event
    events(pagination: Pagination): [Event]
  }

  type Mutation {
    createEvent(data: CreateEventInput!): Event
    updateEvent(id: Int!, data: UpdateEventInput!): Event
    deleteEvent(id: Int!): Event
  }
`;
