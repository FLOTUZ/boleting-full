import { PaginationResponse } from "@/gql/generated";
import { useState } from "react";

interface PaginateProps<T> {
  take: number;
  skip: number;
}

export const usePaginator = <T>(props: PaginateProps<T>) => {
  const [count, setCount] = useState<number>(0);
  const [paginator, setPaginator] = useState<PaginationResponse>({
    take: props.take,
    skip: props.skip,
    pages: 0,
    currentPage: 0,
    prevPage: null,
    nextPage: null,
  });

  const setTake = (take: number) => {
    setPaginator({ ...paginator, take });
  };

  const setSkip = (skip: number) => {
    setPaginator({ ...paginator, skip });
  };

  return {
    take: paginator.take,
    skip: paginator.skip,
    pages: paginator.pages!,
    currentPage: paginator.currentPage!,
    prevPage: paginator.prevPage || null,
    nextPage: paginator.nextPage || null,
    count,
    setTake,
    setSkip,
    setCount,
    setPaginator,
  };
};
