import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../Styles/Button";

const Navbar = () => {
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date_of_birth: "",
    age: "",
    gender: "",
    contact: "",
    address: "",
    next_appointment: "",
    medical_history: "",
  });

  const [patientNames, setPatientNames] = useState();

  useEffect(() => {
    const getAllPatient = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/patient`);
        const { data } = res;

        if (data?.success) {
          const names = data.data.map((patient) => patient.name);
          setPatientNames(names);
        }
      } catch (error) {
        console.error("Error fetching patient names:", error);
        toast.error("Error fetching patient names");
      }
    };
    getAllPatient();
  }, []);

  const openRegModal = () => {
    setIsRegOpen(true);
    setIsInfoOpen(false);
  };

  const openInfoModal = () => {
    setIsInfoOpen(true);
    setIsRegOpen(false);
  };

  const closeRegModal = () => {
    setIsRegOpen(false);
  };

  const closeInfoModal = () => {
    setIsInfoOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date_of_birth") {
      // Calculate age based on date of birth
      const dob = new Date(value);
      const today = new Date();
      const ageDiff = today.getFullYear() - dob.getFullYear();
      const isBirthdayPassed =
        today.getMonth() < dob.getMonth() ||
        (today.getMonth() === dob.getMonth() &&
          today.getDate() < dob.getDate());
      const age = isBirthdayPassed ? ageDiff : ageDiff - 1;

      setFormData({
        ...formData,
        [name]: value,
        age: age.toString(), // Convert age to string for input field compatibility
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      } = formData;

      if (
        !name ||
        !date_of_birth ||
        !age ||
        !contact ||
        !gender ||
        !address ||
        !next_appointment ||
        !medical_history
      ) {
        toast.error("Please fill in all fields");
        return;
      }
      if (parseInt(age) < 10) {
        toast.error("Patient must be at least 10 years old to register");
        return;
      }
      const res = await axios.post(
        `http://localhost:8000/api/patient/register`,
        {
          name,
          date_of_birth,
          age,
          contact,
          gender,
          address,
          next_appointment,
          medical_history,
        }
      );
      // console.log("Data :", res);
      if (res && res?.data?.success === true) {
        toast.success("Patient saved successfully");
        setFormData({
          name: "",
          date_of_birth: "",
          age: "",
          gender: "",
          contact: "",
          address: "",
          next_appointment: "",
          medical_history: "",
        });
      } else {
        if (
          res &&
          res.status === 400 &&
          res.data.message === "Patient already exists"
        ) {
          toast.error("Patient already exists");
        } else {
          toast.error(res?.data?.message || "Failed to register patient");
        }
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("Response data:", error.response?.data);
    }
  };

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const {
        patient_name,
        date,
        doctor,
        record_category,
        record_type,
        record_file,
        description,
      } = formData;

      if (
        !patient_name ||
        !date ||
        !doctor ||
        !record_category ||
        !record_type ||
        !record_file ||
        !description
      ) {
        toast.error("Please fill in all fields");
        return;
      }

      const res = await axios.post(
        `http://localhost:8000/api/patient/${patient_name}`,
        {
          patient_name,
          date,
          doctor,
          record_category,
          record_type,
          record_file,
          description,
        }
      );
      console.log("info Data :", res);
      if (res && res.data.success === true) {
        toast.success("Patient Information Added Successfully");
        setFormData({
          ...formData,
          date: "",
          doctor: "",
          record_category: "",
          record_type: "",
          record_file: "",
          description: "",
        });
      } else {
        toast.error(res?.data?.message || "Failed to add patient information");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message || "Failed to add patient information"
      );
    }
  };

  const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  return (
    <Wrapper>
      <h2>Patient Records</h2>
      <div className="buttons">
        <div className="register">
          <button className="register-btn btn" onClick={openRegModal}>
            Register Patient
          </button>
          {isRegOpen && (
            <>
              <BGC />
              <Modal>
                <h2>Register Patient</h2>
                <form
                  method="post"
                  onSubmit={handleSubmit}
                  className="register-form"
                >
                  <FormGroup>
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name of the patient..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="date_of_birth">Date of Birth:</label>
                    <input
                      type="date"
                      id="date_of_birth"
                      name="date_of_birth"
                      value={formData.date_of_birth}
                      onChange={handleInputChange}
                      max={today}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="age">Age:</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      readOnly
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="contact">Contact:</label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      maxLength={10}
                      placeholder="Phone Number"
                      title="Please enter a 10-digit phone number"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="gender">Gender:</label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                    >
                      <option value="" disabled>
                        Select gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </FormGroup>

                  <FormGroup>
                    <label htmlFor="address">Address:</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Address of the patient..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="next_appointment">Next Appointment:</label>
                    <input
                      type="date"
                      id="next_appointment"
                      name="next_appointment"
                      value={formData.next_appointment}
                      onChange={handleInputChange}
                      min={today}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="medical_history">Medical History:</label>
                    <textarea
                      id="medical_history"
                      name="medical_history"
                      value={formData.medical_history}
                      onChange={handleInputChange}
                      placeholder="Medical History of the patient if any..."
                    ></textarea>
                  </FormGroup>
                  <div className="button-wrapper">
                    <Button onClick={closeRegModal}>Close Modal</Button>
                    <Button type="submit">Register</Button>
                  </div>
                </form>
              </Modal>
            </>
          )}
        </div>
        <div className="info">
          <button className="info-btn btn" onClick={openInfoModal}>
            Add Patient Info
          </button>
          {isInfoOpen && (
            <>
              <BGC />
              <Modal>
                <h2>Add Patient Info</h2>
                <form
                  method="post"
                  onSubmit={handleInfoSubmit}
                  className="information-form"
                >
                  {patientNames !== null && (
                    <FormGroup>
                      <label htmlFor="patient_name">Patient Name:</label>
                      <select
                        id="patient_name"
                        name="patient_name"
                        value={formData.name}
                        onChange={handleInputChange}
                      >
                        <option value="" disabled>
                          Select patient name
                        </option>
                        {patientNames.map((name) => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </FormGroup>
                  )}
                  <FormGroup>
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" required />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="doctor">Doctor:</label>
                    <input type="text" id="doctor" name="doctor" required />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="record_category">Record Category:</label>
                    <input
                      type="text"
                      id="record_category"
                      name="record_category"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="record_type">Record Type:</label>
                    <input
                      type="text"
                      id="record_type"
                      name="record_type"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="record_file">Record File:</label>
                    <input
                      type="text"
                      id="record_file"
                      name="record_file"
                      required
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="description">Description:</label>
                    <textarea id="description" name="description"></textarea>
                  </FormGroup>
                  <div className="button-wrapper">
                    <Button onClick={closeInfoModal}>Close Modal</Button>
                    <Button type="submit">Add Info</Button>
                  </div>
                </form>
              </Modal>
            </>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  width: 100%;
  height: 7rem;
  background-color: #d9d9d9d9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 3rem;
  h2 {
    margin-left: 5rem;
  }
  .buttons {
    margin-right: 5rem;
  }
  .buttons {
    display: flex;
    gap: 2.5rem;
  }
  .register-btn {
    border-color: blue;
    color: black;
  }

  .info-btn {
    background-color: blue;
    color: white;
  }
  .btn {
    width: max-content;
    padding: 1rem;
    border-radius: 5px;
  }
  .button-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
    button {
      margin: 0 2rem;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  input,
  textarea {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
  }
  textarea {
    height: 100px;
  }
  select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
    appearance: none; /* Remove default arrow icon */
    background-color: #fff; /* Add background color */
    background-image: url('data:image/svg+xml;utf8,<svg fill="%23444" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" width="20px" height="20px"><path fill-rule="evenodd" clip-rule="evenodd" d="M15.885 6.115a.5.5 0 01.707.707l-7.071 7.071a.5.5 0 01-.707 0l-7.071-7.071a.5.5 0 01.707-.707L10 12.293l5.178-5.178z"/></svg>'); /* Add custom arrow icon */
    background-repeat: no-repeat;
    background-position: right 0.5rem center;
  }
`;

const BGC = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 100;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

export default Navbar;
