import React, { useState } from 'react';
import { updateDelivery } from '../services/api';

const EditForm = ({ delivery, userRole, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    clientName: delivery.clientName,
    address: delivery.address,
    status: delivery.status,
    assignedTo: delivery.assignedTo,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedDelivery = await updateDelivery(delivery._id, formData);
      onSave(updatedDelivery);
      onClose();
    } catch (error) {
      console.error('Error updating delivery:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Delivery</h2>
        <form onSubmit={handleSubmit}>
          {localStorage.userRole === 'gestionnaire' && (
            <>
              <div className="mb-4">
                <label className="block font-medium mb-1">Client Name</label>
                <input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Assigned To</label>
                <input
                  type="text"
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label className="block font-medium mb-1">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="en cours">En cours</option>
              <option value="livré">Livré</option>
              <option value="annulé">Annulé</option>
            </select>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
