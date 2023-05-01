
const mongoose = require('mongoose')


const ChronicsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    value:String,
   parent:String
    


    
    
    
},
{timestamps: true}
)


ChronicsSchema.plugin(require('mongoose-autopopulate'))

const Chronics = mongoose.model('Chronics', ChronicsSchema)

module.exports = Chronics