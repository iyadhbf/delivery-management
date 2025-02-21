import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import backgroundImage from '../assets/delivery.jpg';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai'; 

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await register({ name, email, password, role });
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error) {
      console.error('Error registering:', error);
    }
  };

  return (
    <div
      className="bg-fixed bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border-4 border-blue-400 dark:border-blue-800 p-8"
      >
        <h2 className="text-4xl font-extrabold text-center text-zinc-800 dark:text-white">
          Join Us!
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          Create an account to get started.
        </p>
        <div className="mt-10">
          <label className="block mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="name">
            Name
          </label>
          <input
            placeholder="Your Name"
            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            name="name"
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label className="block mt-6 mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="email">
            Email
          </label>
          <input
            placeholder="you@example.com"
            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mt-6 mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <input
              placeholder="••••••••"
              className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
              name="password"
              id="password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
            >
              {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />} {/* Show eye icon */}
            </span>
          </div>
          <label className="block mt-6 mb-3 text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="role">
            Role
          </label>
          <select
            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            name="role"
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="gestionnaire">Gestionnaire</option>
            <option value="livreur">Livreur</option>
          </select>
          <button
            className="w-full mt-10 px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
            type="submit"
          >
            Sign Up
          </button>
        </div>
        <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800 mt-6">
          <div className="text-sm text-blue-900 dark:text-blue-300 text-center">
            Already have an account?
            <a className="font-medium underline" href="/">
              Sign in
            </a>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
