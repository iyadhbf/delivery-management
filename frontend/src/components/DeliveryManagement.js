import React, { useState } from 'react';
import EditForm from './EditForm';
import { deleteDelivery } from '../services/api';

const DeliveryManagement = ({ userRole, deliveries, updateDeliveryList }) => {
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
  };

  const handleSave = (updatedDelivery) => {
    // Update the delivery list in the parent component
    updateDeliveryList((prev) =>
      prev.map((d) => (d._id === updatedDelivery._id ? updatedDelivery : d))
    );
    setSelectedDelivery(null);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDelivery(id);
      updateDeliveryList((prev) => prev.filter((d) => d._id !== id));
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  return (
    <div>
      <h1>Delivery Management</h1>
      {deliveries.map((delivery) => (
        <div key={delivery._id} className="delivery-item">
          <p>Client: {delivery.clientName}</p>
          <p>Address: {delivery.address}</p>
          <p>Status: {delivery.status}</p>
          <p>Assigned To: {delivery.assignedTo}</p>
          <div className="actions">
            <button
              onClick={() => handleEdit(delivery)}
              className="px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              Edit
            </button>
            {userRole === 'gestionnaire' && (
              <button
                onClick={() => handleDelete(delivery._id)}
                className="px-3 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}

      {selectedDelivery && (
        <EditForm
          delivery={selectedDelivery}
          userRole={userRole}
          onClose={() => setSelectedDelivery(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default DeliveryManagement;
