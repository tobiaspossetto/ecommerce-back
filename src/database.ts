import {createPool} from 'mysql2/promise'

export async function connect(){
    const connection = await createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASENAME
    });
    return connection
}




