const db = require('./db/connection');
const cTable = require('console.table');

console.log(`
                                                                            
_____              _                        _____            _             
|   __| _____  ___ | | ___  _ _  ___  ___   | __  | ___  ___ | |_  ___  ___ 
|   __||     || . || || . || | || -_|| -_|  |    -|| . ||_ -||  _|| -_||  _|
|_____||_|_|_||  _||_||___||_  ||___||___|  |__|__||___||___||_|  |___||_|  
             |_|          |___|                                            
`);

async function getEmployees() {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({host:'localhost', user: 'root', password: 'husky250wr', database: 'roster'});
    // query database
    const [ rows ] = await connection.execute('SELECT * FROM employee');
    return rows;
  };

getEmployees()
  .then(res => console.table(res))