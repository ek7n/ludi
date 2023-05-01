const Treatment = require("../models/treatment");
const Drug = require("../models/drug");

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

const addInsulinRegimeInfo = async (req, res) => {
  const { insulinRegime, patientId } = req.body;
console.log(insulinRegime)
  const updatedTreatment = await Treatment.findOneAndUpdate(
    {"patientId":patientId},
    
    {"regime":insulinRegime},
    {new:true}
  ).select("patientId insulinRegime");

  res.status(200).json({
    success: true,
    data: updatedTreatment,
  });
};



const deleteTreatmentInfo = async (req,res) => {
   
    const  treatmentId  = req.params.id

  
    
     await Treatment.deleteOne({"_id":treatmentId}) 

   

    res.status(200)
    .json({
        success : true,
        message:"Kayıt başarıyla silindi"
    });
}


const addDrugInfo = async (req, res) => {
  const {  patientId, drugs } = req.body;

console.log(patientId, drugs )

  const drug = await Drug.create({
    drugs,
    patientId,
  });

  res.status(200).json({
    success: true,
    data: drug,
    message:"Kayıt başarıyla eklendi"
  });
};


const getDrugs = async (req,res) => {
   
   try{
    let id = req.params.id

 drugs = await Drug
 .find({"patientId":id})
 .sort({'createdAt': -1}) 
  
 res.status(200)
 .send(drugs)
   } catch(e) {
    console.log(e);
   }
  


}

const getTreatmentInfo = async (req,res) => {
   
   
    let id = req.params.id
    
   
   treatment = await Treatment
   .find({"patientId":id})
   .sort({'date': -1}) 

   res.status(200)
   .send(treatment)
}


const addEyeVisitDate = async (req,res)=>{
   
  const {content, userId} = req.body

  console.log(userId, content)

  const treatment = await Treatment.findOne({"patientId":userId});

  treatment.eye.push({date:content,userId:userId})
  treatment.save()


  res.status(200)
  .json({
      success : true,
      data :  treatment.eye
  });
};


const addKidneyVisitDate = async (req,res)=>{
   
  const {content, userId} = req.body

  console.log(userId, content)

  const treatment = await Treatment.findOne({"patientId":userId});

  treatment.kidney.push({date:content,userId:userId})
  treatment.save()


  res.status(200)
  .json({
      success : true,
      data :  treatment.kidney
  });
};


const addHeartVisitDate = async (req,res)=>{
   
  const {content, userId} = req.body

  console.log(userId, content)

  const treatment = await Treatment.findOne({"patientId":userId});

  treatment.heart.push({date:content,userId:userId})
  treatment.save()


  res.status(200)
  .json({
      success : true,
      data :  treatment.heart
  });
};


const addBrainVisitDate = async (req,res)=>{
   
  const {content, userId} = req.body

  console.log(userId, content)

  const treatment = await Treatment.findOne({"patientId":userId});

  treatment.brain.push({date:content,userId:userId})
  treatment.save()


  res.status(200)
  .json({
      success : true,
      data :  treatment.brain
  });
};

const addHypoglycemicEventInfo = async (req,res)=>{
   
  const {content, userId} = req.body

  console.log(userId, content)

  const treatment = await Treatment.findOne({"patientId":userId});

  treatment.hypoglycemic.push({value:content,userId:userId})
  treatment.save()


  res.status(200)
  .json({
      success : true,
      data :  treatment.hypoglycemic
  });
};

const addTrombozInfo = async (req,res)=>{
   
  const {content, userId} = req.body

  console.log(userId, content)

  const treatment = await Treatment.findOne({"patientId":userId});

  treatment.tromboz.push({value:content,userId:userId})
  treatment.save()


  res.status(200)
  .json({
      success : true,
      data :  treatment.tromboz
  });
};

const addKetoasidozInfo = async (req,res)=>{
   
  const {content, userId} = req.body

  console.log(userId, content)

  const treatment = await Treatment.findOne({"patientId":userId});

  

  treatment.ketoasidoz.push({value:content,userId:userId})
  treatment.save()


  res.status(200)
  .json({
      success : true,
      data :  treatment.ketoasidoz
  });
};


const getDoseInfo = async (req,res) => {
  
  let id = req.params.id
  
 
 doseInfo = await Treatment
 .find({"patientId":id})
 .select("dose")
  

 res.status(200)
 .send(doseInfo)
}

const getInsulinRegimeInfo = async (req,res) => {
  
  let id = req.params.id
  
 
 regimeInfo = await Treatment
 .find({"patientId":id})
 .select("regime")
  

 res.status(200)
 .send(regimeInfo)
}

module.exports = {
  addTreatmentInfo,
  getTreatmentInfo,
  deleteTreatmentInfo,
  updateTreatmentInfo,
  addDoseInfo,
  getDoseInfo,
  addDrugInfo,
  getDrugs,
  addInsulinRegimeInfo,
  getInsulinRegimeInfo,
  addEyeVisitDate,
  addKidneyVisitDate,
  addHeartVisitDate,
  addBrainVisitDate,
  addHypoglycemicEventInfo,
  addKetoasidozInfo,
  addTrombozInfo
};
