import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <nav className="relative w-[400px] h-[60px] mx-auto my-4">
      <div className="absolute inset-0 bg-blue-600 dark:bg-zinc-900 flex justify-around items-center p-2 rounded-lg">
        {token ? (
          <>
            <Link
              to="/dashboard"
              className="px-6 py-2 text-white cursor-pointer transition hover:bg-white/20"
            >
              Dashboard
            </Link>
            {userRole === 'gestionnaire' && (
              <Link
                to="/add-delivery"
                className="px-6 py-2 text-white cursor-pointer transition hover:bg-white/20"
              >
                Add Delivery
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="px-6 py-2 text-white cursor-pointer transition bg-red-500 hover:bg-red-600 rounded-md"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className="px-6 py-2 text-white cursor-pointer transition hover:bg-white/20"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 text-white cursor-pointer transition hover:bg-white/20"
            >
              Register
            </Link>
          </>
        )}
        <svg
          className="absolute inset-0 pointer-events-none"
          overflow="visible"
          width="400"
          height="60"
          viewBox="0 0 400 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            className="stroke-white fill-transparent"
            style={{
              strokeWidth: 5,
              strokeDashoffset: 5,
              strokeDasharray: '0 0 10 40 10 40',
              transition: 'stroke-dashoffset 0.5s, stroke-dasharray 0.5s',
            }}
            x="0"
            y="0"
            width="400"
            height="60"
          ></rect>
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
