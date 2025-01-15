import React, { useState } from 'react';
import { deleteDelivery } from '../services/api';
import Modal from './Modal';
import EditForm from './EditForm';

const DeliveryList = ({ deliveries, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);

  const handleEdit = (delivery) => {
    setSelectedDelivery(delivery);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDelivery(id);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting delivery:', error);
    }
  };

  const handleSave = (updatedDelivery) => {
    onUpdate(selectedDelivery._id, updatedDelivery);
    setIsModalOpen(false);
  };

  const userRole = localStorage.getItem('userRole');

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Client Name</th>
              <th scope="col" className="px-6 py-3">Address</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Assigned To</th>
              {userRole === 'gestionnaire' && (
                <>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Delete</span>
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {delivery.clientName}
                </th>
                <td className="px-6 py-4">{delivery.address}</td>
                <td className="px-6 py-4">{delivery.status}</td>
                <td className="px-6 py-4">
                  {typeof delivery.assignedTo === 'object' ? delivery.assignedTo.name : delivery.assignedTo}
                </td>
                { (
                  <>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(delivery)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(delivery._id)}
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {selectedDelivery && (
          <EditForm
            delivery={selectedDelivery}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
          />
        )}
      </Modal>
    </>
  );
};

export default DeliveryList;
