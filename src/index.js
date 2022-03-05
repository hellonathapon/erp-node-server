const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// Initialize passport and pass global passport object into its configuration
require('./config/passportConfig')(passport);
app.use(passport.initialize()); 



// Middlewares
// app.use(cors())
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Authorization, Accept, Origin, Access-Control-Allow-Headers, X-Requested-With, content-type, Access-Control-Request-Headers"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())


// TODO: implement reCAPTCHA check

// Handle Routes
// TODO: restrict api routes for authenticated user
app.use('/login', require('./router/auth/login'));
app.use('/api/customer', require('./router/api/customer'));
app.use('/api/address', require('./router/api/address'));
app.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.status(200).json({message: 'Authorized'})
})


const server = app.listen(process.env.PORT || 5000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`🚀 Server is running at http://${host}:${port}`)
});
