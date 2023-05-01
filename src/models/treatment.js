
const mongoose = require('mongoose')


const TreatmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    
    treatmentType: {
        default:null,
        type: String,
        trim: true,
       enum: ["INSULIN","ORAL ANTIDIYABETIK"/* ,"INSULIN,ORAL ANTIDIYABETIK" */],
    } ,

    /* treatmentType: ["INSULIN","ORAL ANTIDIYABETIK","INSULIN,ORAL ANTIDIYABETIK"],  */

    dose: {
     type:Array,
     default:[]   
    },
    remind: Boolean,
    time: Number,
    regime:{
        type:Array,
        default:[]   
       },
        eye:{
        type:Array,
        default:[]   
       },
       brain:{
        type:Array,
        default:[]   
       },
        kidney:{
        type:Array,
        default:[]   
       },
       heart:{
        type:Array,
        default:[]   
       },
       hypoglycemic:{
        type:Array,
        default:[]   
       },
       ketoasidoz:{
        type:Array,
        default:[]   
       },
       tromboz:{
        type:Array,
        default:[]   
       },
    


    
    
    
},
{timestamps: true}
)


TreatmentSchema.plugin(require('mongoose-autopopulate'))

const Treatment = mongoose.model('Treatment', TreatmentSchema)

module.exports = Treatment