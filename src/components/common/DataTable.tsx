"use client";

import { SortDirection } from "@/types/table";
import React from "react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T extends { id: string | number }> {
  data: T[];
  columns: Column<T>[];
  sortBy: keyof T;
  sortDirection: SortDirection;
  onSort: (key: keyof T) => void;
}

const DataTable = <T extends { id: string | number }>({
  data,
  columns,
  sortBy,
  sortDirection,
  onSort,
}: DataTableProps<T>) => {
  return (
    <table className="w-full text-right table-auto border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr>
          {columns.map((col, index) => {
            const isSortable = col.sortable && typeof col.key !== "string";

            return (
              <th
                key={`header-${index}`}
                onClick={() => isSortable && onSort(col.key as keyof T)}
                className={`px-4 py-2 border-b border-gray-700 select-none ${
                  isSortable ? "cursor-pointer hover:text-white" : ""
                }`}
              >
                {col.label}

                {isSortable && sortBy === col.key && (
                  <span className="mr-1">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            );
          })}
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id} className="hover:bg-gray-700 transition-colors">
            {columns.map((col, index) => (
              <td
                key={`${item.id}-${index}`}
                className="px-4 py-2 border-b border-gray-700"
              >
                {col.render
                  ? col.render(item)
                  : col.key in item
                    ? String(item[col.key as keyof T])
                    : null}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
