import express from "express";
import {
  getPatientSlugName,
  PatientExistance,
} from "./../middlerware/middlewares.js";
import {
  getAllPatientController,
  getAllPatientInfoController,
  getSinglePatientInfoController,
  patientInfoController,
  registerController,
} from "./../controller/patientController.js";

const router = express.Router();

// get all patient data
router.get("/", getAllPatientController);

// register for new patient
router.post("/register", registerController);

// adding information to the registered patient
router.post("/:slugName", PatientExistance, patientInfoController);

// get all patient info data
router.get("/patient-info", getAllPatientInfoController);

// get single patient info data
router.get("/:name", PatientExistance, getSinglePatientInfoController);

export default router;
