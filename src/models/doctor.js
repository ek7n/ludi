const mongoose = require('mongoose')
const Schema = mongoose.Schema;
//const bcrypt = require('bcrypt');

const DoctorSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: false,
        minlength: 2
    },
    field: {
        type: String,
        required: false,
        minlength: 2
    },
    experience: Number,
    meetings: [{
        type:mongoose.SchemaTypes.ObjectId,
        ref: 'Meeting',
        autopopulate: {
            maxDepth: 1
        }
    }],
    userInfo:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
   
},
{timestamps:true})

/*
DoctorSchema.pre("save",function(next){

    if(!this.isModified("password")){
        next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if(err) next(err);
        bcrypt.hash(this.password, salt, (err, hash) => {
            if(err) next(err);
            this.password = hash;
            next();
        });
    });

});
*/



const Doctor = mongoose.model('Doctor', DoctorSchema)

//Doctor.plugin(require('mongoose-autopopulate'))

module.exports = Doctor