import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useEffect, useMemo, useState } from "react";

export type SortDirection = "asc" | "desc";

interface UseDataTableOptions<T, SortKey extends keyof T> {
  data: T[];
  searchableKeys: (keyof T)[];
  initialSortBy: SortKey;
  pageSize?: number;
}

export const useDataTable = <T, SortKey extends keyof T>({
  data,
  searchableKeys,
  initialSortBy,
  pageSize = 5,
}: UseDataTableOptions<T, SortKey>) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortKey>(initialSortBy);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  useEffect(() => {
    setPage(1);
  }, [search]);

  const processedData = useMemo(() => {
    const filtered = filterItems(data, search, searchableKeys);
    return sortItems(filtered, sortBy, sortDirection);
  }, [data, search, searchableKeys, sortBy, sortDirection]);

  const paginatedData = useMemo(
    () => paginate(processedData, page, pageSize),
    [processedData, page, pageSize],
  );

  const handleSort = (key: SortKey) => {
    setPage(1);

    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  return {
    data: paginatedData,
    total: processedData.length,

    search,
    page,
    pageSize,
    sortBy,
    sortDirection,

    setSearch,
    setPage,
    handleSort,
  };
};
