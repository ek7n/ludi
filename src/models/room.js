const mongoose = require('mongoose')


const RoomSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:2
    },
    available:{
        default: true,
        type: Boolean
    }   
    
   
    
    
    
},
{timestamps: true}
)


RoomSchema.plugin(require('mongoose-autopopulate'))

const Room = mongoose.model('Room', RoomSchema)

module.exports = Room