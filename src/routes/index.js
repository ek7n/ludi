const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Note = require("../models/note");
const File = require("../models/file");
const Doctor = require("../models/doctor");
const Patient = require("../models/patient");
const cors = require("cors");
const visitController = require("../controllers/visitControllers");
const fileController = require("../controllers/fileControllers");
const doctorController = require("../controllers/doctorController");
const userController = require("../controllers/userControllers");
const patientController = require("../controllers/patientController");
const readingController = require("../controllers/readingController");
const chronicController = require("../controllers/chronicController");
const paymentController = require("../controllers/paymentController");

const treatmentController = require("../controllers/treatmentController");
const bpController = require("../controllers/bpController");
const ObjectID = require("mongodb").ObjectID;
const { v4: uuidv4 } = require("uuid");
const passport = require("passport");

const { catchErrors } = require("../handlers/errorHandlers");

var corsOptions = {
  origin: 'https://www.ludi.care' /* 'http://localhost:8080' */,
  optionsSuccessStatus: 200,
  preflightContinue:true,
  credentials:true 
}

router.post("/add-room", catchErrors(visitController.addRoom));
router.delete("/room/:id", catchErrors(visitController.deleteRoomById));
router.delete("/delete-instruction/:index/:meetingId", catchErrors(visitController.deleteInstructionById));
router.delete("/delete-icd-code/:index/:meetingId", catchErrors(visitController.deleteICDCodeById));
router.delete("/delete-outcome/:index/:meetingId", catchErrors(visitController.deleteOutcomeById));
router.get("/book", catchErrors(visitController.getAllAppointments));
router.delete("/delete-suggestion/:index/:meetingId", catchErrors(visitController.deleteSuggestionById));
router.delete("/delete-test/:index/:meetingId", catchErrors(visitController.deleteTestById));
router.delete("/delete-text-about-doctor/:index/:doctorId", catchErrors(doctorController.deleteTextAboutDoctorByIndex));

router.put("/add-outcome", catchErrors(visitController.addOutcome));
router.put("/add-lab-tests", catchErrors(visitController.addLabTests));
router.put("/add-suggestion", catchErrors(visitController.addSuggestion));
router.put("/add-icd-code", catchErrors(visitController.addICDCode));
router.put("/add-instruction", catchErrors(visitController.addInstruction));
router.put("/add-text-about-doctor", catchErrors(doctorController.addTextAboutDoctor));

router.post(
  "/set-room-to-doctor",
  catchErrors(visitController.setRoomToDoctor)
);
router.post(
  "/book",
  catchErrors(visitController.checkDoctorAvailable),
  /* catchErrors(paymentController.payment), */
  catchErrors(visitController.setAppointment)
);


router.get("/doctor-patient-meetings/:patientId/:doctorId", catchErrors(visitController.getMeetingsForDoctorAndPatient));

router.get("/doctors", catchErrors(doctorController.getAllDoctors));

router.get("/doctor-info", catchErrors(doctorController.getBasicDoctorInfo));

router.get("/rooms", catchErrors(visitController.getRooms));

router.get(
  "/patients-by-doctor/:id",
  catchErrors(doctorController.getPatientsByDoctor)
);

router.post(
  "/upload-files",
  fileController.upload.single("photo"),
  catchErrors(fileController.uploadFile)
);
router.get("/get-files", catchErrors(fileController.getFiles));

router.post("/payment", catchErrors(paymentController.payment))

router.put(
  "/patient-base-info",
  catchErrors(patientController.addPatientBaseInfo)
);

router.post("/doctor", async (req, res) => {
  const { name, surname, role, email, password, age } = req.body;

  const doctor = await Doctor.create({
    name,
    surname,
    password,
    role,
    email,
    age,
  });

  res.json(doctor);
});

router.post("/patient-notes", async (req, res, next) => {
  console.log(req.body)
  const { content, patientId } = req.body;

  const note = await Note.create({
    patientId,
    content,
})
/* 
  let patient = await User.findById(patientId);
  //console.log("a", patient);
  
  patient.notes.push({ notes: note, userId: p });
  await patient.save(); */

  res.status(200).json({
    success: true,
    data: note,
    message: "Notunuz başarıyla eklendi.",
  });
});

