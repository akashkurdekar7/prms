import query from "../config/db.js";

const PatientExistance = async (req, res, next) => {
  try {
    const { name } = req.params;
    const [patient] = await query("SELECT * FROM patient WHERE name = ?", [
      name,
    ]);

    if (patient) {
      req.patient = patient;
      next();
    } else {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }
  } catch (error) {
    console.error("Error checking patient existence:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error || Middlware error",
      error: error.message,
    });
  }
};

export default PatientExistance;
