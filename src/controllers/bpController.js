
const User = require('../models/user')
const BloodPressure = require('../models/bloodPressure')


const addBloodPressure = async (req,res) => {

    const {systolic, diastolic, note, date, patientId} = req.body

    console.log( "pid", patientId, "body", req.body)

    const patient = await User.findById(patientId)
    
    const bp = await BloodPressure.create({
        patientId,
        systolic,
        diastolic, 
        note,
        date
    })


     patient.bpReadings.push(bp)

     patient.save()


    res.status(200)
    .json({
        success : true,
        data :  bp
    });
}

const getBPsByUserId = async (req,res) => {
   
   
     let id = req.params.id
     console.log(id)
    
    bps = await BloodPressure
    .find({"patientId":id})
    .sort({'date': -1}) 
     

/*     res.status(200)
    .json({
        success : true,
        data :  readings
    }); */

    res.status(200)
    .send(bps)


}

const deleteAllBPsByUserId = async (req,res) => {
   
    const { patientId } = req.body

    console.log(typeof id)
    
    const bp = await BloodPressure.deleteMany({"patientId":patientId}) 

    res.status(200)
    .json({
        success : true,
        data :  bp,
        message:"Kayıt başarıyla silindi"
    });
}

const deleteBpById = async (req,res) => {
   
    const  bpId  = req.params.id

  console.log(bpId)
    
     await BloodPressure.deleteOne({"_id":bpId}) 

   

    res.status(200)
    .json({
        success : true,
        message:"Kayıt başarıyla silindi"
    });
}

module.exports = {

    addBloodPressure,
    getBPsByUserId,
    deleteAllBPsByUserId,
    deleteBpById

}