
const mongoose = require('mongoose')


const TreatmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
<<<<<<< HEAD
    treatmentType: ["INSULIN","ORAL ANTIDIYABETIK"/* ,"INSULIN,ORAL ANTIDIYABETIK" */], 
=======
    treatmentType: ["INSULIN","ORAL ANTIDIYABETIK","INSULIN,ORAL ANTIDIYABETIK"], 
>>>>>>> 3ab1272a34bb0c0ab4fbc38e54d4b54d67798c4b
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