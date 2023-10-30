import { gql } from "graphql-tag";

export const EventSubCategoriesSchema = gql`
  input CreateEventSubCategoryInput {
    name: String!
    description: String!
    createdAt: DateTime!
    event_categoryId: Int!
  }

  input UpdateEventSubCategoryInput {
    name: String
    description: String
    createdAt: DateTime
    event_categoryId: Int
  }

  type EventSubCategory {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    event_categoryId: Int!
    event_category: EventCategory!
    events: [Event!]
  }

  type Query {
    eventSubCategories(pagination: Pagination): [EventSubCategory!]
    eventSubCategory(id: Int!): EventSubCategory
    eventSubCategoriesByCategory(categoryId: Int!): [EventSubCategory!]
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
