const mongoose = require('mongoose');
const User = require('../models/user')
const Note = require('../models/note')


/* const addGlycosisReading = async (req,res) => {

    const {value, date, note, patientId} = req.body

    console.log("newReading", value, date)

    const patient = await User.findById(patientId)
    
    const reading = await Glycosis.create({
        patientId,
        value,
        date,
        note
    })

    console.log(date)

     patient.glycosisReadings.push(reading)

     patient.save()


    res.status(200)
    .json({
        success : true,
        data :  reading
    });
}

const deleteReadingById = async (req,res) => {
   
    const  readingId  = req.params.id

  console.log(readingId)
    
     await Glycosis.deleteOne({"_id":readingId}) 

   

    res.status(200)
    .json({
        success : true,
        message:"Kayıt başarıyla silindi"
    });
}
 */





module.exports = {

    /* addGlycosisReading,
    getReadingsByUserId,
    get24hourReadingsByUserId,
    deleteAllReadingsByUserId,
    deleteReadingById, */

}
