const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');
const sql = require('mssql');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('GET_CONTACTS');

        res.status(200).json(result);
    }catch(err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {

    const { name, email, phone, fax, status, created_at } = req.body;
    
    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('Name', name)
            .input('Email', email)
            .input('Phone', phone)
            .input('Fax', fax)
            .input('Status', status)
            .input('CreatedAt', created_at)
            .execute('InsertContact')
        // TODO: Response back naccesary data e.g. contact ID
        console.log(result)
        res.status(201).json({ message: 'Inserted contact successfully' })
    }catch(err) {
        console.error(err);
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, phone, fax, status, created_at } = req.body;

    try {
        const pool = await poolPromise
        const result = await pool.request()
            .input('ContactID', id)
            .input('Name', name)
            .input('Email', email)
            .input('Phone', phone)
            .input('Fax', fax)
            .input('Status', status)
            .input('CreatedAt', created_at)
            .execute('UpdateContact')
        // TODO: Response back naccesary data e.g. contact ID
        console.log(result)
        res.status(201).json({ message: 'Inserted contact successfully' })
    }catch(err) {
        console.error(err);
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('ContactID', sql.Int, id)
        .execute('DeleteContact')

        console.log(result);
        res.status(200).json({ message: 'Deleted contact successfully' })
    }catch(err) {
        console.error(err);
    }

})

module.exports = router;