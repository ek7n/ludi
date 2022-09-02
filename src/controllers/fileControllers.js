
const User = require('../models/user')
const File = require('../models/file')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
      },
      filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
      }

})


const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };


  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


const uploadFile = async (req,res) => {
    

    const {fileName, fileContent} = req.body
    
    console.log(req.file)
    
    const file = await File.create({
        fileName:req.file.filename,
        fileContent:req.file.path
    })



    res.status(200)
    .json({
        success : true,
       // data :  file
    });
}



const getFiles = async (req,res) => {
    

    //const {fileName, fileContent} = req.body
    
    //console.log(req.file)
    
    const files = await File.find()



    res.status(200)
    .json({
        success : true,
        data :  files
    });
}


module.exports = {

    uploadFile,
    upload,
    getFiles
   
}