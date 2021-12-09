import {Request, Response, NextFunction} from 'express'
const path = require('path');
const multer = require('multer')
import fs from 'fs-extra'

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req:Request,file:any,cb:any) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
      
    }
   
})


//@ts-ignore
 const upload = multer({storage,fileFilter:  function (req, file, cb) {
    if (file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
     req.fileValidationError = 'only images are allowed';
       
      
     return cb(null, false, new Error('only images are allowed'));
    }
    cb(null, true);
   }}).fields([{name: 'image1', maxCount: 1}, {name: 'image2', maxCount: 1}])


export  const uploadImg = (req:Request, res:Response,next: NextFunction) =>{
   
   
    upload(req,res,function(err:Error) {
        
         //@ts-ignore
         if(req.fileValidationError){
             
          
             //@ts-ignore
             res.status(400).json({"error":true, "message":req.fileValidationError})
            
         }else{next()}
     })
   
    
   
 
 }