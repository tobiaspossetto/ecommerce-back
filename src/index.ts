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
       // console.log(req)
    }
   
})


//middlewares
app.use(cors())

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.use(multer({storage, fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return callback(new Error('Only images are allowed'))
        
    }
    callback(null, true)
}}).fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}]))
app.use((err: any,req:any,res:any,next:any)=>{
    console.log(err.message);
    res.status(400).json({ "error":true,
      "msg":err.message
    })
  })

app.use('/', routes);


//starting server

        


export const server = app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`)
})

