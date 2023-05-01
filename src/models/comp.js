
const mongoose = require('mongoose')


const CompsSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    value:String
    


    
    
    
},
{timestamps: true}
)


CompsSchema.plugin(require('mongoose-autopopulate'))

const Comps = mongoose.model('Comps', CompsSchema)

module.exports = Comps