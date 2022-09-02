const mongoose = require('mongoose')


const FileSchema = new mongoose.Schema({

    fileName:{
        value:'',
        type: String
    },
    fileContent:{
       value:'',
       type: String
    }

    
},
{timestamps:true})





const File = mongoose.model('File', FileSchema)

//Doctor.plugin(require('mongoose-autopopulate'))

module.exports = File