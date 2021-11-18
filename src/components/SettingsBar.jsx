import React from 'react';
import styled from 'styled-components';

const StyledSettingsBar = styled.div`
  position: absolute;
  z-index: 19;
  width: 100%;
  max-width: 480px;
  height: 100vh;
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
  transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FindMeButton = styled.button`
  max-width: 280px;
  padding: 10px 15px;
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 16px;
`;

const StyledSearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  & input {
    width: 100%;
    max-width: 280px;
    padding: 10px 15px;
    outline: none;
    background-color: rgba(255, 255, 255, 0.5);
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 16px;
    color: #3b3b3b;
    font-size: 20px;
    transition: all 0.3s ease-out;
    &:focus {
      background-color: rgba(255, 255, 255, 0.7);
      border-color: rgba(255, 255, 255, 0.8);
    }
  }
`;

const SettingsBar = ({
  open,
  handleInput,
  handleSubmit,
  handleOpen,
  bgcolor,
  inputLocation,
  findMeHandler,
}) => {
  return (
    <StyledSettingsBar open={open} bgcolor={bgcolor}>
      <StyledSearchBox>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            handleOpen();
          }}
        >
          <input
            bgcolor={bgcolor}
            type='text'
            value={inputLocation}
            onChange={(e) => {
              handleInput(e);
            }}
            autoComplete='off'
            placeholder='Search for a city...'
          />
        </form>
      </StyledSearchBox>
      <FindMeButton
        onClick={() => {
          findMeHandler();
          handleOpen();
        }}
      >
        Find me
      </FindMeButton>
    </StyledSettingsBar>
  );
};

export default SettingsBar;
