import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  border-color: #ffffff;

  border-radius: 5px;
  color: black;
  padding: 0.6em 2.3em;
  cursor: pointer;
  font-size: 1em;
  background-image: linear-gradient(45deg, transparent 50%, #000000 50%);
  background-position: 25%;
  background-size: 400%;
  transition: background 500ms ease-in-out, color 500ms ease-in-out;

  &:hover {
    color: #ffffff;
    background-position: 100%;
  }
`;

const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

export default Button;
