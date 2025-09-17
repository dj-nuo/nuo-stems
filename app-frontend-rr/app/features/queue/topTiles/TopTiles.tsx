import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function TopTiles(props: {
  processed: {
    inProgress: number;
    completed: number;
    trackDurationInProgress: number;
    trackDurationCompleted: number;
  };
  benchmark: number;
  timeRemaining: string;
}) {
  return (
    <div className="w-full @container/main">
      <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @3xl/main:grid-cols-3">
        <Card className="@container/card p-0">
          <CardHeader className="flex flex-1 flex-col items-center justify-center">
            <CardDescription>Processed</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {props?.processed?.completed} / {props?.processed?.inProgress}
            </CardTitle>
            <Badge variant="outline">
              {props?.processed?.trackDurationCompleted} /{" "}
              {props?.processed?.trackDurationInProgress}
            </Badge>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-1 flex-col items-center justify-center">
            <CardDescription>Time Remaining</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {props?.timeRemaining}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card className="@container/card">
          <CardHeader className="flex flex-1 flex-col items-center justify-center">
            <CardDescription>Benchmark</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {props?.benchmark}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
