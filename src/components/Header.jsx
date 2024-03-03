import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation().pathname;

  return (
    <header>
      <nav className='text-white bg-gray-800 shadow-lg'>
        <div className='container flex items-center justify-between p-4 mx-auto'>
          <ul className='flex space-x-4'>
            <li>
              <Link to='/' className={`text-xl font-medium ${location === '/' ? 'underline' : 'no-underline'}`}>Home</Link>
            </li>
            <li>
              <Link to='/expenses' className={`text-xl font-medium ${location === '/expenses' ? 'underline' : 'no-underline'}`}>Expenses</Link>
            </li>
            <li>
              <Link to='/incomes' className={`text-xl font-medium ${location === '/incomes' ? 'underline' : 'no-underline'}`}>Incomes</Link>
            </li>
          </ul>
          <Link to='/' className="text-2xl font-bold no-underline">
            BuyOrDie
          </Link>
        </div>
      </nav>
    </header>
  );
};
