const mongoose = require('mongoose')


const MeetingSchema = new mongoose.Schema({
    title: String,
    doctorId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        autopopulate: {
            maxDepth: 1
        }
    },
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        autopopulate: {
           maxDepth:1
        }
    },
    patientS:String,
    doctorS:String,
   
    doctorNotes: { 
        type : Array ,
        "default" : [] 
    },	
    patientMeetingNote: { 
        type : String,
        "default" : '' 
    },	
    doctorReminders: { 
        type : Array ,
        "default" : [] 
    },
    patientReminders: { 
        type : Array ,
        "default" : [] 
    },
    prerequisities: { 
        type : Array ,
        "default" : [] 
    },
    startsAt: {
        type: Date,
        "default": ''
    },
    roomName:String,
    endsAt: {
        type: Date,
        "default": ''
    },
    lastsFor: {
        type: Number,
        "default": 20
    },
    outcome: {
        type: String,
        default:''
    },
    isFinalized:{
        type: Boolean,
        default: false
    },
    roomName: {
        type: String,
        default:''
    },
    
},
{timestamps: true}
)


MeetingSchema.plugin(require('mongoose-autopopulate'))

const Meeting = mongoose.model('Meeting', MeetingSchema)

module.exports = Meeting