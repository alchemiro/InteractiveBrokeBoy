import React, { useState } from 'react';
import { Modal } from './ui/Modal'
import { getIcon } from '../lib/utils'

export const EditModal = ({ isOpen, onClose, onSubmit, expense }) => {
  const [editedExpense, setEditedExpense] = useState(expense);
  const [rating, setRating] = useState(editedExpense.rating); // Initialize the rating

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedExpense({
      ...editedExpense,
      [name]: value,
    });
  };

  const handleSliderChange = (e) => {
    setRating(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    const updatedExpenseWithRating = {
        ...editedExpense,
        rating: rating, // Ensure this is the updated rating
    };
    
    onSubmit(updatedExpenseWithRating);
    onClose();
    };

  return (
    <Modal setIsModalOpen={onClose} isModalOpen={isOpen} title="Edit Expense">
      <form onSubmit={handleSubmit} className="flex flex-wrap justify-center p-6 m-4 gap-y-7">
        <div className="w-full">
          <label htmlFor="title" className="font-semibold">
            Title
          </label>
          <input
            name="title"
            type="text"
            className="w-full h-8 pl-2 rounded-lg"
            placeholder="Title"
            value={editedExpense.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="amount" className="font-semibold">
            Amount
          </label>
          <input
            name="amount"
            type="number"
            className="w-full h-8 pl-2 rounded-lg"
            step="0.01"
            placeholder="Amount"
            value={editedExpense.amount}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="date" className="font-semibold">
            Date
          </label>
          <input
            name="date"
            type="date"
            className="w-full h-8 pl-2 rounded-lg"
            defaultValue={new Date().toISOString().slice(0, 10)}
            placeholder="Date"
            value={editedExpense.date}
            onChange={handleInputChange}
          />
        </div>
        <div className="w-full">
        <div className="relative mb-6">
                <input
                type="range"
                className="w-full accent-zinc-800"
                min="0"
                max="100"
                step="1"
                value={rating}
                onChange={handleSliderChange}
                />
                <span className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 -bottom-6">😅</span>
                <span className="absolute text-sm text-gray-500 transform -translate-x-1/2 dark:text-gray-400 left-1/4 rtl:translate-x-1/2 -bottom-6">😊</span>
                <span className="absolute text-sm text-gray-500 transform -translate-x-1/2 dark:text-gray-400 left-1/2 rtl:translate-x-1/2 -bottom-6">😄</span>
                <span className="absolute text-sm text-gray-500 transform -translate-x-1/2 dark:text-gray-400 left-3/4 rtl:translate-x-1/2 -bottom-6">😃</span>
                <span className="absolute right-0 text-sm text-gray-500 dark:text-gray-400 -bottom-6">😁</span>
            </div>
          <div className="mt-8 text-center">
            Current Rating: <b>{rating}</b> - Current Icon: {getIcon(rating)}
          </div>
        </div>
        <button className="w-8/12 p-2 mt-8 text-white bg-black border sm:w-72 lg:ml-5 rounded-xl">
          Update
        </button>
      </form>
    </Modal>
  );
};
