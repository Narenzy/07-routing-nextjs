"use client";

import css from "./Pagination.module.css";
import ReactPaginate from "react-paginate";

// const ReactPaginate = (
//   ReactPaginateModule as unknown as ModuleWithDefault<
//     ComponentType<ReactPaginateProps>
//   >
// ).default;
// type ModuleWithDefault<T> = { default: T };

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="←"
      nextLabel="→"
    />
  );
}
