import multer from 'multer';
const path = require('path');
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req,file,cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})



var upload = multer({ storage: storage });
const uploadMultiple  = upload.fields([{ name: 'image', maxCount: 8 }])
export  default  uploadMultiple