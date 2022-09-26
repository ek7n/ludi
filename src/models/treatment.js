
const mongoose = require('mongoose')


const TreatmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    treatmentType: ["INSULIN","ORAL ANTIDIYABETIK","INSULIN,ORAL ANTIDIYABETIK"], 
    dose: {
     type:Array   
    },
    remind: Boolean,
    time: Number
    


    
    
    
},
{timestamps: true}
)


TreatmentSchema.plugin(require('mongoose-autopopulate'))

const Treatment = mongoose.model('Treatment', TreatmentSchema)

module.exports = Treatment