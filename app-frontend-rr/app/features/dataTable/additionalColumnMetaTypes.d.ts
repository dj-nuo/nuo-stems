// Type augmentation for TanStack Table column meta
// see https://tanstack.com/table/v8/docs/api/core/column-def#meta

import type { RowData } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    align?: "left" | "center" | "right";
  }
}
