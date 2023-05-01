
const mongoose = require('mongoose')


const DrugSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    drugs:Object,
    addedBy:String,
    addedRole:String
    


    
    
    
},
{timestamps: true}
)


DrugSchema.plugin(require('mongoose-autopopulate'))

const Drug = mongoose.model('Drug', DrugSchema)

module.exports = Drug