import express from 'express';
const path = require('path');
import cloudinary from 'cloudinary'
import routes from './routes'
import morgan from 'morgan'
var bodyParser = require('body-parser')
var cors = require('cors')




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
app.use(cors())

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(morgan('dev'))



//.fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}])


app.use('/', routes);


//starting server

        


export const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

