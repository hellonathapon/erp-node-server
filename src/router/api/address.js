const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');

router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('GetAddress');

        res.status(200).json(result);
    }catch(err) {
        console.log(err);
    }
});

router.post('/', async (req, res) => {

    const { 
        name, 
        typeAdress, 
        addressName, 
        building, 
        subDistrict, 
        district,
        province,
        postalCode,
        description,
        dateCreate,
        customerID
    } = req.body;
    
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('Name', name)
        .input('TypeAddress', typeAdress)
        .input('AddressName', addressName)
        .input('Building', building)
        .input('SubDistrict', subDistrict)
        .input('District', district)
        .input('Province', province)
        .input('PostalCode', postalCode)
        .input('Description', description)
        .input('DateCreate', dateCreate)
        .input('Cus_Id', customerID)
        .execute('InsertAddress')

        res.status(201).json('Created Address successfully');
    }catch(err) {
        console.error(err);
    }
});

router.put('/', async (req, res) => {

})

router.delete('/', async (req, res) => {

})

module.exports = router;