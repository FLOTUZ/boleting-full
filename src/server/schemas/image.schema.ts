import { gql } from "graphql-tag";
export const ImageSchema = gql`
  input CreateImageInput {
    original_name: String
    new_name: String!
    size: Int!
    url: String!
  }

  input UpdateImageInput {
    original_name: String
    new_name: String
    size: Int
    url: String
  }

  type Image {
    id: String!
    original_name: String
    new_name: String!
    size: Int!
    url: String!
    mime_type: String
    createdAt: DateTime!
    updatedAt: DateTime
    deleted: Boolean!
    deletedAt: DateTime
  }

  type Query {
    images(pagination: Pagination): [Image!]!
    image(id: String!): Image!
  }

  type Mutation {
    createImage(data: CreateImageInput!): Image!
    updateImage(id: String!, data: UpdateImageInput!): Image!
    deleteImage(id: String!): Image!
  }
`;
