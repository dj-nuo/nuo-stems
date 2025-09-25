import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { Badge } from "~/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, FolderInput, FolderSearch } from "lucide-react";
import { Button } from "~/components/ui/button";
import { DragHandle } from "../dataTable/DataTable";
import { IconCircleCheckFilled, IconLoader } from "@tabler/icons-react";
import type { QueueItem } from "@shared/sharedTypes";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<QueueItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="ml-1"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="ml-1"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 10,
  },
  {
    accessorKey: "draggable",
    header: "",
    cell: ({ row }) => <DragHandle rowId={row.id} />,
    enableSorting: false,
    enableHiding: false,
    size: 10,
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.progress === 100 ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (
          <IconLoader />
        )}
        {row.original.progress}%
      </Badge>
    ),
    enableSorting: false,
    size: 10,
    enableHiding: false,
  },
  {
    accessorKey: "picture",
    header: "Cover",
    meta: { align: "center" },
    cell: ({ row }) =>
      row.original.picture ? (
        <img
          src={row.original.picture}
          alt="Cover"
          className="w-8 h-8 object-cover rounded-xs shadow"
        />
      ) : (
        <div className="w-8 h-8 bg-muted rounded-xs shadow flex items-center justify-center text-xs text-muted-foreground mx-1">
          N/A
        </div>
      ),
    enableSorting: false,
    enableHiding: false,
    size: 20,
  },
  {
    accessorKey: "fileExtension",
    header: "ext",
    meta: { align: "center" },
    cell: ({ row }) => (
      <div className="text-center mx-1">{row.original.fileExtension || ""}</div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 8,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "artist",
    header: "Artist",
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("artist")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="text-right">{row.getValue("duration")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "output",
    header: "Output",
    meta: { align: "center" },
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <FolderSearch
              className="size-4 cursor-pointer"
              onClick={() => alert(row.getValue("output"))}
            />
          </TooltipTrigger>
          <TooltipContent side="left">{row.getValue("output")}</TooltipContent>
        </Tooltip>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
