const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const md5 = require('md5');
const passportLocalMongoose = require('passport-local-mongoose')
/* const Schema = mongoose.Schema;
const Room = require('../models/room') */

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        trim:true
    },
    surname: {
        type: String,
        required: true,
        minlength: 2,
        trim:true
    },
    title: {
        type: String,
        
    },
    meetings: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'Meeting',
        autopopulate: {
            maxDepth: 1
        }
    }],
    meetingRoom:String,
    glycosisReadings: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'Glycosis',
        autopopulate: {
            maxDepth: 1
        }
    }],
    bpReadings: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'BloodPressure',
        autopopulate: {
            maxDepth: 1
        }
    }],
    email:{
      type: String,
      required: true,
      match : [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email"
    ],
    unique: true,
    lowercase: true,
    trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true,
        enum:['DOCTOR', 'PATIENT', 'RELATIVE','ADMIN']
    } ,
    gender: {
        type: String,
        required: true,
        trim: true,
        enum:['MALE', 'FEMALE']
    } ,
    field: {
        type: String,
        
        trim: true,
        enum:['Endokrinoloji', 'İç hastalıkları']
    } ,
    age: { 
        type: Number,
        min: 18,
        default: null,
    },
    heights: { 
        type: Array,
        "default":[]
        
    },
    weights: { 
        type: Array,
        "default":[]
        
    },
    notes: {
        type : Array ,
        "default" : [
    /*         {
            type:mongoose.SchemaTypes.ObjectId,
            ref: 'Note',
            autopopulate: {
                maxDepth: 1
            }
        } */
    ]
    },
    chronics: {
        type : Array ,
        "default" : []
    },
    drugs: {
        type : Array ,
        "default" : []
    },
    doctorAbout: {
        type : Array ,
        "default" : []
    },
    doctorAppointmentDays: {
        type : Array ,
        "default" : []
    },
    doctorAvailable: {
        type: Boolean,
        "default": false
    },
    doctorMeetingDuration: {
        type: Number,
        default: 20
    },
    treatmentType:{
        type: String,
        enum:["INSULIN","ORAL ANTIDIYABETIK"]
    },
    photoId: {
        type: String,
        default: null
    },
    gender:{
        type: String,
        enum:["MALE","FEMALE"]
    }


},
{timestamps:true}
)

UserSchema.virtual('gravatar').get(function() {
    const hash = md5(this.email);
    return `https://gravatar.com/avatar/${hash}?s=200`;
  });



/* UserSchema.post("save",async function(next){
   
    let user = this;
    if(user.role == 'DOCTOR'){
        const room = await Room.find({available:true})
        .splice(-1)

      user.meetingRoom = room.name
    }
    }); 
 */
UserSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  UserSchema.plugin(passportLocalMongoose, {usernameField: 'email'})





UserSchema.plugin(require('mongoose-autopopulate'))

const User = mongoose.model('User', UserSchema)

module.exports = User

