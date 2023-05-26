import { gql } from "@apollo/client";

export interface Args {
  pagination?: Pagination;
}

export interface Pagination {
  take?: number;
  skip?: number;
}

export const ArgsSchema = gql`
  input Pagination {
    take: Int
    skip: Int
  }
`;
