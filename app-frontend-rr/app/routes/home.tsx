import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "NUO-STEMS 4 App" },
    { name: "description", content: "Welcome to NUO-STEMS 4 App!" },
  ];
}

export default function Home() {
  return <div>Home</div>;
}
