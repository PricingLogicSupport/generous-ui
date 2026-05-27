import type { ReactNode, TableHTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface DataTableColumn<Row> {
  key: string;
  header: ReactNode;
  cell: (row: Row) => ReactNode;
  align?: "start" | "end";
}

export interface DataTableProps<Row> extends TableHTMLAttributes<HTMLTableElement> {
  caption: string;
  columns: DataTableColumn<Row>[];
  rows: Row[];
  getRowKey: (row: Row, index: number) => string;
}

export function DataTable<Row>({
  caption,
  columns,
  rows,
  getRowKey,
  className,
  ...props
}: DataTableProps<Row>) {
  return (
    <div className="gui-table-wrap">
      <table className={cn("gui-table", className)} {...props}>
        <caption>{caption}</caption>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-align={column.align ?? "start"}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={getRowKey(row, index)}>
              {columns.map((column) => (
                <td key={column.key} data-align={column.align ?? "start"}>
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
