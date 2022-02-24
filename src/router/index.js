const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/databaseConfig');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .query('select * from Users')      

        console.log(result)
        res.json(result.recordset)
    }catch (err) {
        console.log(err)
    }
});

module.exports = router;