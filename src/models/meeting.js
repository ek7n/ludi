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
    outcomes: {
        type : Array ,
        "default" : [] 
    },
    suggestions: {
        type : Array ,
        "default" : [] 
    },
    icd: {
        type : Array ,
        "default" : [] 
    },

    instructions: {
        type : Array ,
        "default" : [] 
    },
    isFinalized:{
        type: Boolean,
        default: false
    },
    isCancelled:{
        type: Boolean,
        default: false
    },
    cancelledAt:{
        type: Date,
        default: null
    },
    cancelledBy:{
        type: String,
        enum:["DOCTOR","PATIENT","ADMIN"]
    },
    confirmedAt:{
        type: Date,
        default: null
    },
    confirmedBy:{
        type: String,
        enum:["DOCTOR","ADMIN"]
    },
    roomName: {
        type: String,
        default:''
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    labTests:{
        type:Array,
        "default":[]
    }
    
},
{timestamps: true}
)


MeetingSchema.plugin(require('mongoose-autopopulate'))

const Meeting = mongoose.model('Meeting', MeetingSchema)

module.exports = Meeting