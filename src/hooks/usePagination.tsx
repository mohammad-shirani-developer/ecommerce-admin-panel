import { useState } from "react";

export const usePagination = <T extends object>(
  items: T[],
  itemsPerPage: number,
) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return {
    currentItems,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  };
};
