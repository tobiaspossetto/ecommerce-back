import mysql from 'mysql'

import {promisify} from 'util'


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME
})

db.getConnection((err, connection) => {
    
    if(!err){
        console.log('DB is Connected');
    }
    if(connection){connection.release()};
   
    return;
})

promisify(db.query)


//db.query = promisify(db.query);
export default db


