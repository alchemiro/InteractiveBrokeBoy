import React, { useState } from 'react'
import { Modal } from './ui/Modal';
import { getIcon } from '../lib/utils';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

export const AddModal = ({ setIsOpen, isOpen, title, onSubmit, setRating, rating }) => {
  const { register, handleSubmit } = useForm();
  
  const handleSliderChange = (event) => {
    setRating(parseInt(event.target.value));
  };
    
  return (
    <Modal setIsOpen={setIsOpen} isOpen={isOpen} title={title}>
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap justify-center p-6 m-4 gap-y-7">
      <div className="w-full">
        <label htmlFor="title" className="font-semibold">
          Title
        </label>
        <input
          name="title"
          type="text"
          className="w-full h-8 pl-2 rounded-lg"
          placeholder="Title"
          {...register('title',{required:true})}
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
          placeholder="Amount"
          {...register('amount',{required:true})}
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
            placeholder="Date"
            defaultValue={format(new Date(), 'yyyy-MM-dd')}
            {...register('date', { required: true })}
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
          <span className="absolute left-0 text-sm text-gray-500 dark:text-gray-400 -bottom-6">
            😅
          </span>
          <span className="absolute text-sm text-gray-500 transform -translate-x-1/2 dark:text-gray-400 left-1/4 rtl:translate-x-1/2 -bottom-6">
            😊
          </span>
          <span className="absolute text-sm text-gray-500 transform -translate-x-1/2 dark:text-gray-400 left-1/2 rtl:translate-x-1/2 -bottom-6">
            😄
          </span>
          <span className="absolute text-sm text-gray-500 transform -translate-x-1/2 dark:text-gray-400 left-3/4 rtl:translate-x-1/2 -bottom-6">
            😃
          </span>
          <span className="absolute right-0 text-sm text-gray-500 dark:text-gray-400 -bottom-6">
            😁
          </span>
        </div>
        <div className="mt-8 text-center">
          Current Rating: <b>{rating}</b> - Current Icon:{" "}
          {getIcon(rating)}
        </div>
      </div>
      <button className="w-8/12 p-2 mt-8 text-white bg-black border sm:w-72 lg:ml-5 rounded-xl">
        Add
      </button>
    </form>
  </Modal>
  )
}
