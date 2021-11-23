import express from 'express';

import cloudinary from 'cloudinary'
import routes from './routes'


if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}



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

app.use('/', routes);


//starting server




export const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})