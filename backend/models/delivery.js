const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  address: { type: String, required: true },
  status: { type: String, enum: ['en cours', 'livré', 'annulé'], default: 'en cours' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Delivery', DeliverySchema);
