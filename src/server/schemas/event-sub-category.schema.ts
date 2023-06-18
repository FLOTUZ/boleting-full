import { gql } from "graphql-tag";

export const EventSubCategoriesSchema = gql`
  input CreateEventSubCategoryInput {
    name: String!
    description: String!
    parent_event_categoryId: Int!
    createdAt: DateTime!
    parent_event_category: [Int!]
  }

  input UpdateEventSubCategoryInput {
    name: String
    description: String
    parent_event_categoryId: Int
    createdAt: DateTime
    parent_event_category: [Int!]
  }

  type EventSubCategory {
    id: ID!
    name: String
    description: String
    parent_event_categoryId: Int
    createdAt: DateTime
    parent_event_category: [EventCategory!]
    events: [Event!]
  }

  type Query {
    eventSubCategories(pagination: Pagination): [EventSubCategory]
    eventSubCategory(id: Int!): EventSubCategory
  }

  type Mutation {
    createEventSubCategory(data: CreateEventSubCategoryInput!): EventSubCategory

    updateEventSubCategory(
      id: Int!
      data: UpdateEventSubCategoryInput!
    ): EventSubCategory

    deleteEventSubCategory(id: Int!): EventSubCategory
  }
`;
