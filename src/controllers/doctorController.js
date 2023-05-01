
const Meeting = require('../models/meeting')
const User = require('../models/user')

const getSingleDoctor = async ()=>{

};

const getAllDoctors = async (req, res)=>{
   
    console.log(req.body)
    
    const doctors = await User
    .find({role:"DOCTOR"})
   /*  .select('name surname photoId doctorAppointmentDays doctorAvailable doctorMeetingDuration title') */
    .select('-bpReadings -glycosisReadings  -drugs -age -chronics -notes -role -heights -weights -updatedAt ')
    

    res.status(200)
    .json({
        success : true,
        data :  doctors
    });
    
    
};

const getBasicDoctorInfo = async (req, res)=>{
   
    console.log(req.body)
    
    const doctorInfo = await User
    .find( { photoId: { $exists:true }})
    .find({role:"DOCTOR"})
    .limit(4)
    /* .select('name surname photoId doctorAppointmentDays title field ') */
    .select('-bpReadings -glycosisReadings -meetings -drugs -age -chronics -notes -role -heights -weights -updatedAt ')
    

    res.status(200)
    .json({
        success : true,
        data :  doctorInfo
    });
    
    
};


const addTextAboutDoctor = async (req, res) => {
  

    const date = req.body.date;
    const text = req.body.text;
    const id = req.body.doctorId;
    
    console.log(req.body)
    const doctor = await User.findOne({"_id":id})
    
    console.log(doctor.doctorAbout)
    
    doctor.doctorAbout.push({
        text:text,
      date:date
    })
    
    console.log(doctor.doctorAbout)
    
    doctor.save();
    
    console.log(date,text,id) 
    
      res.status(200).json({
        success: true,
        data: doctor.doctorAbout,
      });
    };


    const deleteTextAboutDoctorByIndex = async (req, res) => {
    
        const id = req.params.doctorId;
        const index = req.params.index;
        console.log(index);
      
        
      const doctor = await User.findOne({"_id":id})
      
      console.log(doctor.doctorAbout)
      
    
      
    if (index > -1) { 
        doctor.doctorAbout.splice(index, 1); 
    }
    
    doctor.save();
    
     console.log(doctor.doctorAbout)
    
        res.status(200).json({
          success: true,
          data:doctor.doctorAbout,
          message: "Metin başarıyla silindi.",
        });
      };
    

    deleteTextAboutDoctorByIndex

const addAppointmentDays = async (req,res)=>{
      
   

    const {content, userId} = req.body


    
    console.log( req.body)

    const doctor = await User.findById(userId);

    doctor.doctorAppointmentDays = content
    doctor.save()

    res.status(200)
    .json({
        success : true,
        data :  doctor.doctorAppointmentDays
    });
};


const setMeetingDuration = async (req,res)=>{
   

    const {content, userId} = req.body


    
    console.log(userId, content)

    const doctor = await User.findById(userId);

    doctor.doctorMeetingDuration = content
    doctor.save()


    res.status(200)
    .json({
        success : true,
        data :  doctor.doctorMeetingDuration
    });
};

const setDoctorAvailable = async (req,res)=>{
   

    const {content, userId} = req.body


    
    console.log(userId, content)

    const doctor = await User.findById(userId);

    doctor.doctorAvailable = content
    doctor.save()


    res.status(200)
    .json({
        success : true,
        data :  doctor.setDoctorAvailable
    });
};

const setEpicrisys = () => {


    res.status(200)
    .json({
        success : true,
        data :  null
    });

}

const deleteDoctorById = () => {


    res.status(200)
    .json({
        success : true,
        data :  null
    });

}

const getPatientsByDoctor = async (req,res) => {

    let doctorId = req.params.id
    

     patients = await Meeting
    .find({"doctorId" : doctorId })
    .distinct("patientId")
    .populate("name surname")

    
    res.status(200)
    .json({
        success : true,
        data : patients
    });

}




module.exports = {
    getAllDoctors,
    getSingleDoctor,
    setEpicrisys,
    deleteDoctorById,
    getPatientsByDoctor,
    addAppointmentDays,
    setDoctorAvailable,
    setMeetingDuration,
    getBasicDoctorInfo,
    addTextAboutDoctor,
    deleteTextAboutDoctorByIndex
    

};