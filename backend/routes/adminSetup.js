const express = require('express');
const router = express.Router();
const { makeAdmin, listUsers } = require('../controllers/adminSetupController');

// TEMPORARY ROUTES FOR DEVELOPMENT ONLY
router.post('/make-admin', makeAdmin);
router.get('/users', listUsers);

module.exports = router;