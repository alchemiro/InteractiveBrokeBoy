import React, { useEffect, useState } from "react";
import { H1 } from "./ui/h1";
import { format } from "date-fns";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { EditModal } from "./EditModal";
import { AddModal } from "./AddModal";
import { Transactions } from "./Transactions";
import { v4 as uuidv4 } from "uuid";

export const Incomes = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [incomeToDelete, setincomeToDelete] = useState(null);
  const [incomeToEdit, setincomeToEdit] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State variable for search query
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const [Incomes, setIncomes] = useState([]);

  const openDeleteModal = (income) => {
    setincomeToDelete(income);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setincomeToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const openEditModal = (income) => {
    setIsEditModalOpen(true);
    setincomeToEdit(income);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setincomeToEdit(null);
  };

  const handleDelete = () => {
    if (!incomeToDelete) return;

    const updatedIncomes = Incomes.filter(
      (income) => income.id !== incomeToDelete.id
    );
    setIncomes(updatedIncomes);

    localStorage.setItem("Incomes", JSON.stringify(updatedIncomes));

    setIsDeleteModalOpen(false);
  };

  const handleEdit = (editedincome) => {
    if (!editedincome) return;

    const updatedIncomes = Incomes.map((income) =>
      income.id === editedincome.id ? editedincome : income
    );

    setIncomes(updatedIncomes);
    localStorage.setItem("Incomes", JSON.stringify(updatedIncomes));
    closeEditModal();
  };

  const onSubmit = (data) => {
    const newincome = {
      id: uuidv4(),
      ...data,
      rating,
      date: data.date, // Use the date provided by the form data
    };
    const updatedIncomes = [...Incomes, newincome];
    localStorage.setItem("incomes", JSON.stringify(updatedIncomes));
    setIsOpen(false);
  };

  useEffect(() => {
    const Incomes = JSON.parse(localStorage.getItem("incomes"));
    if (!isOpen) {
      setRating(0);
    }
    if (Incomes) {
      setIncomes(Incomes);
    } else {
      setIncomes([]);
    }
  }, [isOpen]);

  // Filter Incomes based on search query
  const filteredIncomes = Incomes.filter(
    (income) =>
      income.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      income.amount.toString().includes(searchQuery)
  );

  // Filter Incomes for the current month
  const currentMonthIncomes = filteredIncomes.filter((income) => {
    const incomeDate = new Date(income.date);
    return (
      incomeDate.getMonth() === currentMonth.getMonth() &&
      incomeDate.getFullYear() === currentMonth.getFullYear()
    );
  });

  // Calculate total amount for current month Incomes
  const totalAmount = currentMonthIncomes.reduce(
    (acc, income) => acc + Number(income.amount),
    0
  );

  const formattedMonth = format(currentMonth, "MMMM yyyy"); // Format the current month for display

  const goToPreviousMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1)); // Move to previous month
  };

  const goToNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1)); // Move to next month
  };
  return (
    <div>
      <div className="flex flex-col justify-center p-6 text-center">
        <H1>Incomes</H1>

        <input
          className="w-10/12 p-2 m-2 mx-auto mt-8 text-gray-700 bg-gray-200 sm:w-72 rounded-xl"
          type="text"
          placeholder="Search Incomes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center justify-center my-4">
          <button
            className="p-1 mr-1 bg-gray-200 rounded-lg"
            onClick={goToPreviousMonth}
          >
            {"<"}
          </button>
          <span className="text-lg font-bold text-white">{formattedMonth}</span>
          <button
            className="p-1 ml-1 bg-gray-200 rounded-lg"
            onClick={goToNextMonth}
          >
            {">"}
          </button>
        </div>
        <div className="mt-4 font-bold text-white">
          Total Amount: ₪{totalAmount}
        </div>
      </div>
      <div className="flex max-sm:justify-center">
        <button
          className="w-8/12 p-2 mt-8 text-white border sm:w-72 lg:ml-5 bg-black/40 rounded-xl"
          onClick={() => setIsOpen(true)}
        >
          Add Income
        </button>
      </div>
      <div className="grid gap-5 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
        <Transactions
          items={currentMonthIncomes}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
        />
        {isOpen ? (
          <AddModal
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            title="New Income"
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
        incomeTitle={incomeToDelete?.title}
      />
      {isEditModalOpen && (
        <EditModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleEdit}
          income={incomeToEdit}
          rating={rating}
        />
      )}
    </div>
  );
};
