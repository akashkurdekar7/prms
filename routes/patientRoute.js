import express from "express";
import slugify from "slugify";
import {
  getPatientSlugName,
  PatientExistance,
} from "./../middlerware/middlewares.js";
import {
  getAllPatientController,
  getAllPatientInfoController,
  patientInfoController,
  registerController,
} from "./../controller/patientController.js";

const router = express.Router();

// get all patient data
router.get("/", getAllPatientController);

// register for new patient
router.post("/register", registerController);

// adding information to the registered patient
router.post(
  "/patient-info/:name",
  PatientExistance,
  getPatientSlugName,
  patientInfoController
);

// get all patient info data
router.get("/patient-info", getAllPatientInfoController);

export default router;
