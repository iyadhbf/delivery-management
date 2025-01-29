import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import backgroundImage from '../assets/delivery.jpg'; // Import de l'image
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });
      const { token } = response;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Decode the token to extract user data
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      const userRole = decodedToken.role || 'undefined'; // Default to 'undefined' if role is missing
      const userName = decodedToken.name || 'User'; // Default to 'User' if name is missing
      const userId = decodedToken.id || ''; // Default to empty string if id is missing

      // Store user data in localStorage
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userId', userId); // Add userId to localStorage

      navigate('/dashboard'); // Redirect to dashboard
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
          Welcome Back!
        </h2>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mt-3">
          We missed you, sign in to continue.
        </p>
        <div className="mt-6">
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="email">
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
        </div>
        <div className="mt-6 relative">
          <label className="block text-sm font-medium text-zinc-600 dark:text-zinc-200" htmlFor="password">
            Password
          </label>
          <input
            placeholder="••••••••"
            className="block w-full px-4 py-3 mt-2 text-zinc-800 bg-white border-2 rounded-lg dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-opacity-50 focus:outline-none focus:ring focus:ring-blue-400"
            name="password"
            id="password"
            type={passwordVisible ? 'text' : 'password'} // Toggle between text and password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute top-14 right-3 transform -translate-y-1/2"
          >
            {passwordVisible ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
          </button>
        </div>
        <div className="mt-6">
          <button
            className="w-full px-4 py-3 tracking-wide text-white transition-colors duration-200 transform bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-400 dark:focus:ring-blue-800"
            type="submit"
          >
            Let's Go
          </button>
        </div>
        <div className="px-8 py-4 bg-blue-200 dark:bg-zinc-800 mt-6 rounded-lg text-center">
          <span className="text-sm text-blue-900 dark:text-blue-300">Don't have an account? </span>
          <a className="font-medium underline text-blue-600 dark:text-blue-400" href="/register">
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
