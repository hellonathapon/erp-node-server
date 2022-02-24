const express = require('express');
const router = express.Router();

// Handle Auth user

router.get('/', (req, res) => {
    res.status(200).json('ok :)')
});

module.exports = router;