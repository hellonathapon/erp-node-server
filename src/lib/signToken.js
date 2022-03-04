const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.issueJWT = (user_payload) => {

    //const _id = id;

    const expiresIn = '1h';

    const privateKey = process.env.PASSPORT_SECRET_KEY;

    const payload = {
        sub: user_payload,
        iat: Date.now()
    };

    // TODO: --> for production better use algorithm 'RS256' to sign and verify token, it is required .PEM file set up
    const signedToken = jwt.sign(payload, privateKey, 
        { expiresIn: expiresIn, algorithm: 'HS256' });

    return signedToken;

}

