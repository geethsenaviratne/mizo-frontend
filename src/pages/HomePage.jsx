import Header from "../components/header";
import { Routes } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="h-screen w-full">
      <Header />
      <Routes path = "/*"></Routes>
      <main className="p-6">Welcome to the home page.</main>
    </div>
  );
}
