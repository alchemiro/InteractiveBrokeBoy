import React from "react";
import stonks from "../assets/img/stonks.webp";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const nav = useNavigate();
  return (
    <div className="flex flex-col justify-center p-5 mt-24 text-center">
      <h1 className="text-4xl text-white underline mb-25">Home</h1>

      <div className="p-10 mx-auto">
        <img src={stonks} alt="logo" />
      </div>

      <div className="">
        <span className="text-2xl text-white sm:text-2xl">
          Full Tracking Your Expenses and Income
        </span>
      </div>

      <button
        className="h-10 mx-auto mt-16 text-lg text-white rounded-b-lg w-36 bg-red-lite animate-bounce"
        onClick={() => {
          nav("/expenses");
        }}
      >
        Let's Begin
      </button>
    </div>
  );
};
