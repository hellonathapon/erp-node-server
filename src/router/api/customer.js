const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');
const sql = require('mssql');

/* <port>/api/customer */ 

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('GET_CUSTOMERS');

        res.status(200).json(result);
    }catch(err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {

    // TODO: wait for a precise param. names from db maintainer
    const { name, email, phone, fax, status, created_at } = req.body;
    
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('Username', sql.VarChar(100) , name)
            .input('Email', sql.VarChar(100) , email)
            .input('Phone', sql.Int , phone)
            .input('Fax', sql.Int , fax)
            .input('Status', sql.VarChar(100) , status)
            .input('Created_At', sql.VarChar(100) , created_at)
            .execute('ADDCUSTOMER')
        
        res.status(201).json(result);

    }catch(err) {
        console.error(err);
    } 
})

router.put('/:id', async (req, res) => {
    // Extrack ID out of request
    const { _id } = req.params;

    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .input('id_param', _id)
        .execute('UPDATECUSTOMER'); // execute stored procedure

        res.status(200).json(`Customer id: ${_id} updated successfully`)
    }catch(err) {
        console.error(err);
    }

})

router.delete('/:id', async (req, res) => {

})

module.exports = router;