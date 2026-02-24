"use client";

import { SortDirection } from "@/types/table";
import React from "react";

export interface Column<T, SortKey extends keyof T> {
  key: SortKey | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<
  T extends { id: string | number },
  SortKey extends keyof T,
> {
  data: T[];
  columns: Column<T, SortKey>[];
  sortBy: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

const DataTable = <T extends { id: string | number }, SortKey extends keyof T>({
  data,
  columns,
  sortBy,
  sortDirection,
  onSort,
}: DataTableProps<T, SortKey>) => {
  return (
    <>
      <table className="w-full text-right table-auto border border-gray-700 text-sm">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th
                key={`header-${index}`} // 👈 دیگر به col.key وابسته نیست
                onClick={() =>
                  col.sortable &&
                  typeof col.key !== "string" &&
                  onSort(col.key as SortKey)
                }
                className={`px-4 py-2 border-b border-gray-700 select-none ${
                  col.sortable ? "cursor-pointer hover:text-white" : ""
                }`}
              >
                {col.label}
                {col.sortable && sortBy === col.key && (
                  <span className="mr-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-700 transition-colors">
              {columns.map((col, index) => (
                <td
                  key={`${item.id}-${index}`} // 👈 کاملاً یکتا
                  className="px-4 py-2 border-b border-gray-700"
                >
                  {col.render
                    ? col.render(item)
                    : typeof col.key !== "string"
                      ? String(item[col.key])
                      : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
