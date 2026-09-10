const express = require('express');
const resourceController = require('../controllers/resourceController');
const { protect, restrictTo } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', resourceController.getAllResources);
router.get('/:id', resourceController.getResource);

router.use(protect);
router.post('/', restrictTo('admin'), resourceController.createResource);
router.patch('/:id', restrictTo('admin'), resourceController.updateResource);
router.delete('/:id', restrictTo('admin'), resourceController.deleteResource);

module.exports = router;
