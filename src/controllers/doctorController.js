
const Meeting = require('../models/meeting')
const User = require('../models/user')

const getSingleDoctor = async ()=>{

};

const getAllDoctors = async (req, res)=>{
   
    console.log(req.body)
    
    const doctors = await User
    .find({role:"DOCTOR"})
    .select('name surname photoId doctorAppointmentDays doctorAvailable doctorMeetingDuration title')
    

    res.status(200)
    .json({
        success : true,
        data :  doctors
    });
    
    
};

/* const getBasicDoctorInfo = async (req, res)=>{
   
    console.log(req.body)
    
    const doctorInfo = await User
    .find({role:"DOCTOR"})
    .select('name surname photoId doctorAppointmentDays title field')
    

    res.status(200)
    .json({
        success : true,
        data :  doctorInfo
    });
    
    
}; */



const addAppointmentDays = async (req,res)=>{
      
   

    const {content, userId} = req.body


    
    console.log(userId, content)

    const doctor = await User.findById(userId);

    doctor.doctorAppointmentDays = content
    doctor.save()

    res.status(200)
    .json({
        success : true,
        data :  doctor
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
    getBasicDoctorInfo
    

};