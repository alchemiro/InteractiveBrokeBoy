import React from "react";
import { Modal } from "./ui/Modal";

export const DeleteModal = ({ setIsOpen, isOpen, title, handleDelete }) => {
  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} title={title}>
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h3 className="text-xl text-zing-600">
          Are you sure you'd like to delete this?
        </h3>
        <div className="flex justify-center w-full gap-8 mt-12 mb-3">
          <button
            className="w-40 px-4 py-2 text-white bg-red-500 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button
            className="w-40 px-4 py-2 text-white bg-gray-500 rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
