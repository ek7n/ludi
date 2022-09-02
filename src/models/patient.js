
const mongoose = require('mongoose')


const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
       // required: true,
        minlength: 2
    },
    surname: {
        type: String,
        //required: true,
        minlength: 2
    },
    userId : {
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    filesUploaded: { 
        type : Array ,
        "default" : [] 
    },
    notes: {
        type : Array ,
        "default" : []
    },
    meetings: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'Meeting',
        autopopulate: {
            maxDepth: 1
        }
    }],
    createdAt: {
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type : Date,
        default : Date.now
    }
},
{timestamps: true}
)


PatientSchema.plugin(require('mongoose-autopopulate'))

const Patient = mongoose.model('Patient', PatientSchema)


module.exports = Patient