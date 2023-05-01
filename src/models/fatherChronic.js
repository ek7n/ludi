
const mongoose = require('mongoose')


const fatherChronicsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    value:String,
   parent:String
    


    
    
    
},
{timestamps: true}
)


fatherChronicsSchema.plugin(require('mongoose-autopopulate'))

const fatherChronics = mongoose.model('fatherChronics', fatherChronicsSchema)

module.exports = fatherChronics