export const paginate = <T>(
  items: T[],
  currentPage: number,
  pageSize: number
): T[] => {
  const start = (currentPage - 1) * pageSize;
  return items.slice(start, start + pageSize);
};
