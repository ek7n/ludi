const Chronic = require("../models/chronic");
const fatherChronic = require("../models/fatherChronic");
const motherChronic = require("../models/motherChronic");
const Comp = require("../models/comp");

const addChronic = async (req, res) => {
  const {  patientId, value } = req.body;

console.log(patientId, value )
    
  const chronic = await Chronic.create({
    value,
    patientId,
  });

  res.status(200).json({
    success: true,
    data: chronic,
    message:"Kayıt başarıyla eklendi"
  });
};


const addFatherChronic = async (req,res)=>{
   
  const {  patientId, value } = req.body;

  console.log(patientId, value )
      
    const chronic = await fatherChronic.create({
      value,
      patientId,
    });
  
    res.status(200).json({
      success: true,
      data: chronic,
      message:"Kayıt başarıyla eklendi"
    });

};


const addMotherChronic = async (req,res)=>{
  const {  patientId, value } = req.body;

  console.log(patientId, value )
      
    const chronic = await motherChronic.create({
      value,
      patientId,
    });
  
    res.status(200).json({
      success: true,
      data: chronic,
      message:"Kayıt başarıyla eklendi"
    });
  
};

const addComp = async (req, res) => {
  const {  patientId, value } = req.body;

console.log(patientId, value )
    
  const comp = await Comp.create({
    value,
    patientId,
  });

  res.status(200).json({
    success: true,
    data: comp,
    message:"Kayıt başarıyla eklendi"
  });
};



const deleteChronic = async (req,res) => {
   
    const  chronicId  = req.params.id

  console.log(req.params)
    
     await Chronic.deleteOne({"_id":chronicId}) 
    res.status(200)
    .json({
        success : true,
        message:"Kayıt başarıyla silindi"
    });
}


const deleteMotherChronic = async (req,res) => {
   
  const  chronicId  = req.params.id

console.log(req.params)
  
   await motherChronic.deleteOne({"_id":chronicId}) 
  res.status(200)
  .json({
      success : true,
      message:"Kayıt başarıyla silindi"
  });
};

const deleteFatherChronic = async (req,res) => {
   
  const  chronicId  = req.params.id

console.log(req.params)
  
   await fatherChronic.deleteOne({"_id":chronicId}) 
  res.status(200)
  .json({
      success : true,
      message:"Kayıt başarıyla silindi"
  });
}

const deleteComp = async (req,res) => {
   
  console.log(req.params)

  const  id  = req.params.id

   await Comp.deleteOne({"_id":id}) 

  res.status(200)
  .json({
      success : true,
      message:"Kayıt başarıyla silindi"
  });
}




const getChronics = async (req,res) => {
    let id = req.params.id
  
   chronics = await Chronic
   .find({"patientId":id})
   .sort({'date': -1}) 
  
   res.status(200)
   .send(chronics)

}

const getMotherChronics = async (req,res) => {
  let id = req.params.id

 motherChronics = await motherChronic
 .find({"patientId":id})
 .sort({'date': -1}) 

 res.status(200)
 .send(motherChronics)

}

const getFatherChronics = async (req,res) => {
  let id = req.params.id

 fatherChronics = await fatherChronic
 .find({"patientId":id})
 .sort({'date': -1}) 

 res.status(200)
 .send(fatherChronics)

}

const getComps = async (req,res) => {
  let id = req.params.id

 comps = await Comp
 .find({"patientId":id})
 .sort({'date': -1}) 

 res.status(200)
 .send(comps)

}

module.exports = {
  addChronic,
  deleteChronic,
  getChronics,
  addComp,
  getComps,
  addFatherChronic,
  addMotherChronic,
  deleteComp,
  getMotherChronics,
  getFatherChronics,
  deleteFatherChronic,
  deleteMotherChronic
};
