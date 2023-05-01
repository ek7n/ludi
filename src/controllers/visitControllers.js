const mongoose = require("mongoose");
const User = require("../models/user");
const moment = require("moment");
const Meeting = require("../models/meeting");
const Room = require("../models/room");
/* const fetch = require("node-fetch"); */
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: process.env.SENDGRID_API_KEY,
    },
  })
);

const checkDoctorExists = async (req, res, next) => {
  const doctorId = req.body.doctorId;
  console.log(doctorId);
  //const doctor = await User.findById(doctorId)

  if (doctor) {
    next();
  }

  res.status(404).json({
    success: false,
    message: "User does not exist",
  });
};

const getAllAppointments = async (req, res) => {
  console.log(req.body);

  const visits = await Meeting.find({});

  res.status(200).json({
    success: true,
    data: visits,
  });
};

const getRooms = async (req, res) => {
  console.log(req.body);

  const rooms = await Room.find({});

  res.status(200).json({
    success: true,
    data: rooms,
  });
};

const addRoom = async (req, res) => {
  const name = req.body.name;

  console.log(req.body.name);

  await Room.create({
    name,
  });

  res.status(200).json({
    success: true,
    data: null,
  });
};


const addOutcome = async (req, res) => {
  

const date = req.body.date;
const outcome = req.body.outcome;
const id = req.body.meetingId;

const meet = await Meeting.findOne({"_id":id})

console.log(meet.outcomes)

meet.outcomes.push({
  outcome:outcome,
  date:date
})

console.log(meet.outcomes)

meet.save();

console.log(date,outcome,id) 

  res.status(200).json({
    success: true,
    data: meet.outcomes,
  });
};


const addLabTests = async (req, res) => {
  

  const date = req.body.date;
  const labTests = req.body.labTests;
  const id = req.body.meetingId;
  
  const meet = await Meeting.findOne({"_id":id})
  

  meet.labTests.push({
    labTests:labTests,
    date:date
  })
  
  console.log(meet.labTests)
  
  meet.save();
  
  console.log(date,labTests,id) 
  
    res.status(200).json({
      success: true,
      data: meet.labTests,
    });
  };


const addSuggestion = async (req, res) => {
  

  const date = req.body.date;
  const suggestion = req.body.suggestion;
  const id = req.body.meetingId;
  
  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.suggestions)
  
  meet.suggestions.push({
    suggestion:suggestion,
    date:date
  })
  
  console.log(meet.suggestions)
  
  meet.save();
  
  console.log(date,suggestion,id) 
  
    res.status(200).json({
      success: true,
      data: meet.suggestions,
    });
  };


const addICDCode = async (req, res) => {
  
  const date = req.body.date;
  const code = req.body.code;
  const definition = req.body.definition;
  const id = req.body.meetingId;
  
  console.log(code,id)

  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.icd)
  
  meet.icd.push({
    code:code,
    date:date,
    definition:definition
  })
  
  console.log(meet.icd)
  
  meet.save();
  
  console.log(date,code,id) 
  
    res.status(200).json({
      success: true,
      data: meet.icd,
    });
  };

const addInstruction = async (req, res) => {
  

  const date = req.body.date;
  const instruction = req.body.instruction;
  const id = req.body.meetingId;
  
  
  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.instructions)
  
  meet.instructions.push({
    instruction:instruction,
    date:date
  })
  
  console.log(meet.instructions)
  
  meet.save();
  
  console.log(date,instruction,id) 
  
    res.status(200).json({
      success: true,
      data: meet.instructions,
    });
  };

  

  const deleteInstructionById = async (req, res) => {
    
    const id = req.params.meetingId;
    const index = req.params.index;
    console.log(index);
  
    
  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.instructions)
  

  
if (index > -1) { 
  meet.instructions.splice(index, 1); 
}

 meet.save();

 console.log(meet.instructions)

    res.status(200).json({
      success: true,
      data:meet.instructions,
      message: "Talimat başarıyla silindi.",
    });
  };

  
  const deleteICDCodeById = async (req, res) => {
    
    const id = req.params.meetingId;
    const index = req.params.index;
    console.log(index);
  
    
  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.icd)
  

  
if (index > -1) { 
  meet.icd.splice(index, 1); 
}

 meet.save();

 console.log(meet.icd)

    res.status(200).json({
      success: true,
      data:meet.icd,
      message: "Kod başarıyla silindi.",
    });
  };


  const deleteTestById = async (req, res) => {
    
    const id = req.params.meetingId;
    const index = req.params.index;
    console.log(index);
  
    
  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.labTests)
  

  
