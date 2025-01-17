import React, { useState } from 'react';
import { deleteDelivery } from '../services/api';
import Modal from './Modal';
import EditForm from './EditForm';
import * as XLSX from 'xlsx';

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

  {/* Search Bar */}
  <form className="form relative">
    <button className="absolute left-2 -translate-y-1/2 top-1/2 p-1" type="button">
      <svg
        width="17"
        height="16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-labelledby="search"
        className="w-5 h-5 text-gray-700"
      >
        <path
          d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
          stroke="currentColor"
          strokeWidth="1.333"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </button>
    <input
      className="input rounded-full px-8 py-3 border-2 border-transparent focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
      placeholder="Search..."
      required
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />
    <button
      type="reset"
      className="absolute right-3 -translate-y-1/2 top-1/2 p-1"
      onClick={() => setSearchQuery('')}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        ></path>
      </svg>
    </button>
  </form>
  <div className="flex space-x-2 border-[3px] border-gray-700 rounded-xl select-none mt-4">
  {/* All */}
  <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
    <input
      type="radio"
      name="filter"
      value="all"
      className="peer hidden"
      checked={filterStatus === "all"}
      onChange={() => setFilterStatus("all")}
    />
    <span className="tracking-widest peer-checked:bg-gray-700 peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
      All
    </span>
  </label>

  {/* En Cours */}
  <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
    <input
      type="radio"
      name="filter"
      value="en cours"
      className="peer hidden"
      checked={filterStatus === "en cours"}
      onChange={() => setFilterStatus("en cours")}
    />
    <span className="tracking-widest peer-checked:bg-gray-700 peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
      En Cours
    </span>
  </label>

  {/* Livré */}
  <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
    <input
      type="radio"
      name="filter"
      value="livré"
      className="peer hidden"
      checked={filterStatus === "livré"}
      onChange={() => setFilterStatus("livré")}
    />
    <span className="tracking-widest peer-checked:bg-gray-700 peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
      Livré
    </span>
  </label>

  {/* Annulé */}
  <label className="radio flex flex-grow items-center justify-center rounded-lg p-1 cursor-pointer">
    <input
      type="radio"
      name="filter"
      value="annulé"
      className="peer hidden"
      checked={filterStatus === "annulé"}
      onChange={() => setFilterStatus("annulé")}
    />
    <span className="tracking-widest peer-checked:bg-gray-700 peer-checked:from-[blueviolet] peer-checked:to-[violet] peer-checked:text-white text-gray-700 p-2 rounded-lg transition duration-150 ease-in-out">
      Annulé
    </span>
  </label>
</div>

  <button
    type="button"
    onClick={exportToExcel}
    className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
  >
    Export to Excel
    <svg
      className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
      viewBox="0 0 16 19"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
        className="fill-gray-800 group-hover:fill-gray-800"
      ></path>
    </svg>
  </button>
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
