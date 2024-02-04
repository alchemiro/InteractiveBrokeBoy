import { React, useState, useEffect } from "react";
import { H1 } from "../components/ui/H1";
import { mocks } from "../data/mock";
import { Trash2, Pencil } from "lucide-react";
import { AddModal } from "./AddModal";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const { register, handleSubmit } = useForm();
  const [expenses, setExpenses] = useState([]);
  const onSubmit = (data) => {
    // console.log(data);
    const expense = [{ ...data, rating, id: uuidv4() }];
    // setExpenses([...expenses, expense]);
    localStorage.setItem("expenses", JSON.stringify(expense));
  };

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem("expenses"));

    if (expenses) {
      setExpenses(expenses);
    }
  }, [isOpen]);

  return (
    <main className="">
      <div className="flex flex-col justify-center p-6 text-center">
        <H1>Expenses</H1>
        <input
          className="w-10/12 p-2 m-2 mx-auto mt-8 text-gray-700 bg-gray-200 sm:w-72 rounded-xl"
          type="text"
          placeholder="Search Expenses..."
        />
      </div>
      <div className="flex max-sm:justify-center">
        <button
          className="w-8/12 p-2 mt-8 text-white border sm:w-72 lg:ml-5 bg-black/40 rounded-xl"
          onClick={() => setIsOpen(true)}
        >
          Add Expense
        </button>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        <div>
          {mocks?.map((expense) => (
            <div
              className="w-full max-w-sm p-6 m-3 text-center text-white border shadow-lg hover:-translate-y-1 hover:scale-100 shadow-red-500/10 bg-gray-500/10 border-gray rounded-2xl hover:shadow-black/40 xl:w-full lg:w-11/12 sm:m-0 sm:mb-4"
              key={expense.id}
            >
              <div className="flex justify-end gap-3">
                <Trash2 className="w-5 h-5 text-red-500 cursor-pointer" />
                <Pencil className="w-5 h-5 cursor-pointer text-sky-400" />
              </div>
              <span className="text-2xl font-semibold break-words sm:text-xl ">
                {expense.title}
              </span>

              <div className="flex items-center w-2/3 mt-4 sm:w-full">
                <span className="px-2 text-xl sm:text-lg sm:px-8 sm:mx-auto">
                  ₪{expense.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between mt-12">
                <span className="px-2 mr-auto text-xl text-zinc-500 sm:text-lg">
                  {expense.date}
                </span>
                <p className="text-zinc-500">{expense.rating}</p>
              </div>
            </div>
          ))}
        </div>

        {isOpen ? (
          <AddModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            title="New Expense"
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            rating={rating}
            setRating={setRating}
          />
        ) : null}
      </div>
    </main>
  );
};
