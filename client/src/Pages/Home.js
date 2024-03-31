import React from "react";
import styled from "styled-components";
import HeroSection from "../Components/HeroSection.js";
import { Toaster } from "react-hot-toast";
import Navbar from "../Components/Navbar.js";

const Home = ({children}) => {
  return (
    <Wrapper>
      <div className="mt-4 d-flex justify-content-center">
        <Toaster />
        {children}
      </div>
      <Navbar />
      <HeroSection />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
`;
export default Home;
