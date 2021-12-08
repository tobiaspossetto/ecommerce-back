import express from 'express';
const path = require('path');
import cloudinary from 'cloudinary'
import routes from './routes'
import multer from 'multer';
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


const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req,file,cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
//middlewares


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors())
try {
    app.use(multer({storage}).fields([{name: 'image1', maxCount: 5}, {name: 'image2', maxCount: 1}]))
    
} catch (error) {
    console.log(error)
}

//routes

app.use('/', routes);


//starting server

        


export const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

