import mysql from 'mysql'

import {promisify} from 'util'


const db = mysql.createPool({
    host: 'bzj3dkly9sqlbpqkhw6s-mysql.services.clever-cloud.com',
    user: 'umpcgwbm2eqqoewf',
    password: 'bzj3dkly9sqlbpqkhw6s',
    database: 'bzj3dkly9sqlbpqkhw6s'
})

db.getConnection((err, connection) => {
    
    if(!err){
        console.log('DB is Connected');
    }
    if(connection){connection.release()};
   
    return;
})

// @ts-ignore
db.query = promisify(db.query);

export default db
