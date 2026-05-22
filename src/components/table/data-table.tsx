import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type RowSelectionState
} from "@tanstack/react-table"

import {useTranslation} from "react-i18next";
import {type Dispatch, type SetStateAction} from "react";
import {
  DefaultTable, DefaultTableBody, DefaultTableCell,
  DefaultTableHead,
  DefaultTableHeader, DefaultTableRow,
  type TableInjectedComponents
} from "../../types";
import {cn} from "../../lib/utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  getRowId: (row: TData) => string,
  selectionState: [RowSelectionState, Dispatch<SetStateAction<RowSelectionState>>],
  onClick: (data: TData) => void
  components?: TableInjectedComponents
}

export function DataTable<TData, TValue>({columns, data, getRowId, selectionState, onClick, components}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = selectionState

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      rowSelection
    },
    getRowId: getRowId,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel()
  });
  const { t } = useTranslation()
  const Table = components?.Table ?? DefaultTable
  const TableHeader = components?.TableHeader ?? DefaultTableHeader
  const TableBody = components?.TableBody ?? DefaultTableBody
  const TableRow = components?.TableRow ?? DefaultTableRow
  const TableHead = components?.TableHead ?? DefaultTableHead
  const TableCell = components?.TableCell ?? DefaultTableCell

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map(headerGroup => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map(header => {
              return (
                <TableHead
                  key={header.id}
                  className={cn(header.column.columnDef.meta?.className)}
                >
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              )
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map(row => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => onClick(row.original)}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell
                  key={cell.id}
                  className={cn(cell.column.columnDef.meta?.className)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-24 text-center">
              {t("libs:no_results")}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}