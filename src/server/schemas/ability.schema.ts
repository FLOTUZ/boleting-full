import { gql } from "graphql-tag";
export const AbilitySchema = gql`
  input CreateAbilityInput {
    name: String!
    description: String
  }

  input UpdateAbilityInput {
    name: String
    description: String
  }

  type Ability {
    id: Int!
    name: String!
    description: String
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
    roles: [Role!]
  }

  type Query {
    abilitys(pagination: Pagination): [Ability!]!
    ability(id: Int!): Ability!
  }

  type Mutation {
    createAbility(data: CreateAbilityInput!): Ability!
    updateAbility(id: Int!, data: UpdateAbilityInput!): Ability!
    deleteAbility(id: Int!): Ability!
  }
`;
