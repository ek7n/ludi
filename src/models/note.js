const mongoose = require('mongoose')


const NoteSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    },
    content: String, 
    


    
    
    
},
{timestamps: true}
)


NoteSchema.plugin(require('mongoose-autopopulate'))

const Note = mongoose.model('Note', NoteSchema)

module.exports = Note