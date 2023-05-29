import { gql } from "graphql-tag";

export const AuthSchema = gql`
  input LoginInput {
    email: String!
    password: String!
  }

  type LoginResponse {
    user: User
    accessToken: String
  }

  type Mutation {
    login(data: LoginInput!): LoginResponse!
  }
`;
