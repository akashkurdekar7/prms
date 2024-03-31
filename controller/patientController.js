import query from "../config/db.js";
import slugify from "slugify";

// Controller function to register a new patient
export const registerController = async (req, res) => {
  try {
    const {
      name,
      date_of_birth,
      age,
      contact,
      gender,
      address,
      next_appointment,
      medical_history,
    } = req.body;

    // Generate slugified name
    const slugName = slugify(name, {
      replacement: "_",
      lower: true,
    });

    // Insert patient details into the database
    const data = await query(
      "INSERT INTO prms.patient_record (name, date_of_birth, age, contact, gender, address, next_appointment, medical_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        slugName,
        date_of_birth,
        age,
        contact,
        gender,
        address,
        next_appointment,
        medical_history,
      ]
    );

    // Send success response
    res.status(200).send({
      success: true,
      message: "New Patient created successfully",
      data,
    });
  } catch (error) {
    console.log("error: " + error);
    res.status(500).send({
      success: false,
      message: "Error in register patient controller",
      error: error,
    });
  }
};

export const getAllPatientController = async (req, res) => {
  try {
    const [data, dataCount] = await Promise.all([
      query("SELECT * FROM prms.patient_record"),
      query("SELECT COUNT(*) AS userCount FROM prms.patient_record"),
    ]);
    if (!data) {
      res.status(404).send({
        message: "Not Found: No patient Registered",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "Got all the Patient records",
        success: true,
        data,
        dataCount,
      });
    }
  } catch (error) {
    console.log("error: " + error);
  }
};

export const patientInfoController = async (req, res) => {
  try {
    const { name } = req.params;

    // Retrieve P_id based on the provided name
    const [patient] = await query(
      "SELECT P_id FROM prms.patient_record WHERE Name = ?",
      [name]
    );
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const { P_id } = patient;
    const {
      date,
      doctor,
      record_category,
      record_type,
      record_file,
      description,
    } = req.body;

    const data = await query(
      "INSERT INTO prms.patient_information (P_id, Name, D_id, Date, Record_Category, Record_Type, Record_File, Description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        P_id,
        name,
        doctor,
        date,
        record_category,
        record_type,
        record_file,
        description,
      ]
    );

    res.status(200).send({
      success: true,
      message: "New patient information created successfully",
      data,
    });
  } catch (error) {
    console.log("Error in patient information controller:", error);
    res.status(500).send({
      success: false,
      message: "Error in patient information controller",
      error: error,
    });
  }
};

export const getAllPatientInfoController = async (req, res) => {
  try {
    const [info, dataCount] = await Promise.all([
      query("SELECT * FROM prms.patient_information"),
      query("SELECT COUNT(*) AS userCount FROM prms.patient_information"),
    ]);
    if (!info) {
      res.status(404).send({
        message: "Not Found: No Patient Info Found",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "got all the Patient Information",
        success: true,
        info,
        dataCount,
      });
    }
  } catch (error) {
    console.log("error: " + error);
  }
};
