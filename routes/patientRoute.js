import express from "express";
import slugify from "slugify";
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

// to check if a patient already exists
// router.get("/check", checkPatientController);

// adding information to the registered patient
router.post(
  "/patient-info/:name",
  PatientExistance,
  getPatientSlugName,
  patientInfoController
);

// get all patient info data
router.get("/patient-info", getAllPatientInfoController);

// get single patient info data
router.get(
  "/patient-info/:name",
  PatientExistance,
  getPatientSlugName,
  getSinglePatientInfoController
);

export default router;
