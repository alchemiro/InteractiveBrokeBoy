import React, { useEffect, useState } from "react";

import { Trash2, Pencil } from "lucide-react";

import { getIcon } from "../lib/utils";


export const Transactions = ({ items ,setIsOpen, isOpen}) => {
  return (
    <>
    {items.map((expense) => (
          <div
            className="w-full max-w-md p-6 m-3 text-center text-white transition-transform transform bg-gray-800 border border-gray-700 shadow-lg hover:shadow-xl rounded-xl hover:scale-105 hover:bg-opacity-90 hover:text-gray-100"
            key={expense.id}
          >
            <div className="flex justify-end gap-3">
              <Trash2
                className="w-5 h-5 text-red-500 cursor-pointer"
                onClick={() => openDeleteModal(expense)}
              />
              <Pencil
                className="w-5 h-5 cursor-pointer text-sky-400"
                onClick={() => openEditModal(expense)}
              />
            </div>
            <span className="text-2xl font-semibold break-words sm:text-xl">
              {expense.title}
            </span>

            <div className="flex items-center w-2/3 mt-4 sm:w-full">
              <span className="px-2 text-xl sm:text-lg sm:px-8 sm:mx-auto">
                ₪{Number(expense.amount).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between mt-12">
              <span className="px-2 mr-auto text-xl text-zinc-500 sm:text-lg">
                {new Date(expense.date).toLocaleDateString()}
              </span>
              <span className="text-zinc-500">{getIcon(expense.rating)}</span>
            </div>
          </div>
        ))}
    </>
  )
}
