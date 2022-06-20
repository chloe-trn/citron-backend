const mysql = require('mysql2');

var db_config = {
    host: 'us-cdbr-east-05.cleardb.net',
    user: 'b2e550de403c2e',
    password: 'acf56361',
    database: 'heroku_5c05cb99186b132'
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