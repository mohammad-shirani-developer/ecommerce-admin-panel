"use client";

import React from "react";

export type SortDirection = "asc" | "desc";

export interface TableColumn<K extends PropertyKey> {
  key: K;
  label: string;
  sortable?: boolean;
  className?: string;
}

interface TableProps<T, K extends keyof T> {
  data: T[];
  columns: readonly TableColumn<K>[];
  sortBy: K;
  sortDirection: SortDirection;
  onSort: (key: K) => void;
  renderRow: (item: T) => React.ReactNode;
  emptyMessage?: string;
}

const Table = <T, K extends keyof T>({
  data,
  columns,
  sortBy,
  sortDirection,
  onSort,
  renderRow,
  emptyMessage = "داده‌ای برای نمایش وجود ندارد",
}: TableProps<T, K>) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border border-gray-700 text-sm text-right">
        <thead className="bg-gray-800 text-gray-200">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className={`px-4 py-2 border-b border-gray-700 select-none ${
                  column.sortable ? "cursor-pointer hover:text-white" : ""
                } ${column.className ?? ""}`}
                onClick={() =>
                  column.sortable ? onSort(column.key) : undefined
                }
              >
                <div className="flex items-center gap-1 justify-end">
                  <span>{column.label}</span>
                  {column.sortable && sortBy === column.key && (
                    <span className="text-xs">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                </div>
              </th>
            ))}
            <th className="px-4 py-2 border-b border-gray-700">عملیات</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="px-4 py-6 text-center text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map(renderRow)
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
