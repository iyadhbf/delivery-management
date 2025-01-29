import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDelivery } from '../services/api';
import Swal from 'sweetalert2'; // Import SweetAlert2

const AddDelivery = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: '',
    address: '',
    status: 'en cours',
    assignedTo: '', // This will hold the userId
  });
  const [error, setError] = useState('');
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName'); // Display username
  const userId = localStorage.getItem('userId'); // Backend expects this as assignedTo

  useEffect(() => {
    // Pre-fill the assignedTo field with userId if user is a gestionnaire
    if (userRole === 'gestionnaire' && userId) {
      setFormData((prevData) => ({
        ...prevData,
        assignedTo: userId,
      }));
    }
  }, [userRole, userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.assignedTo) {
        throw new Error('Assigned To field is missing or invalid.');
      }
      await addDelivery(formData);
      Swal.fire({
        icon: 'success',
        title: 'Delivery Added!',
        text: 'The delivery has been successfully added.',
        confirmButtonText: 'OK',
      }).then(() => {
        navigate('/dashboard');
      });
    } catch (err) {
      setError(err.response?.data?.error || 'Error adding delivery. Please try again.');
      console.error('Error response:', err.response || err.message);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error || 'Something went wrong. Please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  if (userRole !== 'gestionnaire') {
    return <h1 className="text-center text-red-500">Access Denied</h1>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add Delivery</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        {/* Client Name */}
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

        {/* Address */}
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

        {/* Status */}
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

        {/* Assigned To */}
        <div className="mb-4">
          <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">
            Assigned To
          </label>
          <input
            type="text"
            id="assignedTo"
            name="assignedTo"
            value={userName || 'Unknown'}
            readOnly
            className="mt-1 block w-full border border-gray-300 rounded-md p-2 bg-gray-100"
          />
        </div>

        {/* Submit Button */}
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
