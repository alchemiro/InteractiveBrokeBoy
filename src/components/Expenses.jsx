import { addMonths, format, subMonths } from 'date-fns';
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { AddModal } from "./AddModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { EditModal } from "./EditModal";
import { Transactions } from "./Transactions";
import { H1 } from "./ui/h1";

export const Expenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);
  const [expenseToEdit, setExpenseToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [expenses, setExpenses] = useState([]);

  const openDeleteModal = (expense) => {
    setExpenseToDelete(expense);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setExpenseToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (expense) => {
    setIsEditModalOpen(true);
    setExpenseToEdit(expense);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setExpenseToEdit(null);
  };

  const handleDelete = () => {
    if (!expenseToDelete) return;

    const updatedExpenses = expenses.filter((expense) => expense.id !== expenseToDelete.id);
    setExpenses(updatedExpenses);

    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    setIsDeleteModalOpen(false);
  };

  const handleEdit = (editedExpense) => {
    if (!editedExpense) return;

    const updatedExpenses = expenses.map((expense) =>
      expense.id === editedExpense.id ? editedExpense : expense
    );

    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
    closeEditModal();
  };

  const onSubmit = (data) => {
  const newExpense = {
    id: uuidv4(),
    ...data,
    rating,
    date: data.date, // Use the date provided by the form data
  };
  const updatedExpenses = [...expenses, newExpense];
  localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
  setIsOpen(false);
};

  useEffect(() => {
    const expenses = JSON.parse(localStorage.getItem('expenses'));
    if (!isOpen) {
      setRating(0);
    }
    if (expenses) {
      setExpenses(expenses);
    } else {
      setExpenses([]);
    }
  }, [isOpen]);

  // Filter expenses based on search query
  const filteredExpenses = expenses.filter((expense) =>
    expense.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    expense.amount.toString().includes(searchQuery)
  );

  // Filter expenses for the current month
  const currentMonthExpenses = filteredExpenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth.getMonth() && expenseDate.getFullYear() === currentMonth.getFullYear();
  });

  // Calculate total amount for current month expenses
  const totalAmount = currentMonthExpenses.reduce((acc, expense) => acc + Number(expense.amount), 0);

  const formattedMonth = format(currentMonth, 'MMMM yyyy'); // Format the current month for display

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1)); // Move to previous month
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1)); // Move to next month
  };

  return (
    <main className="">
      <div className="flex flex-col justify-center p-6 text-center">
        <H1>Expenses</H1>
        
        <input
          className="w-10/12 p-2 m-2 mx-auto mt-8 text-gray-700 bg-gray-200 sm:w-72 rounded-xl"
          type="text"
          placeholder="Search Expenses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center justify-center my-4">
          <button className="p-1 mr-1 bg-gray-200 rounded-lg" onClick={goToPreviousMonth}>
            {"<"}
          </button>
          <span className="text-lg font-bold text-white">{formattedMonth}</span>
          <button className="p-1 ml-1 bg-gray-200 rounded-lg" onClick={goToNextMonth}>
            {">"}
          </button>
        </div>
        <div className="mt-4 font-bold text-white">Total Amount: ₪{totalAmount}</div>
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
        <Transactions 
        items = {currentMonthExpenses}
        setIsOpen = {setIsOpen}
        isOpen = {isOpen}
        
        />
        {isOpen ? (
          <AddModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            title="New Expense"
            onSubmit={onSubmit}
            setRating={setRating}
            rating={rating}
          />
        ) : null}
      </div>
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onDelete={handleDelete}
        onCancel={closeDeleteModal}
        expenseTitle={expenseToDelete?.title}
      />
      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleEdit}
          expense={expenseToEdit}
          rating={rating} 
        />
      )}
    </main>
  );
};
