import React, { useEffect, useState } from 'react';
import DeliveryList from '../components/DeliveryList';
import { getDeliveries } from '../services/api';
import deliveryBackground from '../assets/delivery.jpg'; // Import the image

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await getDeliveries();
        setDeliveries(response);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
        setError('Failed to load deliveries. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  const handleDelete = (id) => {
    setDeliveries((prevDeliveries) => prevDeliveries.filter((delivery) => delivery._id !== id));
  };

  const handleUpdate = (id, updatedDelivery) => {
    setDeliveries((prevDeliveries) =>
      prevDeliveries.map((delivery) =>
        delivery._id === id ? { ...delivery, ...updatedDelivery } : delivery
      )
    );
  };

  return (
    <div 
      className="bg-fixed bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(${deliveryBackground})` }} // Use the imported image
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Dashboard</h1>

        {loading ? (
          <div className="flex justify-center">
            <p className="text-gray-600">Loading deliveries...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : deliveries.length === 0 ? (
          <div className="text-center text-gray-500">No deliveries available.</div>
        ) : (
          <DeliveryList deliveries={deliveries} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
