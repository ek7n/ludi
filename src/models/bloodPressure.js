const mongoose = require('mongoose')


const BloodPressureSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    
        systolic: Number,
        diastolic: Number,
        date: Date,
        note:String
    
    
    
    
},
{timestamps: true}
)


BloodPressureSchema.plugin(require('mongoose-autopopulate'))

const BloodPressure = mongoose.model('BloodPressure', BloodPressureSchema)

module.exports = BloodPressure