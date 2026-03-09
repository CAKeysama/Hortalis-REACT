import { Welcome } from "../welcome/welcome";

export function meta({}) {
  return [
    { title: "TESTE DO RYAN X MATHEUS" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
