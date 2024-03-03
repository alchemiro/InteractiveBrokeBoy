

import React from "react";

const DeleteConfirmationModal = ({ isOpen, onDelete, onCancel, expenseTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black/50">
      <div className="relative flex flex-col w-11/12 max-w-xl sm:w-3/4 bg-white/95 rounded-2xl h-5/12">
        <h1 className="ml-6 text-2xl text-center text-black">Delete Confirmation</h1>
        <div
          className="absolute z-50 text-3xl font-bold text-black cursor-pointer right-2"
          onClick={onCancel}
        >
          &times;
        </div>
        <p className="mt-8 text-center text-black">
          Are you sure you want to delete "{expenseTitle}"?
        </p>
        <div className="flex justify-center mt-6">
          <button
            className="w-24 h-10 px-4 mr-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
            onClick={onDelete}
          >
            Yes
          </button>
          <button
            className="w-24 h-10 px-4 ml-2 text-black bg-gray-300 rounded-l7 hover:bg-gray-400"
            onClick={onCancel}
          >
            No
          </button>
        </div>
        <div className="mb-4"></div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
    