import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import axios from "axios";

const HeroSection = () => {
  const [data, setData] = useState([]);
  const [infoData, setInfoData] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedPatientInfo, setSelectedPatientInfo] = useState(null);

  const handleSearch = (searchTerm) => {
    const tableRows = document.querySelectorAll(".table_container tbody tr");
    tableRows.forEach((row) => {
      const name = row
        .querySelector("td:nth-child(3)")
        .textContent.toLowerCase();
      if (name.includes(searchTerm.toLowerCase())) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  };

  const getAllPatient = async () => {
    try {
      const { new_patient } = await axios.get(
        `http://localhost:8000/api/patient`
      );
      console.log("patient-data:", new_patient.data);

      if (new_patient.data?.success) {
        setData(new_patient.data?.data);
        toast.success("Registration Data Received Successfully");
      }
      // console.log("Set Data: ", patient_data);
    } catch (error) {
      console.log("Error fetching Registration Data:", error);
      toast.error("Something went wrong in getting registration data");
    }
  };

  const getAllPatientInfo = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/patient/patient-info`
      );
      // console.log("information data:", patient_info.data);
      if (data?.success) {
        setInfoData(data?.data);
        toast.success("Patient Information Received Successfully");
      }
    } catch (error) {
      console.log("Error fetching Patient Information:", error);
      toast.error("Something went wrong in getting patient information");
    }
  };

  useEffect(() => {
    getAllPatient();
  }, []);
  useEffect(() => {
    getAllPatientInfo();
  }, []);

  const handleSelectPatient = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue === "all") {
      setSelectedPatient(null);
    } else {
      const selectedPatient = JSON.parse(selectedValue);
      setSelectedPatient(selectedPatient);
      const patientInfo = infoData.find(
        (info) => info.patient_id === selectedPatient.id
      );
      setSelectedPatientInfo(patientInfo);
    }
  };

  return (
    <Wrapper>
      <div className="container">
        {selectedPatient && (
          <div key={selectedPatient.id} className="information">
            <h2>{selectedPatient.name}</h2>
            <div className="squares">
              <p>{selectedPatient.gender}</p>
              <p>{selectedPatient.age}</p>
            </div>
            {selectedPatientInfo && (
              <h4>
                Next appointment scheduled on: {selectedPatientInfo?.date}
              </h4>
            )}
          </div>
        )}
        <div className="select">
          <h3>Select a patient</h3>
          {data && (
            <select onChange={handleSelectPatient}>
              <option disabled>Select a patient</option>
              <option value="all">Show All Patients</option>
              {data.map((p) => (
                <option key={p.id} value={JSON.stringify(p)}>
                  {p.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
      <div className="table_container">
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {selectedPatient === null
              ? data.map((patient) => (
                  <tr key={patient.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{patient.id}</td>
                    <td>{patient.name}</td>
                    {selectedPatientInfo && (
                      <td>{selectedPatientInfo.description}</td>
                    )}
                  </tr>
                ))
              : selectedPatient && (
                  <tr key={selectedPatient.id}>
                    <td>
                      <input type="checkbox" />
                    </td>
                    <td>{selectedPatient.id}</td>
                    <td>{selectedPatient.name}</td>
                    {selectedPatientInfo && (
                      <td>{selectedPatientInfo.description}</td>
                    )}
                  </tr>
                )}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #f8f8f8;
  margin: 0 5rem;
  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2rem 0;
  }
  .information {
    flex: 2.5;

    display: flex;
    row-gap: 1.2rem;
    flex-direction: column;
  }
  .squares {
    display: flex;
    gap: 20px;
    width: max-content;
  }
  .squares p {
    background-color: white;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }

  h4 {
    color: #666;
    margin-bottom: 10px;
  }
  .select {
    flex: 1;
    gap: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  select {
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ddd;
    font-size: 16px;
  }

  /* Table Styles */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  th,
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  th {
    background-color: #f2f2f2;
    font-weight: bold;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
  input[type="checkbox"] {
    margin-right: 5px;
  }
  .search {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 2rem;
  }
  input {
    border: none !important;
    text-transform: lowercase !important;
  }
`;

export default HeroSection;
