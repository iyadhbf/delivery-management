import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDelivery } from '../services/api';

const AddDelivery = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    address: '',
    status: 'en cours',
    assignedTo: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDelivery(formData);
      navigate('/dashboard');
    } catch (err) {
      setError('Error adding delivery. Please try again.');
      console.error(err);
    }
  };

  const userRole = localStorage.getItem('userRole');

  if (userRole !== 'gestionnaire') {
    return <h1 className="text-center text-red-500">Access Denied</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Delivery</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="en cours">En cours</option>
            <option value="livré">Livré</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Delivery
        </button>
      </form>
    </div>
  );
};

export default AddDelivery;
