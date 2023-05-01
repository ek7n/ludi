
const mongoose = require('mongoose')


const motherChronicsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    value:String,
   parent:String
    


    
    
    
},
{timestamps: true}
)


motherChronicsSchema.plugin(require('mongoose-autopopulate'))

const motherChronics = mongoose.model('motherChronics', motherChronicsSchema)

module.exports = motherChronics