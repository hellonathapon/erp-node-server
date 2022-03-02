const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { poolPromise } = require('./databaseConfig');
require('dotenv').config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET_KEY,
    algorithms: ['RS256']
};

// NOTE: db query here is just a query for userid or whatever that being 
// attached to JWT and now it is extract
/* 
    @param
*/

module.exports = (passport) => {
    passport.use( new JwtStrategy(options, async function(jwt_payload, done) {
        console.log(jwt_payload);
        try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('Username', payload.username)
            .execute('CHECKLOGIN')
    
            // in case no user
            if(!result.recordset.length) {
                return done(null, false);
            }
    
            console.log(result)
    
            return done(null, result.recordset);
        }catch(err) {
            return done(err, false)
        }
    }) );
};