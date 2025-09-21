"use no memo";

import {
  useState,
  type CSSProperties,
  type Dispatch,
  type SetStateAction,
} from "react";

import {
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  // getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
  type Table as ReactTableInstance,
  type ColumnDef,
  type RowData,
  type Row,
  type RowSelectionState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import { HeaderCell } from "./HeaderCell";

export function useDataTable<TData extends RowData & { id: string }>(props: {
  data: TData[];
  columns: ColumnDef<TData>[];
}) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    id: false, //hide the id column by default
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data: props.data,
    columns: props.columns,
    getRowId: (row) => row.id,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(), // not using, because virtualized
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return { table };
}

export default function DataTableView({
  table,
  setData,
}: {
  table: ReactTableInstance<any>;
  setData: Dispatch<SetStateAction<any[]>>;
}) {
  // reorder rows after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    // Get selected ids
    const selectedRowIds = table
      .getSelectedRowModel()
      .rows.map((row) => String(row.id));
    const activeIsSelected = selectedRowIds.includes(activeId);

    // Multi-row drag only when the active item is selected and there is >1 selected
    if (activeIsSelected && selectedRowIds.length > 1) {
      const selectedSet = new Set(selectedRowIds);

      // If dropping onto an item that's part of the selection - nothing to do
      if (selectedSet.has(overId)) return;

      setData((prev) => {
        const originalActiveIndex = prev.findIndex(
          (item) => String(item.id) === activeId
        );
        const originalOverIndex = prev.findIndex(
          (item) => String(item.id) === overId
        );
        if (originalOverIndex === -1 || originalActiveIndex === -1) return prev;

        // Indices of selected items in the original data (sorted)
        const selectedIndices = selectedRowIds
          .map((id) => prev.findIndex((item) => String(item.id) === id))
          .filter((i) => i !== -1)
          .sort((a, b) => a - b);

        // How many selected items were located before the original over index
        const numSelectedBeforeTarget = selectedIndices.filter(
          (i) => i < originalOverIndex
        ).length;

        // Map the over index into the "cleaned" array (data without selected rows)
        let targetIndexInCleaned = originalOverIndex - numSelectedBeforeTarget;

        // If moving downward (over is after active) we want to insert after the over item
        if (originalOverIndex > originalActiveIndex) {
          targetIndexInCleaned = targetIndexInCleaned + 1;
        }

        // Build cleaned array and preserve relative order of selected rows
        const cleaned = prev.filter(
          (item) => !selectedSet.has(String(item.id))
        );
        const selectedRows = prev.filter((item) =>
          selectedSet.has(String(item.id))
        );

        // Clamp
        const clampedTarget = Math.max(
          0,
          Math.min(cleaned.length, targetIndexInCleaned)
        );

        return [
          ...cleaned.slice(0, clampedTarget),
          ...selectedRows,
          ...cleaned.slice(clampedTarget),
        ];
      });
      return;
    }

    // Single-row drag as a fallback
    setData((prev) => {
      const oldIndex = prev.findIndex(
        (item: any) => String(item.id) === activeId
      );
      const newIndex = prev.findIndex(
        (item: any) => String(item.id) === overId
      );
      if (oldIndex === -1 || newIndex === -1) return prev;
      return arrayMove(prev, oldIndex, newIndex);
    });
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  return (
    <div className="w-full h-full">
      <div className="rounded-md h-full overflow-hidden">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={table.getRowModel().rows.map((r) => r.id)}
            strategy={verticalListSortingStrategy}
          >
            <Table containerClassName="w-full h-full rounded-md overflow-auto [overflow-anchor:none]">
              <TableHeader className="sticky top-0 z-10 bg-background rounded-md shadow-xs">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          <HeaderCell header={header} />
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table
                    .getRowModel()
                    .rows.map((row) => <DraggableRow key={row.id} row={row} />)
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={table.getAllColumns()?.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
}

// Drag handle for rows
export function DragHandle(props: { rowId: string }) {
  const { attributes, listeners } = useSortable({ id: props.rowId });

  return (
    <button
      {...attributes}
      {...listeners}
      className="cursor-grab p-0"
      title="Drag to reorder"
    >
      🟰
    </button>
  );
}

// Row Component
function DraggableRow({ row }: { row: Row<any> }) {
  const { setNodeRef, transform, transition, isDragging } = useSortable({
    id: row.id,
  });

  // const isSelected = row.getIsSelected();

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform), //let dnd-kit do its thing
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: "relative",
  };

  return (
    <TableRow
      ref={setNodeRef}
      className="border-none"
      style={style}
      key={row.id}
      data-state={row.getIsSelected() && "selected"}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell
          className="border-none py-1"
          key={cell.id}
          style={{ width: cell.column.getSize() }}
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}
