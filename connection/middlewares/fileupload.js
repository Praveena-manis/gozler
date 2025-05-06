import multer from "multer";
import path from 'path'
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images')//update image to images folder
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname.split('.')[0]+'-'+Date.now()+path.extname(file.originalname))
    }
})
export const upload=multer({
    storage:storage,
    limits:{fileSize:5*1024*1024},//5MB
    fileFilter:(req,file,cb)=>{
        const fileTypes=/jpeg|jpg|png|gif/
        const extname=fileTypes.test(path.extname(file.originalname))
        const mimeType=fileTypes.test(file.mimetype);
        if(extname&&mimeType)
            return cb(null,true)
        else
            cb('Error:Upload Images Only')
    }
})