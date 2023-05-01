const mongoose = require('mongoose')


const RemindSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    category:{
        type: String,
        enum:["ABSENCE","MEETING","HOSPITAL"]
    },
    numberOfdaysWithoutRecording:{
        type:Number,
        default:null,
    },
    when:{
        type:Date,
        default:null,
    },


    
    
    
},
{timestamps: true}
)




RemindSchema.plugin(require('mongoose-autopopulate'))

const Remind = mongoose.model('Remind', RemindSchema)

module.exports = Remind