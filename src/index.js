const express = require('express');
const app = express();

// Handle Routes
app.use('/', require('./router/index'));


const server = app.listen(process.env.PORT || 5000, () => {
    const host = server.address().address
    const port = server.address().port
    console.log(`Server is running at http://${host}:${port}`)
});

