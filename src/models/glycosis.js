const mongoose = require('mongoose')


const GlycosisSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    value: Number, 
    date: Date,
    note: String,
    glyNote: String


    
    
    
},
{timestamps: true}
)


GlycosisSchema.plugin(require('mongoose-autopopulate'))

const Glycosis = mongoose.model('Glycosis', GlycosisSchema)

module.exports = Glycosis