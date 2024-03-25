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
    price_from: Decimal
    price_to: Decimal
    is_published: Boolean
    base_64_event_logo: String
    base_64_event_banner: String
    event_sub_categories: [Int!]
  }

  input UpdateEventInput {
    name: String
    description: String
    event_location: String
    event_location_url: String
    start_date: DateTime
    end_date: DateTime
    start_time: String
    end_time: String
    re_entry: Boolean
    price_from: Decimal
    price_to: Decimal
    is_published: Boolean
    base_64_event_logo: String
    base_64_event_banner: String
    event_sub_categories: [Int!]
  }

  type Event {
    id: Int!
    event_key: String
    name: String!
    description: String
    event_location: String!
    event_location_url: String!
    start_date: DateTime!
    end_date: DateTime
    start_time: String
    end_time: String
    re_entry: Boolean!
    price_from: Decimal
    price_to: Decimal
    is_published: Boolean!
    event_logoId: String
    event_bannerId: String
    userId: Int!
    organizationId: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
    deleted: Boolean!
    deletedAt: DateTime
    createdBy: User!
    event_sub_categories: [EventSubCategory!]
    selled_tickets: [Ticket!]
    organization: Organization!
    access_types: [AccessType!]
    staff: [User!]
    event_logo: Image
    event_banner: Image
  }

  type Query {
    event(id: Int!): Event!
    events(pagination: Pagination): [Event!]
    eventsByCategory(categoryId: Int!): [Event!]
    eventsBySubcategory(subCategoryId: Int!): [Event!]
    popular_events: [Event!]
    search_events(query: String!, pagination: Pagination): [Event!]
  }

  type Mutation {
    createEvent(data: CreateEventInput!): Event!
    updateEvent(id: Int!, data: UpdateEventInput!): Event!
    deleteEvent(id: Int!): Event!
    publishEvent(id: Int!): Event!
  }
`;
