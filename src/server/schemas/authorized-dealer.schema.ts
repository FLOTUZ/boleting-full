import { gql } from "graphql-tag";
export const AuthorizedDealerSchema = gql`
  input CreateAuthorizedDealerInput {
    name: String!
    description: String
    telephone: String!
    email: String!
    commision: Decimal!
    address: String!
  }

  input UpdateAuthorizedDealerInput {
    name: String
    description: String
    telephone: String
    email: String
    commision: Decimal
    address: String
  }

  type AuthorizedDealer {
    id: Int!
    name: String!
    description: String
    telephone: String!
    email: String!
    commision: Decimal!
    address: String!
    userId: Int
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    user: User
    recibed_payments: [PaymentRecibed!]
    events: [Event!]
    orders: [Order!]
  }

  type Query {
    authorizedDealers(pagination: Pagination): [AuthorizedDealer!]!
    authorizedDealer(id: Int!): AuthorizedDealer!
  }

  type Mutation {
    createAuthorizedDealer(
      data: CreateAuthorizedDealerInput!
    ): AuthorizedDealer!
    updateAuthorizedDealer(
      id: Int!
      data: UpdateAuthorizedDealerInput!
    ): AuthorizedDealer!
    deleteAuthorizedDealer(id: Int!): AuthorizedDealer!
  }
`;
