import React, { useEffect, useState } from 'react';
import DeliveryList from '../components/DeliveryList';
import { getDeliveries } from '../services/api';

const Dashboard = () => {
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        const response = await getDeliveries();
        setDeliveries(response);
      } catch (error) {
        console.error('Error fetching deliveries:', error);
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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-center mb-8">Dashboard</h1>
      <DeliveryList deliveries={deliveries} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
};

export default Dashboard;
