import { gql } from "graphql-tag";
export const MailSchema = gql`
  input CreateMailInput {
    to: String!
    subject: String!
    body: String!
    userId: Int
    user_clientId: Int
  }

  input UpdateMailInput {
    to: String
    subject: String
    body: String
    userId: Int
    user_clientId: Int
  }

  type Mail {
    id: Int!
    to: String!
    from: String!
    subject: String!
    body: String!
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
    mails(pagination: Pagination): [Mail!]!
    mail(id: Int!): Mail!
  }

  type Mutation {
    createMail(data: CreateMailInput!): Mail!
    updateMail(id: Int!, data: UpdateMailInput!): Mail!
    deleteMail(id: Int!): Mail!
  }
`;
