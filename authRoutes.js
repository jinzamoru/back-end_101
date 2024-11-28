const express = require('express');
const { login } = require('../controllers/authController');
const { verifyToken }  = require('../middleware/verifyToken')

const router = express.Router();

router.post('/login', login);
router.get('/protected', verifyToken , (req, res) =>{
    res.json({ message: 'Access granted', user: req.user});
});

module.exports = router;