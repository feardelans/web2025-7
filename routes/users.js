const express = require('express');
const router = express.Router();
const { registerUser, getAllUsers } = require('../controllers/userController');

router.post('/register-user', registerUser);
router.get('/users', getAllUsers);

module.exports = router;
