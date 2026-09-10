const express = require('express');
const bookingController = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);
router.get('/', bookingController.getMyBookings);
router.post('/', bookingController.createBooking);
router.patch('/:id', bookingController.updateBooking);

module.exports = router;
