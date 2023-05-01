const mongoose = require('mongoose');
const User = require('../models/user')
const Glycosis = require('../models/glycosis')
var cron = require('node-cron');
var _ = require('lodash');

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

const moment = require('moment');
const { isDate } = require('lodash');

const addGlycosisReading = async (req,res) => {

    const {value, date, note, patientId,mealStatus,dayTime,unit} = req.body

    console.log("newReading", value, date, patientId )

    const patient = await User.findById(patientId)
    
    const reading = await Glycosis.create({
        patientId,
        value,
        date,
        note,
        mealStatus,
        dayTime,
        unit

    })

    console.log(date,mealStatus,dayTime)

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


const getAllReadings = async (req,res) => {

   readings = await Glycosis
   /* .find({"patientId":id}) */
   .find({})
   .sort({'date': -1}) 

   const emails = await User.find({role:"PATIENT"}).select('-glycosisReadings -bpReadings -meetings').select('email')
  
   const newValues = {}
    const ids = emails.map(item => item._id)
    const values = emails.map(item => item.email)

   
     ids.map((el,index)=>{
        newValues[el] = values[index]
     })


   let result = _.groupBy(readings,"patientId")
   let myVals = Object.values(result)
    const daysWithoutReading = [];
    myVals.map(val => daysWithoutReading.push({_id:val[0].patientId,numberOfDays: moment(Date.now()).diff(moment(val[0].date),"days"),email:newValues[val[0].patientId]}))
   
console.log("days without reading",daysWithoutReading)

     daysWithoutReading.forEach(
        reading => transporter.sendMail({
            to: reading.email,
            from: "eekinci367@gmail.com",
            subject: `Nerelerdesiniz? ❓`,
            html: `<p>
            ${reading.numberOfDays} gündür veri girişi yapmadınız.
            </p>`,
          })
    )  

}

/* cron.schedule('* 34 14 * * *', () => {
    getAllReadings();
    console.log('running a task every minute');
  }, {timezone:"Asia/Istanbul"}); */




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
  

/* const a = readings.filter(x=>x.mealStatus=="after" && x.dayTime=="morning")
                    .map((x)=>{
                    if(x.value >= 70 && x.value <= 160){
                     return x.unit = 8
                    } else if(x.value > 160){
                     return Math.floor((parseInt(x.value) - 160) / 20) + 8
                    }
                  })
  */

                
                    /* if(a.value >= 70 && a.value <= 160){
                      a.push(unit = 8)
                    } else if(a.value > 160){
                    a.push(unit =  Math.floor((parseInt(a.value) - 160) / 20) + 8)
                    } */
                  

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
    getAllReadings

}