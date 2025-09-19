import React, { useMemo, useState } from "react";
import ColumsSelector from "~/features/dataTable/ColumsSelector";
import DataTableView, { useDataTable } from "~/features/dataTable/DataTable";
import RowsSelected from "~/features/dataTable/RowsSelected";
import { TopTiles } from "~/features/queue/topTiles/TopTiles";
import TextSearch from "~/features/dataTable/TextSearch";
import { columns } from "~/features/queue/dataColumns";
import { generateDummyPayments } from "~/features/queue/dummyData";

export default function QueuePage() {
  const processed = useMemo(
    () => ({
      inProgress: 10,
      completed: 0,
      trackDurationInProgress: 0,
      trackDurationCompleted: 0,
    }),
    []
  );
  const debugBorder = false ? "shadow-[inset_0_0_0_4px_rgba(34,197,94,1)]" : "";
  return (
    <div className={`flex flex-col h-full ${debugBorder}`}>
      <div className="flex-0 p-2">
        <TopTiles
          processed={processed}
          benchmark={0}
          timeRemaining={"0:00:00"}
        />
      </div>
      <div className="flex-1 min-h-0">
        {/* min-h-0 - This is crucial so a child with overflow-y-auto can actually scroll instead of forcing parents to grow/overflow.
         */}
        <QueueTableSection />
      </div>
    </div>
  );
}

function QueueTableSection() {
  "use no memo";

  const initialData = generateDummyPayments(20);
  const [data, setData] = useState(initialData);
  const memoizedColumns = useMemo(() => columns, []);
  const { table } = useDataTable({ data: data, columns: memoizedColumns });

  return (
    <div className="w-full h-full flex flex-col min-h-0">
      <div className="p-2 flex items-center gap-2 shrink-0">
        <ColumsSelector table={table} />
        <RowsSelected table={table} />
        <TextSearch table={table} />
      </div>
      <div className="flex-1 min-h-0 overflow-hidden">
        <DataTableView table={table} setData={setData} />
      </div>
    </div>
  );
}
