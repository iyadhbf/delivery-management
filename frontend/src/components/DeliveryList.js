import React, { useState } from 'react';
import { deleteDelivery } from '../services/api';
import Modal from './Modal';
import EditForm from './EditForm';
import * as XLSX from 'xlsx';
import ExportButton from './ExportButton';
import Filter from './Filter';
import SearchBar from './SearchBar';

const DeliveryList = ({ deliveries, onDelete, onUpdate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

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

  const getGoogleMapsLink = (address) => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  // Filter and search logic
  const filteredDeliveries = deliveries
    .filter((delivery) => {
      if (filterStatus === 'all') return true;
      return delivery.status === filterStatus;
    })
    .filter((delivery) => {
      const query = searchQuery.toLowerCase();
      return (
        delivery.clientName.toLowerCase().includes(query) ||
        delivery.address.toLowerCase().includes(query) ||
        (typeof delivery.assignedTo === 'object'
          ? delivery.assignedTo.name.toLowerCase().includes(query)
          : delivery.assignedTo.toLowerCase().includes(query))
      );
    });

  // Export to Excel function
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredDeliveries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Deliveries');
    XLSX.writeFile(workbook, 'deliveries.xlsx');
  };

  return (
    <>
      <div className="flex items-center justify-between space-x-4 mb-4">

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <Filter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />

      <ExportButton onExport={exportToExcel} />
      </div>

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
            {filteredDeliveries.map((delivery) => (
              <tr key={delivery._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {delivery.clientName}
                </th>
                <td className="px-6 py-4">
                  <a
                    href={getGoogleMapsLink(delivery.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    View on Google Maps
                  </a>
                </td>
                <td className="px-6 py-4">{delivery.status}</td>
                <td className="px-6 py-4">
                  {typeof delivery.assignedTo === 'object' ? delivery.assignedTo.name : delivery.assignedTo}
                </td>
                {userRole === 'gestionnaire' && (
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
