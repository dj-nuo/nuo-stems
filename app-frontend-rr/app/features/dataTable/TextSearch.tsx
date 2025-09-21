"use no memo";
import type { Table } from "@tanstack/react-table";
import { Input } from "~/components/ui/input";

export default function TextSearch({ table }: { table: Table<any> }) {
  return (
    <Input
      placeholder="Filter table..."
      value={(table.getState().globalFilter as string) ?? ""}
      onChange={(event) => table.setGlobalFilter(event.target.value)}
      className="max-w-sm"
    />
  );
}
