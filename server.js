import express from "express";
import colors from "colors";
import cors from "cors";
import { config } from "dotenv";
import patientRoute from "./routes/patientRoute.js";
import query from "./config/db.js";

config(".env");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/patient", patientRoute);

app.use((err, req, res, next) => {
  console.log(colors.red("Error: " + err.message));
  res.status(err.status || 500).send({
    success: false,
    message: err.message || "Something Went Wrong",
  });
});

const PORT = process.env.PORT || 8001;

query("SELECT 1")
  .then((data) => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`.bgRed.bold.black);
    });
    console.log(`DB Connection Successfull`.bgRed.bold.black);
    console.log(data);
  })
  .catch((err) => console.error("db connection failed:", err));

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the PRMS 🥳</h1>`);
});
