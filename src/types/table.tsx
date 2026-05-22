import type {
  ComponentType,
  HTMLAttributes,
  TableHTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes
} from "react";

export type TableRootProps = HTMLAttributes<HTMLTableElement>
export type TableSectionProps = HTMLAttributes<HTMLTableSectionElement>
export type TableRowProps = HTMLAttributes<HTMLTableRowElement>
export type TableHeadProps = ThHTMLAttributes<HTMLTableCellElement>
export type TableCellProps = TdHTMLAttributes<HTMLTableCellElement>

export type TableInjectedComponents = {
  Table?: ComponentType<TableRootProps>
  TableHeader?: ComponentType<TableSectionProps>
  TableBody?: ComponentType<TableSectionProps>
  TableRow?: ComponentType<TableRowProps>
  TableHead?: ComponentType<TableHeadProps>
  TableCell?: ComponentType<TableCellProps>
}

export const DefaultTable = (props: TableHTMLAttributes<HTMLTableElement>) => <table {...props} />
export const DefaultTableHeader = (props: HTMLAttributes<HTMLTableSectionElement>) => <thead {...props} />
export const DefaultTableBody = (props: HTMLAttributes<HTMLTableSectionElement>) => <tbody {...props} />
export const DefaultTableRow = (props: HTMLAttributes<HTMLTableRowElement>) => <tr {...props} />
export const DefaultTableHead = (props: ThHTMLAttributes<HTMLTableCellElement>) => <th {...props} />
export const DefaultTableCell = (props: TdHTMLAttributes<HTMLTableCellElement>) => <td {...props} />