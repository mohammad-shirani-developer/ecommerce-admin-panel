export const sortItems = <T extends Record<string, any>>(
  items: T[],
  sortBy: keyof T,
  direction: "asc" | "desc" = "asc"
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (typeof aVal === "number" && typeof bVal === "number") {
      return direction === "asc" ? aVal - bVal : bVal - aVal;
    }

    return direction === "asc"
      ? String(aVal).localeCompare(String(bVal))
      : String(bVal).localeCompare(String(aVal));
  });
};
