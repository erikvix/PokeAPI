import React from "react";
import { Input } from "@/components/ui/input";

export default function index() {
  return (
    <header className="w-full">
      <div className="container">
        <h1 className="py-5 text-4xl font-bold">
          Search your favorite Pokemon
        </h1>
        <Input />
      </div>
    </header>
  );
}
