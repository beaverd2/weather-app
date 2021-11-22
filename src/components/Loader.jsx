import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  background: rgb(0, 0, 0, 0.6);
  z-index: 99;
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -2.5rem;
  margin-top: -2.5rem;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid white;
  border-right: 2px solid white;
  border-bottom: 2px solid white;
  border-left: 4px solid transparent;
  background: transparent;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

const Loader = () => {
  return (
    <Wrapper>
      <Spinner></Spinner>
    </Wrapper>
  );
};

export default Loader;
