require('dotenv').config();
const mysql = require('mysql2');

var db_config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};
  
var db_connection;

// https://superuser.com/questions/1455182/cleardb-database-on-heroku-closing-connection-after-1-min-of-inactivity

function handleDisconnect() {
    db_connection = mysql.createPool(db_config); 
                                                   
    db_connection.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { 
        handleDisconnect();                         
        } else {                                     
        throw err;                             
        }
    });
}

handleDisconnect();

module.exports = db_connection;