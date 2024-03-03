import React from 'react';
import logo from '../assets/images/logo7.png';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate()
  
  return (
    <div className='flex flex-col items-center justify-center p-5 mx-auto mt-10'>
      {/* Start Div Main */}
      <h1 className='mb-5 text-6xl font-extrabold text-white shadow-lg'>Welcome to Buy or die</h1>
      <div className='p-10'>  
        <img src={logo} alt='logo' className='mx-auto h-80 w-80' />
      </div>
      <div className='p-5'>
        <span className='text-xl text-white sm:text-2xl'>
          Full Tracking Your Expenses and Incomes
        </span>
      </div>
      <button className='w-40 h-10 mx-auto text-lg text-white rounded-lg bg-sky-700 bg-red-lite animate-bounce' onClick={()=>navigate('/expenses')}>
        Lets Get it Started
      </button>
      {/* End Div Main */}
    </div>
  );
};