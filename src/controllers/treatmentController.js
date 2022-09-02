const Treatment = require("../models/treatment");

const addTreatmentInfo = async (req, res) => {
  const { treatmentType, /* time, remind, dose, */ patientId } = req.body;

  const treatment = await Treatment.create({
    treatmentType,
    /* time,
    remind,
    dose, */
    patientId,
  });

  res.status(200).json({
    success: true,
    data: treatment,
  });
};




const updateTreatmentInfo = async (req, res) => {
  const { treatmentType, /* time, remind, dose, */ patientId } = req.body;

  const updatedTreatment = await Treatment.findOneAndUpdate(
    {"patientId":patientId},
    
    {"treatmentType":treatmentType},
    {new:true}
  );

  res.status(200).json({
    success: true,
    data: updatedTreatment,
  });
};


const addDoseInfo = async (req, res) => {
  const {   rangesInfo, patientId } = req.body;
console.log(rangesInfo)
  const updatedTreatment = await Treatment.findOneAndUpdate(
    {"patientId":patientId},
    
    {"dose":rangesInfo},
    {new:true}
  ).select("patientId dose");

  res.status(200).json({
    success: true,
    data: updatedTreatment,
  });
};

/* const addDoseInfo = async (req, res) => {
  const {   rangesInfo, patientId } = req.body;
console.log(rangesInfo)
  const updatedTreatment = await Treatment.find(
    {"patientId":patientId}
  ).select("patientId dose").push(rangesInfo)

  res.status(200).json({
    success: true,
    data: updatedTreatment,
  });
}; */


const deleteTreatmentInfo = async (req,res) => {
   
    const  treatmentId  = req.params.id

  
    
     await Treatment.deleteOne({"_id":treatmentId}) 

   

    res.status(200)
    .json({
        success : true,
        message:"Kayıt başarıyla silindi"
    });
}




const getTreatmentInfo = async (req,res) => {
   
   
    let id = req.params.id
    
   
   treatment = await Treatment
   .find({"patientId":id})
   .sort({'date': -1}) 

   res.status(200)
   .send(treatment)
}

const getDoseInfo = async (req,res) => {
   
   
  let id = req.params.id
  
 
 doseInfo = await Treatment
 .find({"patientId":id})
 .select("dose")
  

 res.status(200)
 .send(doseInfo)
}

module.exports = {
  addTreatmentInfo,
  getTreatmentInfo,
  deleteTreatmentInfo,
  updateTreatmentInfo,
  addDoseInfo,
  getDoseInfo
};
