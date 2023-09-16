import { gql } from "graphql-tag";

export const EventSubCategoriesSchema = gql`
  input CreateEventSubCategoryInput {
    name: String!
    description: String!
    createdAt: DateTime!
    event_categories: [Int!]
  }

  input UpdateEventSubCategoryInput {
    name: String
    description: String
    createdAt: DateTime
    event_categories: [Int!]
  }

  type EventSubCategory {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    event_categories: [EventCategory!]
    events: [Event!]
  }

  type Query {
    eventSubCategories(pagination: Pagination): [EventSubCategory!]
    eventSubCategory(id: Int!): EventSubCategory
  }

  type Mutation {
    createEventSubCategory(
      data: CreateEventSubCategoryInput!
    ): EventSubCategory!

    updateEventSubCategory(
      id: Int!
      data: UpdateEventSubCategoryInput!
    ): EventSubCategory

    deleteEventSubCategory(id: Int!): EventSubCategory
  }
`;
