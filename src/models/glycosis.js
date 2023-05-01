const { isInteger } = require('lodash')

const mongoose = require('mongoose')


const GlycosisSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    value: Number, 
    date: Date,
    note: String,
    glyNote: String,
    mealStatus: {
        type: String,
        trim: true,
        enum:['before', 'after']
    } ,
    dayTime:{
        type: String,
        trim: true,
        enum:['morning', 'noon','evening','night']
    } ,
    unit:Number  
},
{timestamps: true}
)

GlycosisSchema.plugin(require('mongoose-autopopulate'))

const Glycosis = mongoose.model('Glycosis', GlycosisSchema)

module.exports = Glycosis