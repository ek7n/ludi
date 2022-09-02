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

const checkDoctorAvailable = async (req, res, next) => {
  const { doctorId, startsAt } = req.body;
  console.log(doctorId);
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
  //get lastsFor data from frontend

  const { doctorId, patientId, startsAt,patientMeetingNote } = req.body;

  const dId = mongoose.Types.ObjectId(doctorId);
  const pId = mongoose.Types.ObjectId(patientId);
  const doctor = await User.findById(dId);
  const roomName = doctor.meeetingRoom;
  const patient = await User.findById(patientId);
  
  const patientS = patientId;
  const doctorS = doctorId;

  const endsAt = moment(startsAt).add(30, "m").toDate();

  //console.log(doctorId,patientId,startsAt, endsAt)

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
    )} tarihinde başlayacaktır.</p>`,
  });

  transporter.sendMail({
    to: doctor.email,
    from: "eekinci367@gmail.com",
    subject: `${patient.name} ${patient.surname} -  ile Online görüşme bilgileri`,
    html: `<p>Görüşmeniz ${moment(startsAt).add(
      3,
      "hours"
    )} tarihinde başlayacaktır.</p>`,
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
      .select("startsAt patientMeetingNote createdAt")
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
      .select("startsAt patientMeetingNote patientId doctorId createdAt")
      .sort({ startsAt: -1 });

      res.status(200).json({
        success: true,
        data: meetings,
      });
  } catch (e) {
    console.log(e);
  }

  
};

const editAppointment = async (req, res) => {
  // Only applicable before meeting starts

  res.status(200).json({
    success: true,
    data: null,
  });
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
  checkDoctorAvailable,
  checkDoctorExists,
  getMeetingsByUserId,
  getMeetingsByDoctorId,
  getSingleMeetingById,
  setRoomToDoctor,
  getRooms,
  getMeetingsForDoctorAndPatient,
};
