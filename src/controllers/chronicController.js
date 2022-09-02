const Chronic = require("../models/chronic");

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



const deleteChronic = async (req,res) => {
   
    const  chronicId  = req.params.id

  
    
     await Chronic.deleteOne({"_id":chronicId}) 

   

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

module.exports = {
  addChronic,
  deleteChronic,
  getChronics
};
