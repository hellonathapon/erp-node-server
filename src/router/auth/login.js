const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');

// :<port>/login
router.post('/', async (req, res) => {
    const { username, password } = req.body;

    try {
        const pool = await poolPromise

        // Check credentials
        const result = await pool.request()
        .input('Username', username)
        .execute('CHECKLOGIN')
        console.log(result)
        // no user in db
        if(!result.recordset.length) {
            res.status(404).json({ message: 'Username not found!'});
        }else if(password !== result.recordset[0].Password){  // there's some extra space in db :)
            // Check password
            // TODO (feat): if username exist -> decrypt password and compare
            res.status(401).json({ message: 'Password not match!'});
        }else {
            res.status(200).json(result.recordset)
        }
    }catch (err) {
        console.log(err)
    }
});

module.exports = router;