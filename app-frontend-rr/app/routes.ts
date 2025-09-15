import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/home.tsx"),
    route("/traktor-utilities", "routes/traktor-utilities.tsx"),
    route("/traktor-pro-4", "routes/traktor-pro-4.tsx"),
    route("/queue", "routes/queue.tsx"),
    route("/settings", "routes/settings.tsx"),
  ]),
] satisfies RouteConfig;
