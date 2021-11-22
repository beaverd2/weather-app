import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';

const ErrorWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  height: -moz-available;
  height: -webkit-fill-available;
  height: fill-available;
  background: rgb(0, 0, 0, 0.6);
  z-index: 99;
`;

const ErrorContainer = styled.div`
  position: fixed;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-height: 10rem;
  min-width: 15rem;
  color: white;
  box-shadow: 0px 5px 10px 2px rgba(34, 60, 80, 0.2);
  padding: 0.5rem;
  background-color: ${(props) => {
    if (props.bgcolor === 'night') {
      return '#51435f';
    }
    if (props.bgcolor === 'day') {
      return '#d39559';
    }
    if (props.bgcolor === 'evening') {
      return '#31253b';
    }
  }};
  display: flex;
  flex-direction: column;
`;

const CloseIcon = styled.div`
  z-index: 101;
  align-self: flex-end;
  cursor: pointer;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  align-items: center;
  justify-content: center;
  margin-top: -2rem;
`;

const ErrorText = styled.p`
  font-size: 1.5rem;
  text-align: center;
`;

const Error = ({ error, bgcolor, closeError }) => {
  return (
    <ErrorWrapper>
      <ErrorContainer bgcolor={bgcolor}>
        <CloseIcon onClick={closeError}>
          <AiOutlineClose color='white' fontSize='1.5rem' />
        </CloseIcon>
        <TextContainer>
          <ErrorText>{error}</ErrorText>
        </TextContainer>
      </ErrorContainer>
    </ErrorWrapper>
  );
};

export default Error;
