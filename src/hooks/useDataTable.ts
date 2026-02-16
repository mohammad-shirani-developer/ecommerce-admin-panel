import { filterItems } from "@/utils/filterItems";
import { paginate } from "@/utils/paginate";
import { sortItems } from "@/utils/sortItems";
import { useMemo, useState } from "react";

/**
 * جهت مرتب‌سازی
 */
export type SortDirection = "asc" | "desc";

/**
 * تنظیمات hook
 */
interface UseDataTableOptions<T, SortKey extends keyof T> {
  data: T[];
  searchableKeys: (keyof T)[];
  initialSortBy: SortKey;
  pageSize?: number;
}

/**
 * Generic Data Table Hook
 * قابل استفاده برای Users / Products / هر دیتای دیگر
 */
export const useDataTable = <T, SortKey extends keyof T>({
  data,
  searchableKeys,
  initialSortBy,
  pageSize = 5,
}: UseDataTableOptions<T, SortKey>) => {
  // ===== state =====
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState<SortKey>(initialSortBy);
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // ===== processed data =====
  const processedData = useMemo(() => {
    const filtered = filterItems(data, search, searchableKeys);
    return sortItems(filtered, sortBy, sortDirection);
  }, [data, search, searchableKeys, sortBy, sortDirection]);

  const paginatedData = useMemo(
    () => paginate(processedData, page, pageSize),
    [processedData, page, pageSize],
  );

  // ===== actions =====
  const handleSort = (key: SortKey) => {
    setPage(1);

    if (sortBy === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(key);
      setSortDirection("asc");
    }
  };

  // ===== exposed API =====
  return {
    // data
    data: paginatedData,
    total: processedData.length,

    // state
    search,
    page,
    pageSize,
    sortBy,
    sortDirection,

    // setters
    setSearch,
    setPage,

    // actions
    handleSort,
  };
};
