const express = require('express');
const app = express();
const cors = require('cors');

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Handle Routes
app.use('/login', require('./router/auth/login'));
app.use('/api/customer', require('./router/api/customer'));


const server = app.listen(process.env.PORT || 5000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`🚀 Server is running at http://${host}:${port}`)
});

