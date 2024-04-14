import { gql } from "graphql-tag";
export const UserClientSchema = gql`
  input CreateUserClientInput {
    name: String!
    last_name: String!
    email: String!
    password: String!
    roleId: Int!
  }

  input UpdateUserClientInput {
    name: String
    last_name: String
    email: String
    password: String
    roleId: Int
    deleted: Boolean
  }

  type UserClient {
    id: Int!
    name: String!
    last_name: String!
    email: String!
    password: String!
    roleId: Int!
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    atendee_of_events: [Event!]
    orders: [Order!]
    payment_cards: [PaymentCard!]
    # cashless_mediums: [Cashless!]
    # cashless_refills: [CashlessRefill!]
    notifications: [Notification!]
    mails: [Mail!]
    user_client_activity: [ActivityLog!]
    role: Role!
  }

  type Query {
    userClientIsAuthenticated: Boolean!
    userClients(pagination: Pagination): [UserClient!]!
    userClient(id: Int!): UserClient!
    currentClientOrders: [Order!]!
  }

  type Mutation {
    createUserClient(data: CreateUserClientInput!): UserClient!
    updateUserClient(id: Int!, data: UpdateUserClientInput!): UserClient!
    deleteUserClient(id: Int!): UserClient!
  }
`;
