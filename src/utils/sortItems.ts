export type SortDirection = "asc" | "desc";

export const sortItems = <T, K extends keyof T>(
  items: T[],
  sortBy: K,
  direction: SortDirection = "asc"
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal == null || bVal == null) return 0;

    // number
    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    // string
    if (typeof aVal === "string" && typeof bVal === "string") {
      return direction === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return 0;
  });
};
