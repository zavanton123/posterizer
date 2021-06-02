const express = require('express');
const apiController = require('../controllers/api-controller');
const router = express.Router();

router.post('/posts', apiController.createPost);
router.get('/', apiController.getStatus);

module.exports = router;
