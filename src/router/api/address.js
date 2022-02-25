const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('GET_ADDRESSES');

        res.status(200).json(result);
    }catch(err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {

    const { name, email, phone, fax, status, created_at } = req.body;
    
    const pool = await poolPromise
    const result = await pool.request()
        .input('Username', username)
        .execute('CHECKUSER')
});

router.put('/', async (req, res) => {

})

router.delete('/', async (req, res) => {

})

module.exports = router;