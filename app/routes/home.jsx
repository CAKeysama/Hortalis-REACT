import { Welcome } from "../welcome/welcome";

export function meta({}) {
  return [
    { title: "TESTE GUSTAVO X DAN" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return <Welcome />;
}
