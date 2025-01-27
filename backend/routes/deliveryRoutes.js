const express = require('express');
const deliveryController = require('../controllers/deliveryController'); // Import the full deliveryController
const { requireAuth } = require('../middleware/authMiddleware');
const { checkRole } = require('../middleware/authMiddleware'); // Import checkRole if needed

const router = express.Router();

// Create delivery route
router.post('/add', requireAuth, deliveryController.createDelivery);

// Update delivery route
router.put('/update/:id', requireAuth, deliveryController.updateDelivery);

// Delete delivery route
router.delete('/delete/:id', requireAuth, checkRole('gestionnaire'), deliveryController.deleteDelivery);

// Get all deliveries route
router.get('/getall', requireAuth, deliveryController.getDeliveries);

module.exports = router;
