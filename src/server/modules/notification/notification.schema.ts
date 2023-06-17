import { gql } from "graphql-tag";
export const NotificationSchema = gql`
  input CreateNotificationInput {
    title: String!
    description: String!
    redirect_url: String!
    is_read: Boolean!
    userId: Int
    user_clientId: Int
  }

  input UpdateNotificationInput {
    title: String
    description: String
    redirect_url: String
    is_read: Boolean
    userId: Int
    user_clientId: Int
  }

  type Notification {
    id: Int!
    title: String!
    description: String
    redirect_url: String
    is_read: Boolean!
    userId: Int
    user_clientId: Int
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    user: User
    user_client: UserClient
  }

  type Query {
    notifications(pagination: Pagination): [Notification!]!
    notification(id: Int!): Notification!
  }

  type Mutation {
    createNotification(data: CreateNotificationInput!): Notification!
    updateNotification(id: Int!, data: UpdateNotificationInput!): Notification!
    deleteNotification(id: Int!): Notification!
  }
`;
