import { gql } from "@apollo/client";

export interface PaginatedList<T> {
  pagination: PaginationResponse;
  count: number;
  data: T[];
}

export interface Args {
  pagination?: Pagination;
}

export interface Pagination {
  take?: number;
  skip?: number;
}
export interface PaginationResponse {
  take: number;
  skip: number;
  pages?: number;
  nextPage?: number;
  prevPage?: number;
  currentPage?: number;
}

export const ArgsSchema = gql`
  input Pagination {
    take: Int
    skip: Int
  }

  type PaginationResponse {
    take: Int!
    skip: Int!
    pages: Int
    nextPage: Int
    prevPage: Int
    currentPage: Int
  }
`;
