const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');
const sql = require('mssql');
const passport = require('passport');


/* <port>/api/customer */ 

router.get('/', passport.authenticate('jwt', { session: false }),  async (req, res) => {
    console.log('hit customer route')
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('GetCustomer');

        res.status(200).json(result);
    }catch(err) {
        console.log(err);
    }
});

router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {

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

router.put('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
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

router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('CustomerID', sql.Int, id)
        .execute('DeleteCustomer')

        res.status(202).json({message: "Deleted Customer successfully"})
    }catch(err) {
        console.error(err);
    }
})

module.exports = router;