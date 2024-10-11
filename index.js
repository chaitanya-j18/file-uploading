const express = require("express")
const multer = require("multer")
const app =  express();

app.use(express.json())

const getFormattedDate = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    return `${year}-${month}-${day}_${hours}-${minutes}-${seconds}`;
}

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null,getFormattedDate()+'_'+file.originalname)
    }
});



const upload = multer ({
    storage:storage,
    fileFilter:(req,file,cb)=>{
        if(file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'image/png'){
            cb(null,true)
       
        }else{
            cb(new Error('Invalid file type'))
        }
    }

})

app.post('/upload',upload.single('file'),(req,res)=>{
    
        if(!req.file){
            console.log("file is required")
        }else{
            res.send("file not uploadwd")
        }
    
    
})


app.listen(3002,()=>{
    console.log(`server is runnig on 3002`)
})