if (index > -1) { 
  meet.labTests.splice(index, 1); 
}

 meet.save();

 console.log(meet.labTests)

    res.status(200).json({
      success: true,
      data:meet.labTests,
      message: "Testler başarıyla silindi.",
    });
  };

  
  const deleteOutcomeById = async (req, res) => {
    
    const id = req.params.meetingId;
    const index = req.params.index;
    console.log(index);
  
    
  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.outcomes)
  

  
if (index > -1) { 
  meet.outcomes.splice(index, 1); 
}

 meet.save();

 console.log(meet.outcomes)

    res.status(200).json({
      success: true,
      data:meet.outcomes,
      message: "Sonuç başarıyla silindi.",
    });
  };


  const deleteSuggestionById = async (req, res) => {
    
    const id = req.params.meetingId;
    const index = req.params.index;
    console.log(index);
  
    
  const meet = await Meeting.findOne({"_id":id})
  
  console.log(meet.suggestions)
  

  
if (index > -1) { 
  meet.suggestions.splice(index, 1); 
}

 meet.save();

 console.log(meet.suggestions)

    res.status(200).json({
      success: true,
      data:meet.suggestions,
      message: "Öneri başarıyla silindi.",
    });
  };
const getAppointmentByDoctorId = async (req, res) => {
  res.status(200).json({
    success: true,
    data: null,
  });
};

const deleteMeetingById = async (req, res) => {
  const meetingId = req.params.id;

  console.log(meetingId);

  await Meeting.deleteOne({ _id: meetingId });

  res.status(200).json({
    success: true,
    message: "Görüşme başarıyla silindi.",
  });
};

const cancelMeetingById = async (req, res) => {
  
  const {content, meetingId, cancelledAt, cancelledBy} = req.body
  
console.log(req.body)
    
    

    const meeting = await Meeting.findById(meetingId);

  meeting.isCancelled = content
  meeting.cancelledAt = cancelledAt
  meeting.cancelledBy = cancelledBy
  meeting.save()

  res.status(200).json({
    data:meeting.isCancelled,
    success: true,
    message: "Görüşme başarıyla iptal edildi.",
  });
};


const confirmMeetingById = async (req, res) => {
  
  const {confirmation, meetingId, confirmedAt, confirmedBy} = req.body
  
console.log(req.body)
    

    const meeting = await Meeting.findById(meetingId);

  meeting.isConfirmed = confirmation
  meeting.confirmedAt = confirmedAt
  meeting.confirmedBy = confirmedBy
  meeting.save()

  transporter.sendMail({
    to: meeting.patientId.email,
    from: "eekinci367@gmail.com",
    subject: `${meeting.doctorId.name} ${meeting.doctorId.surname} - ile Online görüşme onayı`,
    html: `<p>Görüşmeniz ${moment(meeting.startsAt).add(
      3,
      "hours"
    )} tarihinde ${meeting.doctorId.name} ${meeting.doctorId.surname} ile olan görüşmeniz onaylanmıştır. .</p>`,
  });

  transporter.sendMail({
    to: meeting.doctorId.email,
    from: "eekinci367@gmail.com",
    subject: `${meeting.patientId.name} ${meeting.patientId.name} -  ile Online görüşme bilgileri`,
    html: `<p>Görüşmeniz ${moment(meeting.startsAt).add(
      3,
      "hours"
    )} tarihinde siz görüşmeyi onayladıktan sonra başlayacaktır.</p>`,
  });

  res.status(200).json({
    data:meeting.isConfirmed,
    success: true,
    message: "Görüşme onaylandı.",
  });
};

const deleteRoomById = async (req, res) => {
  const roomId = req.params.id;

  console.log(roomId);

  await Room.deleteOne({ _id: roomId });

  res.status(200).json({
    success: true,
    message: "Oda başarıyla silindi.",
  });
};

const checkDoctorAvailable = async (req, res, next) => {
  const { doctorId, startsAt } = req.body;
  console.log(doctorId,startsAt);
  const doctorAvailable = await Meeting.find({
    doctorId: doctorId,
    startsAt: startsAt,
  });
  console.log("a", doctorAvailable);

  if (doctorAvailable.length) {
    return;
  } else {
    next();
  }
};

