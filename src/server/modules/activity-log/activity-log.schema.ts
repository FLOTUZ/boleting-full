import { gql } from "graphql-tag";
export const ActivityLogSchema = gql`
  input CreateActivityLogInput {
    tittle: String!
    description: String
    useful_link: String
    type: String!
    userId: Int
    user_clientId: Int
    applicationId: Int
  }

  input UpdateActivityLogInput {
    tittle: String
    description: String
    useful_link: String
    type: String
    userId: Int
    user_clientId: Int
    applicationId: Int
  }

  type ActivityLog {
    id: Int!
    tittle: String!
    description: String
    useful_link: String
    type: String!
    userId: Int
    user_clientId: Int
    applicationId: Int
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    user: User
    user_client: UserClient
    application: Application
  }

  type Query {
    activityLogs(pagination: Pagination): [ActivityLog!]!
    activityLog(id: Int!): ActivityLog!
  }

  type Mutation {
    createActivityLog(data: CreateActivityLogInput!): ActivityLog!
    updateActivityLog(id: Int!, data: UpdateActivityLogInput!): ActivityLog!
    deleteActivityLog(id: Int!): ActivityLog!
  }
`;
