const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { poolPromise } = require('./databaseConfig');
require('dotenv').config();

/**
 * The whole process of this to extract token from http request
 * and verify it 
*/

const cookieExtractor = function(req) {
    console.log(req.cookies)
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    console.log(token)
    return token;
}; 

const options = {
    jwtFromRequest: cookieExtractor, // check token in cookie
    secretOrKey: process.env.PASSPORT_SECRET_KEY,
    algorithms: ['HS256']
};

// NOTE: db query here is just a query for userid or whatever that being 
// attached to JWT and now it is extract
/* 
    @param
*/

module.exports = (passport) => {
    passport.use( new JwtStrategy(options, async function(jwt_payload, done) {
        try{
            const pool = await poolPromise
            const result = await pool.request()
            .input('Username', jwt_payload.sub)
            .execute('CHECKLOGIN')
            
            console.log('hi')
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