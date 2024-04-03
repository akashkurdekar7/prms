import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-hot-toast";
import axios from "axios";

const Practise = () => {
  const [regData, setRegData] = useState([]);
  const [infoData, setInfoData] = useState([]);

  useEffect(() => {
    const getAllPatient = async () => {
      try {
        const { data } = await axios.get(`http://localhost:8000/api/patient`);
        console.log("patient-data:", data.data);

        if (data?.data?.success) {
          setRegData(data?.data?.data);
          toast.success("Registration Data Received Successfully");
        }
      } catch (error) {
        console.log("Error fetching Registration Data:", error);
        toast.error("Something went wrong in getting registration data");
      }
    };
    getAllPatient();
  }, []); // Empty dependency array to run once after initial render

  useEffect(() => {
    const getAllPatientInfo = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:8000/api/patient/patient-info`
        );
        console.log("information data:", data);
        if (data?.success) {
          setInfoData(data?.data);
          toast.success("Patient Information Received Successfully");
        }
      } catch (error) {
        console.log("Error fetching Patient Information:", error);
        toast.error("Something went wrong in getting patient information");
      }
    };
    getAllPatientInfo();
  }, []);

  return (
    <Wrapper>
      <h1>afsdaf</h1>
      {regData.map((patient) => (
        <div key={patient.id} className="container">
          <h2>{patient.name}</h2>
        </div>
      ))}
    </Wrapper>
  );
};
const Wrapper = styled.div``;
export default Practise;
