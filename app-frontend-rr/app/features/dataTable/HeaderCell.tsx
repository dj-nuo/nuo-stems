"use no memo";
import { ArrowUpDown } from "lucide-react";
import { flexRender, type Header } from "@tanstack/react-table";

import { Button } from "~/components/ui/button";
import { cn } from "~/lib/utils";

type Align = "left" | "center" | "right";

function getAlignmentClasses(align: Align | undefined) {
  switch (align) {
    case "right":
      return { text: "text-right", justify: "justify-end" };
    case "center":
      return { text: "text-center", justify: "justify-center" };
    default:
      return { text: "text-left", justify: "justify-start" };
  }
}

export function HeaderCell<TData>({
  header,
}: {
  header: Header<TData, unknown>;
}) {
  if (header.isPlaceholder) return null;

  // Default alignment is "right" if not specified
  const align = header.column.columnDef.meta?.align ?? "left";
  const { text, justify } = getAlignmentClasses(align);

  if (header.column.getCanSort()) {
    return (
      <div className={cn("flex flex-row items-center gap-1", text, justify)}>
        <span className="truncate max-w-full">
          {flexRender(header.column.columnDef.header, header.getContext())}
        </span>
        <Button
          variant="ghost"
          onClick={header.column.getToggleSortingHandler()}
        >
          <ArrowUpDown className="shrink-0" />
        </Button>
      </div>
    );
  }

  return (
    <div className={cn("w-full", text)}>
      {flexRender(header.column.columnDef.header, header.getContext())}
    </div>
  );
}

export default HeaderCell;
