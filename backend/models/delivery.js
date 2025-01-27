const mongoose = require('mongoose');

const deliverySchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['en cours', 'livré', 'annulé'], required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Delivery', deliverySchema);
