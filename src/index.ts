import express from 'express';

import cloudinary from 'cloudinary'
import IndexRoutes from './routes'

import db from './database'
//initializations
export const app = express()


//settings
app.set('port', process.env.port || 4000)

// @ts-ignore
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:false})) //poder interpretar datos de un form


//routes

app.use('/', IndexRoutes);


//starting server

db.query("SHOW TABLES")


export const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})