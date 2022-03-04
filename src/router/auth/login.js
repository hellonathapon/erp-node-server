const express = require('express');
const router = express.Router();
const { poolPromise } = require('../../config/databaseConfig');
const signToken = require('../../lib/signToken');

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

        }else if(password !== result.recordset[0].Password){

            // NOTE: Might need to decrypt password and compare at this stage when implement password encryption.
            res.status(401).json({ message: 'Password not match!'});
        }else {
            // issue JWT
            const token = await signToken.issueJWT(result.recordset[0].UserName);
            
            // TODO: Restrict on naccesary user data to be sent to client
            const { UserName, EmpName, Email, Priority } = result.recordset[0];
            res.cookie('jwt', token, {
                httpOnly: true,
                secure: false //--> SET TO TRUE ON PRODUCTION
            });
            res.status(200).json({
                success: true, 
                data: {
                    username: UserName,
                    name: EmpName,
                    email: Email,
                    priority: Priority
                },
                // token: token
            });
        }
    }catch (err) {
        console.log(err)
    }
});

module.exports = router;