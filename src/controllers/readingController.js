const mongoose = require('mongoose');
const User = require('../models/user')
const Glycosis = require('../models/glycosis')

const moment = require('moment')

const addGlycosisReading = async (req,res) => {

    const {value, date, note, patientId} = req.body

    console.log("newReading", value, date, patientId )

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

const getReadingsByUserId = async (req,res) => {
   
   
     let id = req.params.id
     console.log(id)
    
    readings = await Glycosis
    .find({"patientId":id})
    .sort({'date': -1}) 
     



    res.status(200)
    .send(readings)


}

const get24hourReadingsByUserId = async (req,res) => {
   
   
    let id = req.params.id
    console.log(id)

    const today = moment().startOf('day')
    console.log(today)
    console.log(moment(today).endOf('day'))
   
   readings = await Glycosis
   .find({"patientId":id})
    .find({

    date:{
        $gte: today,
        $lte: moment(today).endOf('day')
       }
   }
   )
   .sort({'date': -1}) 
  



   res.status(200)
   .json({
    success : true,
    data :  readings,
    message:`Bu kullanıcıya son 24 saatte ${readings.length} adet veri girişi bulunmaktadır.   `
});
  /*  .send({readings,"message":`Bu kullanıcıya son 24 saatte ${readings.length} adet veri girişi bulunmaktadır.   `}) */


}


const get48hourReadingsByUserId = async (req,res) => {
   
   
    let id = req.params.id
    console.log(id)
   
   readings = await Glycosis
   .find({"patientId":id})
    



   res.status(200)
   .send(readings)


}

const getLastWeeksReadingsByUserId = async (req,res) => {
   
   
    let id = req.params.id
    console.log(id)
   
   readings = await Glycosis
   .find({"patientId":id})
    



   res.status(200)
   .send(readings)


}


const deleteAllReadingsByUserId = async (req,res) => {
   
    const { patientId } = req.body

  
    
    const reading = await Glycosis.deleteMany({"patientId":patientId}) 

    res.status(200)
    .json({
        success : true,
        data :  reading,
        message:"Kayıt başarıyla silindi"
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



module.exports = {

    addGlycosisReading,
    getReadingsByUserId,
    get24hourReadingsByUserId,
    deleteAllReadingsByUserId,
    deleteReadingById,

}