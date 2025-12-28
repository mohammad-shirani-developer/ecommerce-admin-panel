export const filterItems = <T, K extends readonly (keyof T)[]>(
  items: T[],
  search: string,
  keys: K
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
