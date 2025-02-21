import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav className="relative w-[550px] h-[60px] mx-auto my-4">
      <div className="absolute inset-0 bg-white dark:bg-zinc-900 flex justify-around items-center p-2 rounded-lg shadow-lg">
        {token ? (
          <>
            <Link to="/dashboard" className="px-6 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md">
              Dashboard
            </Link>
            {userRole === 'gestionnaire' && (
              <Link to="/add-delivery" className="px-6 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md">
                Add Delivery
              </Link>
            )}
            <button onClick={handleLogout} className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-md text-white">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="px-6 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md">
              Login
            </Link>
            <Link to="/register" className="px-6 py-2 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-zinc-700 rounded-md">
              Register
            </Link>
          </>
        )}

        {/* Dark Mode Toggle */}
        <DarkModeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
