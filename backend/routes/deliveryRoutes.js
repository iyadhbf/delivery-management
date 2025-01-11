const express = require('express');
const deliveryController = require('../controllers/deliveryController');
const { requireAuth, checkRole } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', requireAuth, checkRole('gestionnaire'), deliveryController.createDelivery);
router.put('/update/:id', requireAuth,  deliveryController.updateDelivery);
router.delete('/delete/:id', requireAuth, checkRole('gestionnaire'), deliveryController.deleteDelivery);
router.get('/getall', requireAuth, deliveryController.getDeliveries);

module.exports = router;