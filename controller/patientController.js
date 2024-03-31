import query from "../config/db.js";

export const getAllPatientController = async (req, res) => {
  try {
    const [data, dataCount] = await Promise.all([
      query("SELECT * FROM patient"),
      query("SELECT COUNT(*) AS userCount FROM patient"),
    ]);
    if (!data) {
      res.status(404).send({
        message: "Not Found: no User Registered",
        success: false,
      });
    } else {
      res.status(200).send({
        message: "got all the user",
        success: true,
        data,
        dataCount,
      });
    }
  } catch (error) {
    console.log("error: " + error);
  }
};

export const registerController = async (req, res) => {
  try {
    const { name, dob, age, address, medical_report } = req.body;
    const data = await query(
      "INSERT INTO patient (name, dob, age,gender address, medical_report) VALUES (?, ?,?, ?, ?,?)",
      [name, dob, age, gender, address, medical_report]
    );
    res.status(200).send({
      success: true,
      message: "New user created successfully",
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

export const patientInfoController = async (req, res) => {
  try {
    const { name } = req.params;
    const {
      date,
      doctor,
      record_category,
      record_type,
      record_file,
      description,
    } = req.body;

    const data = await query(
      "INSERT INTO prms.patientInfo (name, date, doctor, record_category, record_type, record_file, description) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        date,
        doctor,
        record_category,
        record_type,
        record_file,
        description,
      ]
    );

    res.status(200).send({
      success: true,
      message: "New patient record created successfully",
      data,
    });
  } catch (error) {
    console.log("Error in patient info controller:", error);
    res.status(500).send({
      success: false,
      message: "Error in patient info controller",
      error: error,
    });
  }
};

export const getAllPatientInfoController = async (req, res) => {
  try {
    const [info, dataCount] = await Promise.all([
      query("SELECT * FROM patientinfo"),
      query("SELECT COUNT(*) AS userCount FROM patientinfo"),
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
