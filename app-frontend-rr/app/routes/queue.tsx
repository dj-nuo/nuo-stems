import React, { useMemo } from "react";
import ColumsSelector from "~/features/dataTable/ColumsSelector";
import DataTableView, { useDataTable } from "~/features/dataTable/DataTable";
import RowsSelected from "~/features/dataTable/RowsSelected";
import { TopTiles } from "~/features/queue/topTiles/TopTiles";
import TextSearch from "~/features/dataTable/TextSearch";
import { columns } from "~/features/queue/dataColumns";
import { generateDummyPayments } from "~/features/queue/dummyData";
import { useState } from "react";

export default function QueuePage() {
  "use no memo";
  const initialData = generateDummyPayments(10);
  const [data, setData] = useState(initialData);
  const memoizedColumns = useMemo(() => columns, []);

  const { table } = useDataTable({ data: data, columns: memoizedColumns });
  return (
    <>
      <div className="w-full h-full">
        <TopTiles
          processed={{
            inProgress: 10,
            completed: 0,
            trackDurationInProgress: 0,
            trackDurationCompleted: 0,
          }}
          benchmark={0}
          timeRemaining={"0:00:00"}
        />
      </div>
      <div className="p-2 flex items-center gap-2">
        <ColumsSelector table={table} />
        <RowsSelected table={table} />
        <TextSearch table={table} />
      </div>
      <DataTableView table={table} setData={setData} />
    </>
  );
}
