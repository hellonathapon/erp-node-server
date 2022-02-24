const sql = require('mssql')
require('dotenv').config();

const {
    SQL_USER,
    SQL_PASSWORD,
    SQL_DATABASE,
    SQL_SERVER
} = process.env;

const sqlConfig = {
    user: SQL_USER,
    password: SQL_PASSWORD,
    server: SQL_SERVER, //the IP of the machine where SQL Server runs
    database: SQL_DATABASE,

    options: {
        instanceName: 'SQLEXPRESS',
        debug: {
            packet: false,
            payload: false,
            token: false,
            data: false
        },
        //encrypt: true // for Azure config
    }

};
const poolPromise = new sql.ConnectionPool(sqlConfig)
  .connect()
  .then(pool => {
    console.log('Connected to Database')
    return pool
  })
  .catch(err => console.log('Database Connection Failed!', err))

module.exports = {sql, poolPromise}