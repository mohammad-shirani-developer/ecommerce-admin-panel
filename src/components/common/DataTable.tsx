"use client";

import { SortDirection } from "@/types/table";

export interface Column<T, SortKey extends keyof T> {
  key: SortKey;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T, SortKey extends keyof T> {
  data: T[];
  columns: Column<T, SortKey>[];
  sortBy: SortKey;
  sortDirection: SortDirection;
  onSort: (key: SortKey) => void;
}

const DataTable = <T, SortKey extends keyof T>({
  data,
  columns,
  sortBy,
  sortDirection,
  onSort,
}: DataTableProps<T, SortKey>) => {
  return (
    <table className="w-full text-right table-auto border border-gray-700 text-sm">
      <thead className="bg-gray-800 text-gray-200">
        <tr>
          {columns.map((col) => (
            <th
              key={String(col.key)}
              onClick={() => col.sortable && onSort(col.key)}
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
        {data.map((item, index) => (
          <tr key={index} className="hover:bg-gray-700 transition-colors">
            {columns.map((col) => (
              <td
                key={String(col.key)}
                className="px-4 py-2 border-b border-gray-700"
              >
                {col.render ? col.render(item) : String(item[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
