import { gql } from "graphql-tag";
export const EventsCategorySchema = gql`
  input CreateEventCategoryInput {
    name: String!
    description: String
  }

  input UpdateEventCategoryInput {
    name: String
    description: String
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
