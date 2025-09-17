import React from "react";
import { TopTiles } from "~/features/queue/topTiles/TopTiles";

export default function QueuePage() {
  return (
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
  );
}
