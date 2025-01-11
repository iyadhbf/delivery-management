import React, { useState } from 'react';
import { addDelivery } from '../services/api';

const DeliveryForm = () => {
  const [formData, setFormData] = useState({
    clientName: '',
    address: '',
    details: '',
    status: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDelivery(formData);
      alert('Delivery added successfully!');
    } catch (error) {
      console.error(error);
      alert('Error adding delivery');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="clientName" placeholder="Client Name" onChange={handleChange} />
      <input name="address" placeholder="Address" onChange={handleChange} />
      <textarea name="details" placeholder="Details" onChange={handleChange} />
      <select name="status" onChange={handleChange}>
        <option value="en cours">En cours</option>
        <option value="livré">Livré</option>
        <option value="annulé">Annulé</option>
      </select>
      <button type="submit">Add Delivery</button>
    </form>
  );
};

export default DeliveryForm;
