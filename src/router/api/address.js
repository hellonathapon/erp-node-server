const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');
const sql = require('mssql');

// :<port>/api/address
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
        .execute('GetAddress');

        res.status(200).json(result);
    }catch(err) {
        console.error(err);
    }
});

router.post('/', async (req, res) => {

    // NOTE: dateCreate is hardcode here :) 
    const { 
        name, 
        typeAddress, 
        addressNumber,
        building, 
        subDistrict, 
        district,
        province,
        postalCode,
        description,
        customerID
    } = req.body;
    
    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('Name', sql.NVarChar(50) , name)
        .input('TypeAddress', sql.NVarChar(50) , typeAddress)
        .input('AddressNumber', sql.NVarChar(50) , addressNumber)
        .input('Building', sql.NVarChar(50) , building)
        .input('SubDistrict', sql.NVarChar(50) , subDistrict)
        .input('District', sql.NVarChar(50) , district)
        .input('Province', sql.NVarChar(50) , province)
        .input('PostalCode', sql.Int , postalCode)
        .input('Description', sql.NVarChar(50) , description)
        .input('DateCreate', sql.NVarChar(50) , '20220228') // TODO: format date
        .input('Cus_Id', sql.Int , customerID)
        .execute('InsertAddress')

        console.log(result);
        res.status(201).json({ message: 'Inserted Address successfully'});
    }catch(err) {
        console.error(err);
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;

    // TODO: there might be a better way to convert a bunch of JSON data type into mssql data
    const { 
        name, 
        typeAddress, 
        addressNumber,
        building, 
        subDistrict, 
        district,
        province,
        postalCode,
        description,
        customerID
    } = req.body;

    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('_ID', sql.NVarChar(50) , id)
        .input('Name', sql.NVarChar(50) , name)
        .input('TypeAddress', sql.NVarChar(50) , typeAddress)
        .input('AddressNumber', sql.NVarChar(50) , addressNumber)
        .input('Building', sql.NVarChar(50) , building)
        .input('SubDistrict', sql.NVarChar(50) , subDistrict)
        .input('District', sql.NVarChar(50) , district)
        .input('Province', sql.NVarChar(50) , province)
        .input('PostalCode', sql.Int , postalCode)
        .input('Description', sql.NVarChar(50) , description)
        .input('DateCreate', sql.NVarChar(50) , '20220228') // TODO: format date
        .input('Cus_Id', sql.Int , customerID)
        .execute('UpdateAddress')

        console.log(result)
        res.status(200).json({ message: "Updated successfully!" })
    }catch(err) {
        console.error(err);
    }

})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id)

    try {
        const pool = await poolPromise
        const result = await pool.request()
        .input('AddressID', sql.Int, id)
        .execute('DELETE_ADDRESS')

        res.status(202).json({message: "Deleted successfully"})
    }catch(err) {
        console.error(err);
    }
})

module.exports = router;