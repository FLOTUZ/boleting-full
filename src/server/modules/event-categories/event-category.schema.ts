import { gql } from "graphql-tag";
export const EventsCategorySchema = gql`
  input CreateEventCategoryInput {
    name: String!
    description: String
    sub_categories: [Int!]
  }

  input UpdateEventCategoryInput {
    name: String
    description: String
    sub_categories: [Int!]
  }

  type EventCategory {
    id: Int
    name: String
    description: String
    createdAt: DateTime
    updatedAt: DateTime
    deleted: Boolean
    deletedAt: DateTime
    events: [Event]
    sub_categories: [EventCategory]
  }

  type Query {
    eventCategory(id: Int!): Event
    eventCategories(pagination: Pagination): [EventCategory]
  }

  type Mutation {
    createEventCategory(input: CreateEventCategoryInput!): Event
    updateEventCategory(id: Int!, input: UpdateEventCategoryInput!): Event
    deleteEventCategory(id: Int!): Event
  }
`;
