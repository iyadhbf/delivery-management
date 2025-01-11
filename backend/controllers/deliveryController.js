const Delivery = require('../models/delivery');

exports.createDelivery = async (req, res) => {
     const { clientName, address, status, assignedTo } = req.body; 
// Validate status 
if (!status || !['en cours', 'livré', 'annulé'].includes(status)) { 
    return res.status(400).json({ errors: 'Invalid status' }); 
} try { 
    const delivery = await Delivery.create({ clientName, address, status, assignedTo }); 
    res.status(201).json(delivery); 
} catch (err) { 
    res.status(400).json({ errors: err.message }); 
}
};

exports.updateDelivery = async (req, res) => {
  const { id } = req.params;
  const { status, assignedTo } = req.body;

  try {
    const delivery = await Delivery.findByIdAndUpdate(id, { status, assignedTo }, { new: true });
    if (!delivery) return res.status(404).json({ errors: 'Delivery not found' });
    res.status(200).json(delivery);
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

exports.deleteDelivery = async (req, res) => {
  const { id } = req.params;

  try {
    const delivery = await Delivery.findByIdAndDelete(id);
    if (!delivery) return res.status(404).json({ errors: 'Delivery not found' });
    res.status(200).json({ message: 'Delivery deleted' });
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};

exports.getDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('assignedTo');
    res.status(200).json(deliveries);
  } catch (err) {
    res.status(400).json({ errors: err.message });
  }
};
