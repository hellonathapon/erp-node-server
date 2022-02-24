const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');

// POST: <port>api/login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await poolPromise

        // Check credentials
        const result = await pool.request()
        .input('Username', username)
        .execute('CHECKUSER')
        
        // TODO: if username exist -> decrypt password and compare
        // TODO: query all the data 
        console.log(result)
        res.json(result.recordset)
    }catch (err) {
        console.log(err)
    }
});

module.exports = router;