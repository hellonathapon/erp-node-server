const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');
const cookieParser = require('cookie-parser');

// Initialize passport and pass global passport object into its configuration
require('./config/passportConfig')(passport);
app.use(passport.initialize()); 



// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser())


// TODO: implement reCAPTCHA check

// Handle Routes
// TODO: restrict api routes for authenticated user
app.use('/login', require('./router/auth/login'));
app.use('/api/customer', require('./router/api/customer'));
app.use('/api/address', require('./router/api/address'));


const server = app.listen(process.env.PORT || 5000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`🚀 Server is running at http://${host}:${port}`)
});