/* router.post("/patient-chronics", async (req, res, next) => {
  const { chronic, userId } = req.body;

  

  let patient = await User.findById(userId);
  console.log("a", patient);
  
  patient.chronics.push({ chronics: chronic, userId: userId });
  await patient.save();

  res.status(200).json({
    success: true,
    data: chronic,
    message: "Kronik hastalık başarıyla eklendi.",
  });
}); */

router.post("/patient-chronics", catchErrors(chronicController.addChronic));
router.post("/father-chronics", catchErrors(chronicController.addFatherChronic));
router.post("/mother-chronics", catchErrors(chronicController.addMotherChronic));
router.post("/patient-comps", catchErrors(chronicController.addComp));
router.post("/add-drugs", catchErrors(treatmentController.addDrugInfo));
router.get("/patient-chronics/:id", catchErrors(chronicController.getChronics));
router.get("/mother-chronics/:id", catchErrors(chronicController.getMotherChronics));
router.get("/father-chronics/:id", catchErrors(chronicController.getFatherChronics));
router.get("/patient-comps/:id", catchErrors(chronicController.getComps));
router.get("/get-drugs/:id", catchErrors(treatmentController.getDrugs));
router.delete("/patient-chronics/:id", catchErrors(chronicController.deleteChronic));
router.delete("/mother-chronics/:id", catchErrors(chronicController.deleteMotherChronic));
router.delete("/father-chronics/:id", catchErrors(chronicController.deleteFatherChronic));
router.delete("/patient-comps/:id", catchErrors(chronicController.deleteComp));

router.get("/patient-general-notes/:id", catchErrors(patientController.getPatientNotes));
router.delete("/patient-general-notes/:id", catchErrors(patientController.deletePatientNoteById));

router.get("a/:id", async (req, res, next) => {
  const { userId } = req.params;

  let id = mongoose.Types.ObjectId(userId);

  let pc = await User.findById(id);

  console.log(pc);

  res.status(200).json({
    success: true,
    data: pc,
  });
});

/* router.get("/try/:id", catchErrors(userController.populateDoctorUsers)); */

router.post(
  "/register",
  cors(corsOptions),
  userController.validateRegister,
  userController.registerUser,
  /* catchErrors(visitController.setRoomToDoctor) */
);

router.post("/login", userController.loginUser);

router.get("/logout", userController.logoutUser);

router.get("/fake-login", catchErrors(userController.fakeLogin));

router.get("/login-success",cors(corsOptions) , async (req, res, next) => {
  
  try {
    /* console.log(req); */
  
    const id = req.user._id;
     console.log(/* Object.keys(req) ,*/"user",req.user.email)
    
   var loggedinUser = await User.findById(id);
  } catch (e) {
    console.log(e);
  }
  

  return res.status(200).json({
    loggedinUser
  });
});

router.get("/patient", async (req, res, next) => {
  //const n = req.body.n;

  const patients = await User.find({role:"PATIENT"})
    //.skip()
   //.limit(n)
    .sort({ createdAt: "desc" })
    //.select("name surname age createdAt");

  return res.status(200).json({
    patients,
  });
});

router.get("/login-fail", async (req, res, next) => {
try{
  console.log(req.user.email);
} catch (e){
  console.log(e)
}

  return res.status(304).json({
    message: "Email veya şifreniz hatalı.",
  });
});

router.post(
  "/doctor-appointment-days",
  catchErrors(doctorController.addAppointmentDays)
);

router.post(
  "/doctor-available",
  catchErrors(doctorController.setDoctorAvailable)
);

router.post(
  "/eye-visit",
  catchErrors(treatmentController.addEyeVisitDate)
);

router.post(
  "/add-father-chronic",
  catchErrors(chronicController.addFatherChronic)
);

router.post(
  "/kidney-visit",
  catchErrors(treatmentController.addKidneyVisitDate)
);

router.post(
  "/heart-visit",
  catchErrors(treatmentController.addHeartVisitDate)
);

router.post(
  "/brain-visit",
  catchErrors(treatmentController.addBrainVisitDate)
);

router.put(
  "/hypoglycemic-event",
  catchErrors(treatmentController.addHypoglycemicEventInfo)
);

