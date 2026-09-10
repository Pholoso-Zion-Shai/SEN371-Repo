const express = require('express');
const orderController = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', orderController.getMyOrders);
router.post('/', orderController.createOrder);

module.exports = router;
