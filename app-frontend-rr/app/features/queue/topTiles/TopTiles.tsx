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
  const completionPercentage =
    props.processed.inProgress > 0
      ? Math.round(
          (props.processed.completed / props.processed.inProgress) * 100
        )
      : 0;

  return (
    <div className="w-full @container/main">
      <div className="grid gap-4 grid-cols-3">
        {/* Progress Card */}
        <Card className="group @container/card relative overflow-hidden border-0 bg-gradient-to-br from-violet-500 via-purple-500 to-purple-600 p-0 shadow-lg shadow-violet-500/25 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/30 dark:from-violet-600 dark:via-purple-600 dark:to-purple-700 dark:shadow-violet-600/25 dark:hover:shadow-violet-600/30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 backdrop-blur-md" />
          <CardHeader className="relative flex h-24 flex-col justify-between p-4 text-white @sm/card:h-28">
            <div className="flex items-center justify-between">
              <CardDescription className="text-violet-100 font-medium text-sm uppercase tracking-wide">
                Processed
              </CardDescription>
              <div className="ml-2 flex h-2 w-16 overflow-hidden rounded-full bg-white/20 backdrop-blur-sm border border-white/10">
                <div
                  className="h-full bg-white/90 transition-all duration-500 ease-out backdrop-blur-sm"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tabular-nums leading-none @sm/card:text-3xl">
                {props?.processed?.completed}{" "}
                <span className="text-xl text-violet-200">/</span>{" "}
                {props?.processed?.inProgress}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="bg-white/15 text-white border border-white/10 text-xs font-medium backdrop-blur-md shadow-lg"
                ></Badge>
                <span className="text-xs text-violet-200 font-medium">
                  {props?.processed?.trackDurationCompleted}m /{" "}
                  {props?.processed?.trackDurationInProgress}m
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Time Remaining Card */}
        <Card className="group @container/card relative overflow-hidden border-0 bg-gradient-to-br from-orange-400 via-red-400 to-red-500 p-0 shadow-lg shadow-orange-500/25 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/30 dark:from-orange-500 dark:via-red-500 dark:to-red-600 dark:shadow-orange-600/25 dark:hover:shadow-orange-600/30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <CardHeader className="relative flex h-24 flex-col justify-between p-4 text-white @sm/card:h-28">
            <CardDescription className="text-orange-100 font-medium text-sm uppercase tracking-wide">
              Time Remaining
            </CardDescription>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tabular-nums leading-none @sm/card:text-3xl">
                {props?.timeRemaining}
              </CardTitle>
              <div className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-200 animate-pulse" />
                <span className="ml-2 text-xs text-orange-200 font-medium">
                  Processing...
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Benchmark Card */}
        <Card className="group @container/card relative overflow-hidden border-0 bg-gradient-to-br from-teal-400 via-cyan-400 to-blue-500 p-0 shadow-lg shadow-cyan-500/25 transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/30 dark:from-teal-500 dark:via-cyan-500 dark:to-blue-600 dark:shadow-cyan-600/25 dark:hover:shadow-cyan-600/30">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <CardHeader className="relative flex h-24 flex-col justify-between p-4 text-white @sm/card:h-28">
            <CardDescription className="text-cyan-100 font-medium text-sm uppercase tracking-wide">
              Benchmark
            </CardDescription>
            <div className="space-y-1">
              <CardTitle className="text-2xl font-bold tabular-nums leading-none @sm/card:text-3xl">
                {props?.benchmark}
              </CardTitle>
              <div className="flex items-center">
                <div className="flex space-x-1">
                  <div className="h-1 w-1 rounded-full bg-cyan-200" />
                  <div className="h-1 w-2 rounded-full bg-cyan-200" />
                  <div className="h-1 w-3 rounded-full bg-cyan-200" />
                </div>
                <span className="ml-2 text-xs text-cyan-200 font-medium">
                  Performance
                </span>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
