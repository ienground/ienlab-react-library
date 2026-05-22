import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  useReactTable,
  type RowSelectionState} from "@tanstack/react-table"

import {
  DefaultTable, DefaultTableBody, DefaultTableCell,
  DefaultTableHead,
  DefaultTableHeader, DefaultTableRow,
  type TableInjectedComponents
} from "../../types";
import {cn} from "../../lib/utils";
import {useTranslation} from "react-i18next";
import {type Dispatch, type SetStateAction} from "react";

export type WithChildren<T> = T & {
  subRows?: WithChildren<T>[];
};

interface GroupedDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[],
  getRowId: (row: TData) => string,
  selectionState: [RowSelectionState, Dispatch<SetStateAction<RowSelectionState>>],
  onClick: (data: TData) => void
  components?: TableInjectedComponents
  indentSize?: number
}

export function GroupedDataTable<TData, TValue>({columns, data, getRowId, selectionState, onClick, components}: GroupedDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = selectionState

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data: data,
    columns: columns,
    state: {
      rowSelection,
      expanded: true
    },
    getRowId: getRowId,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    // ✨ 핵심: 테이블에게 자식이 어디 있는지 알려줌
    getSubRows: (row) => (row as WithChildren<TData>).subRows,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(), // 계층 구조 렌더링을 위해 필수
  })
  const { t } = useTranslation()
  const Table = components?.Table ?? DefaultTable
  const TableHeader = components?.TableHeader ?? DefaultTableHeader
  const TableBody = components?.TableBody ?? DefaultTableBody
  const TableRow = components?.TableRow ?? DefaultTableRow
  const TableHead = components?.TableHead ?? DefaultTableHead
  const TableCell = components?.TableCell ?? DefaultTableCell

  return (
    <Table
      style={{
        width: "100%",
      }}
    >
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
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
          table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              id={row.id}
              data-state={row.getIsSelected() && "selected"}
              onClick={() => onClick(row.original)}
            >
              {row.getVisibleCells().map((cell, index) => {
                // 첫 번째 컬럼(보통 체크박스나 제목)에 들여쓰기 적용
                // row.depth가 0이면 0px, 1이면 20px, 2면 40px...
                const indent = index === 0 ? row.depth * 24 : 0;

                return (
                  <TableCell
                    key={cell.id}
                    className={cn(cell.column.columnDef.meta?.className)}
                    style={{ paddingLeft: indent ? `${indent}px` : undefined }}
                  >
                    {/* 필요하다면 대댓글 아이콘(ㄴ) 추가 */}
                    {index === 0 && row.depth > 0 && <span className="mr-2 text-muted-foreground">↳</span>}

                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                )
              })}
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
  );
}