router.put(
  "/ketoasidoz",
  catchErrors(treatmentController.addKetoasidozInfo)
);

router.put(
  "/tromboz",
  catchErrors(treatmentController.addTrombozInfo)
);

router.post(
  "/meeting-duration",
  catchErrors(doctorController.setMeetingDuration)
);

router.delete(
  "/reading-glycosis",
  catchErrors(readingController.deleteAllReadingsByUserId)
);
router.get(
  "/glycosis/:id",
  catchErrors(readingController.get24hourReadingsByUserId)
);

router.delete(
  "/reading-glycosis/:id",
  catchErrors(readingController.deleteReadingById)
);

router.delete("/bp-reading/:id", catchErrors(bpController.deleteBpById));

router.get(
  "/reading-glycosis/:id",
  catchErrors(readingController.getReadingsByUserId)
);

router.post(
  "/reading-glycosis",
  catchErrors(readingController.addGlycosisReading)
);

router.post(
  "/reading-glycosis/:id",
  catchErrors(readingController.getReadingsByUserId)
);

router.post(
  "/patient-weight",
  catchErrors(patientController.addPatientWeight)
);

router.post(
  "/patient-height",
  catchErrors(patientController.addPatientHeight)
);

router.post(
  "/patient-age",
  catchErrors(patientController.addPatientAge)
);

router.post(
  "/user/:id/photo-id",
  catchErrors(userController.addPhotoId)
);

router.post("/bp-reading", catchErrors(bpController.addBloodPressure));

router.get("/bp-reading/:id", catchErrors(bpController.getBPsByUserId));

router.delete("/bp-reading", catchErrors(bpController.deleteAllBPsByUserId));

router.post("/treatment-type", catchErrors(treatmentController.addTreatmentInfo));

router.get("/treatment-type/:id", catchErrors(treatmentController.getTreatmentInfo));

router.put("/treatment-type", catchErrors(treatmentController.updateTreatmentInfo))

router.post("/dose-info", catchErrors(treatmentController.addDoseInfo))
router.post("/insulin-regime-info", catchErrors(treatmentController.addInsulinRegimeInfo))
router.get("/dose-info/:id", catchErrors(treatmentController.getDoseInfo))
router.get("/insulin-regime-info/:id", catchErrors(treatmentController.getInsulinRegimeInfo))

router.get(
  "/meeting/:userId",
  catchErrors(visitController.getMeetingsByUserId)
);

router.delete("/meeting/:id", catchErrors(visitController.deleteMeetingById));

router.post(
  "/cancel-meeting",
  catchErrors(visitController.cancelMeetingById)
);

router.post(
  "/confirm-meeting",
  catchErrors(visitController.confirmMeetingById)
);

router.get(
  "/single-meeting/:id",
  catchErrors(visitController.getSingleMeetingById)
);

router.get(
  "/meetings/:doctorId",
  catchErrors(visitController.getMeetingsByDoctorId)
);

router.get(
  "/user/:id",
  catchErrors(async (req, res, next) => {
    const id = mongoose.Types.ObjectId(req.params.id.trim());
    console.log(id);

    const userId = `${id}`;

    

    const user = await User.findById(userId)
    .select('-glycosisReadings -meetings -notes -bpReadings');
    

    if (!user) {
      return next(new Error("User not found", 400));
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  })
);

router.patch("/deneme", async (req, res, next) => {
  const userName = req.body.name;
  const newName = req.body.newName;

  console.log(userName);
  console.log(newName);

  const user = await User.findOneAndUpdate(
    { name: userName },
    { name: newName },
    { new: true }
  )

  return res.status(200).json({
    success: true,
    data: user,
  });
});

router.delete("/user/:id", async (req, res, next) => {
  const id = ObjectID(req.params.id);
  console.log(id);
  await User.findByIdAndRemove(id);

  res.status(200).json({
    success: true,
    data: {},
  });
});

/* router.get("/video-call/:id", async function (req, res) {
  const roomId = req.params.id;

  const room = await getRoom(roomId);
  if (room.error) {
    const newRoom = await createRoom(roomId);
    res.status(200).send(newRoom);
  } else {
    res.status(200).send(room);
  }
}); */

module.exports = router;
