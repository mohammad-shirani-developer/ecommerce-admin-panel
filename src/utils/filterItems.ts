export const filterItems = <T extends Record<string, any>>(
  items: T[],
  search: string,
  keys: (keyof T)[]
): T[] => {
  if (!search.trim()) return items;

  const normalized = search.toLowerCase();

  return items.filter((item) =>
    keys.some((key) =>
      String(item[key] ?? "")
        .toLowerCase()
        .includes(normalized)
    )
  );
};
