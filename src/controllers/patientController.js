const User = require("../models/user");
const Note = require("../models/note");

const addPatientBaseInfo = async (req, res) => {
  const userId = req.body.patientId;
  const age = req.body.age;
  const height = req.body.height;
  const weight = req.body.weight;

  console.log(req.body, userId);

  const user = await User.findOneAndUpdate(
    {"_id": userId},
    {
      "age":age,
      /* "height":height,
      "weight":weight */
    },{new:true}
    );


  console.log(user);

  res.status(200).json({
    success: true,
    data: null,
  });
};

const getPatientNotes = async (req, res, next) => {
  const { id } = req.params;

  notes = await Note.find({"patientId": id }).sort({ date: -1 });

  res.status(200).json({
    success: true,
    data: notes,
  });
};

const deletePatientNoteById = async (req, res, next) => {
  const noteId = req.params.id;

  console.log(noteId);

  await Note.deleteOne({ "_id": noteId });

  res.status(200).json({
    success: true,
    message: "Kayıt başarıyla silindi",
  });

  
};


const addPatientWeight = async (req,res,next) => {
 
  const id = req.body.patientId;
  const weight = req.body.weight;
  const date = req.body.date;
  console.log(weight)

  const user = await User.findById(id)

  //console.log(user)

  user.weights.push({weight, date});

  user.save();

  console.log(user.weights)
  
  
  
  res.status(200).json({
    success: true,
    data: user.weight,
  });
};



const addPatientHeight = async (req,res,next) => {
 
  const id = req.body.patientId;
  const height = req.body.height;
  const date = req.body.date;

  console.log(height)

  const user = await User.findById(id)

  //console.log(user)

  user.heights.push({height,date});

  user.save();

  console.log(req.body)
  
  res.status(200).json({
    success: true,
    data: user.height,
  });
};



const addPatientAge = async (req,res,next) => {
 
  const id = req.body.patientId;
  const age = req.body.age;

  console.log(age)

  const user = await User.findById(id)

  //console.log(user)

  user.age = age ;

  user.save();

  console.log(user.age)
  
  res.status(200).json({
    success: true,
    data: user.age,
  });
};





const deletePatientById = () => {
  res.status(200).json({
    success: true,
    data: null,
  });
};

const getPatientsByDoctor = () => {
  res.status(200).json({
    success: true,
    data: null,
  });
};

const uploadFile = () => {
  res.status(200).json({
    success: true,
    data: null,
  });
};

const uploadPicture = () => {
  res.status(200).json({
    success: true,
    data: null,
  });
};

const getAnamnesys = () => {
  res.status(200).json({
    success: true,
    data: null,
  });
};

module.exports = {
  deletePatientById,
  getPatientsByDoctor,
  uploadFile,
  uploadPicture,
  getAnamnesys,
  getPatientNotes,
  addPatientBaseInfo,
  deletePatientNoteById,
  addPatientWeight,
  addPatientHeight,
  addPatientAge,
  
};
