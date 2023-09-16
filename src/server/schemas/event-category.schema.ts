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
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    events: [Event!]
    sub_categories: [EventSubCategory!]
    events_count: Int!
    sub_categories_count: Int!
  }

  type Query {
    eventCategory(id: Int!): EventCategory!
    eventCategories(pagination: Pagination): [EventCategory!]
    filteredByParentsEventSubCategories(parentsIds: [Int!]): [EventCategory!]
  }

  type Mutation {
    createEventCategory(data: CreateEventCategoryInput!): EventCategory
    updateEventCategory(
      id: Int!
      data: UpdateEventCategoryInput!
    ): EventCategory
    deleteEventCategory(id: Int!): EventCategory
  }
`;
