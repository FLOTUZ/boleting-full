import { gql } from "graphql-tag";
export const ApplicationSchema = gql`
  input CreateApplicationInput {
    name: String!
    description: String
    token: String!
    expires_in: Int
    roleId: Int!
  }

  input UpdateApplicationInput {
    name: String
    description: String
    token: String
    expires_in: Int
    roleId: Int
  }

  type Application {
    id: Int!
    name: String!
    description: String
    token: String!
    expires_in: Int
    roleId: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    role: Role!
    application_logs: [ActivityLog!]!
  }

  type Query {
    applications(pagination: Pagination): [Application!]!
    application(id: Int!): Application!
  }

  type Mutation {
    createApplication(data: CreateApplicationInput!): Application!
    updateApplication(id: Int!, data: UpdateApplicationInput!): Application!
    deleteApplication(id: Int!): Application!
  }
`;
