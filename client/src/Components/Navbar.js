import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { toast } from "react-hot-toast";
import Button from "../Styles/Button";

const Navbar = () => {
  const [isRegOpen, setIsRegOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    age: "",
    gender: "",
    address: "",
    medical_report: "",
  });

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
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, dob, age, gender, address, medical_report } = formData;
      switch (true) {
        case !name:
          toast.error("Please enter the Name of the Patient");
          return;
        case !dob:
          toast.error("Please enter the Date of birth of the Patient");
          return;
        case !age:
          toast.error("Please enter Age of the Patient");
          return;
        case !gender:
          toast.error("Please enter Gender of the Patient");
          return;
        case !address:
          toast.error("Please enter Address of the Patient");
          return;
        case !medical_report:
          toast.error("Please enter Medical Reports of the Patient");
          return;
        default:
          break;
      }
      const res = await axios.post(
        `${process.env.BASE_URL}/api/patient/register`,
        {
          name,
          dob,
          age,
          gender,
          address,
          medical_report,
        }
      );
      console.log("Data :", res);
      if (res && res?.data?.success === true) {
        toast.success("patient saved successfully");
        setFormData({
          name: "",
          dob: "",
          age: "",
          gender: "",
          address: "",
          medical_report: "",
        });
      } else {
        toast.error(res?.data?.message || "Failed to register patient");
      }
    } catch (error) {
      console.log("Error:", error);
      console.log("Response data:", error.response?.data);
    }
  };

  const handleInfoSubmit = () => {};

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
                      placeholder="name of the patient..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="dob">Date of Birth:</label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="age">Age:</label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      inputMode="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Age of the patient..."
                    />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="gender">Gender:</label>
                    <input
                      type="text"
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      placeholder="gender"
                    />
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
                    <label htmlFor="medical_report">Medical Report:</label>
                    <textarea
                      id="medical_report"
                      name="medical_report"
                      value={formData.medical_report}
                      onChange={handleInputChange}
                      placeholder="Medical Reports of the patient if any..."
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
                  <FormGroup>
                    <label htmlFor="name">Patient Name:</label>
                    <input type="text" id="name" name="name" required />
                  </FormGroup>
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
