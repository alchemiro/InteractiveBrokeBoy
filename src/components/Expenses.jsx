import React from "react";
import { H1 } from "../components/ui/H1";
import { mocks } from "../data/mock";

export const Expenses = () => {
  return (
    <main className="flex justify-center">
      <div className="flex flex-col justify-center p-6 text-center">
        <H1 className="text-teal-500">Expenses</H1>
        <input
          type="text"
          placeholder="Search..."
          className="p-2 m-2 mx-auto mt-8 text-gray-800 bg-gray-200 w-72 rounded-xl"
        />
      </div>
      <div className="flex flex-wrap justify-center gap-2 p-5">
        {mocks?.map((mock) => (
          <div
            key={mock.id}
            className="w-4/5 max-w-sm p-4 text-left text-white "
          >
            <h3 className="text-xl font-bold text-center">{mock.title}</h3>
            <p className="text-lg font-semibold">{mock.amount}</p>
            <p className="text-zinc-500">{mock.date}</p>
            <p className="text-zinc-500">{mock.rating}</p>
          </div>
        ))}
      </div>
    </main>
  );
};
