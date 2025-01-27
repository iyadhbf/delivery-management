const mongoose = require('mongoose'); // Ensure mongoose is imported
const Delivery = require('../models/delivery');
const User = require('../models/user'); // Ensure the User model is imported for validation

// Create a new delivery
const createDelivery = async (req, res) => {
  const { clientName, address, status, assignedTo } = req.body;

  try {
    // Validate required fields
    if (!clientName || !address || !status || !assignedTo) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate assignedTo as a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ error: 'Invalid assignedTo ObjectId' });
    }

    // Check if assignedTo user exists
    const user = await User.findById(assignedTo);
    if (!user) {
      return res.status(404).json({ error: 'Assigned user not found' });
    }

    // Create and save the new delivery
    const delivery = new Delivery({
      clientName,
      address,
      status,
      assignedTo,
    });
    const savedDelivery = await delivery.save();

    res.status(201).json(savedDelivery);
  } catch (error) {
    console.error('Error creating delivery:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Update an existing delivery
const updateDelivery = async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo, address } = req.body;

  try {
    // Validate if the assignedTo is a valid ObjectId, if provided
    if (assignedTo && !mongoose.Types.ObjectId.isValid(assignedTo)) {
      return res.status(400).json({ error: 'Invalid assignedTo ObjectId' });
    }

    // Check if the assignedTo user exists, if provided
    if (assignedTo) {
      const user = await User.findById(assignedTo);
      if (!user) {
        return res.status(404).json({ error: 'Assigned user not found' });
      }
    }

    // Update the delivery
    const delivery = await Delivery.findByIdAndUpdate(
      id,
      { status, assignedTo, address }, // Include address in the update
      { new: true, runValidators: true }
    );

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.status(200).json(delivery);
  } catch (error) {
    console.error('Error updating delivery:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Delete a delivery
const deleteDelivery = async (req, res) => {
  const { id } = req.params;

  try {
    const delivery = await Delivery.findByIdAndDelete(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    res.status(200).json({ message: 'Delivery deleted successfully' });
  } catch (error) {
    console.error('Error deleting delivery:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

// Get all deliveries
const getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('assignedTo', 'name email'); // Populate specific fields for assignedTo
    res.status(200).json(deliveries);
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    res.status(500).json({ error: error.message || 'Server error' });
  }
};

module.exports = {
  createDelivery,
  updateDelivery,
  deleteDelivery,
  getDeliveries,
};