const setAppointment = async (req, res) => {
  

  const { doctorId, patientId, startsAt,patientMeetingNote } = req.body;

  const dId = mongoose.Types.ObjectId(doctorId);
  const pId = mongoose.Types.ObjectId(patientId);
  const doctor = await User.findById(dId);
  const roomName = doctor.meeetingRoom;
  const patient = await User.findById(patientId);
  
  const patientS = patientId;
  const doctorS = doctorId;

  const endsAt = moment(startsAt).add(30, "m").toDate();

  const visit = await Meeting.create({
    patientId,
    doctorId,
    startsAt,
    endsAt,
    roomName,
    patientS,
    doctorS,
    patientMeetingNote

  });

  console.log(typeof patientId, typeof pId);

  patient.meetings.push(visit);

  patient.save();

  doctor.meetings.push(visit);

  doctor.save();

  transporter.sendMail({
    to: patient.email,
    from: "eekinci367@gmail.com",
    subject: `${doctor.name} ${doctor.surname} - ile Online görüşme bilgileri`,
    html: `<p>Görüşmeniz ${moment(startsAt).add(
      3,
      "hours"
    )} tarihinde görüşmeniz onaylandıktan başlayacaktır. Görüşmeniz onayınız e-mail ile bildirilecektir.</p>`,
  });

  transporter.sendMail({
    to: doctor.email,
    from: "eekinci367@gmail.com",
    subject: `${patient.name} ${patient.surname} -  ile Online görüşme bilgileri`,
    html: `<p>Görüşmeniz ${moment(startsAt).add(
      3,
      "hours"
    )} tarihinde siz görüşmeyi onayladıktan sonra başlayacaktır.</p>`,
  });

  res.status(200).json({
    success: true,
    data: visit,
  });
};

const getMeetingsByDoctorId = async (req, res, next) => {
  try {
    let id = req.params.doctorId;
    console.log(req.params);

    meetings = await Meeting.find({ doctorId: id })
      //.select('startsAt patientMeetingNote')
      //.limit(5)
      .sort({ startsAt: -1 });
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({
    success: true,
    data: meetings,
  });
};



const getSingleMeetingById = async (req, res) => {
  const meetingId = mongoose.Types.ObjectId(req.params.id);

  console.log(req.params);

  const meeting = await Meeting.findById(meetingId);

  return res.status(200).json({
    success: true,
    data: meeting,
  });
};

const getMeetingsByUserId = async (req, res, next) => {
  try {
    let userIdForMeetings = req.params.userId;

    let id = mongoose.Types.ObjectId(userIdForMeetings);

    meetings = await Meeting.find({ patientId: id })
      .select("startsAt patientMeetingNote createdAt outcomes isCancelled cancelledBy cancelledAt isConfirmed ")
      .sort({ startsAt: -1 });
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({
    success: true,
    data: meetings,
  });
};

const getMeetingsForDoctorAndPatient = async (req, res, next) => {
  try {
    let patientId = req.params.patientId;

    let doctorId = req.params.doctorId;

    console.log(patientId);

    const meetings = await Meeting.find(
      {$and: [{ patientS: patientId }, { doctorS: doctorId }],}
      /* {patientId:patientId} */
      )
      .select("startsAt patientMeetingNote patientId doctorId createdAt suggestions icd labTests priorities")
      .sort({ startsAt: -1 });

      res.status(200).json({
        success: true,
        data: meetings,
      });
  } catch (e) {
    console.log(e);
  }

  
};


const setRoomToDoctor = async (req, res) => {
  const { doctorId } = req.body;

  console.log(req.body);

  const doctor = await User.findById(doctorId);

  console.log(doctor);
  const room = await Room.find({ available: true });

  let random = Math.floor(Math.random() * room.length);

  let randomRoom = room[random];

  console.log(randomRoom.available);

  doctor.meetingRoom = randomRoom.name;

  doctor.save();

  randomRoom.available = false;

  randomRoom.save();

  res.status(200).json({
    success: true,
    data: null,
  });
};

/* const API_KEY = process.env.daily_API_KEY;

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY,
};

const getRoom = (room) => {
    return fetch(`https://api.daily.co/v1/rooms/${room}`, {
      method: "GET",
      headers,
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((err) => console.error("error:" + err));
  };
  
  const createRoom = (room) => {
    return fetch("https://api.daily.co/v1/rooms", {
      method: "POST",
      headers,
      body: JSON.stringify({
        name: room,
        properties: {
          enable_screenshare: true,
          enable_chat: true,
          start_video_off: true,
          start_audio_off: false,
          lang: "en",
        },
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        return json;
      })
      .catch((err) => console.log("error:" + err));
  }; */

module.exports = {
  setAppointment,
  getAllAppointments,
  getAppointmentByDoctorId,
  addRoom,
  deleteMeetingById,
  deleteRoomById,
  checkDoctorAvailable,
  checkDoctorExists,
  getMeetingsByUserId,
  getMeetingsByDoctorId,
  getSingleMeetingById,
  setRoomToDoctor,
  getRooms,
  getMeetingsForDoctorAndPatient,
  addOutcome,
  addInstruction,
  deleteInstructionById,
  cancelMeetingById,
  addICDCode,
  deleteICDCodeById,
  deleteOutcomeById,
  confirmMeetingById,
  addSuggestion,
  deleteSuggestionById,
  addLabTests,
  deleteTestById
};
