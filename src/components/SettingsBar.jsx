import React from 'react';
import styled from 'styled-components';
import { MdLocationSearching } from 'react-icons/md';

const StyledSettingsBar = styled.div`
  position: absolute;
  z-index: 19;
  width: 100%;
  max-width: 480px;
  height: 100vh;
  height: ${(props) => props.currentWindowInnerHeight}px;
  padding-left: 1rem;
  padding-right: 1rem;
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

const StyledSearchBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1.5rem;
  & input {
    margin-right: 1rem;
    margin-left: 2rem;
    height: 3rem;
    width: 85%;
    max-width: 20rem;
    padding: 10px 15px;
    outline: none;
    border: none;
    border-radius: 16px;
    color: #3b3b3b;
    font-size: 20px;
    transition: all 0.3s ease-out;
    &:focus {
      /* border: 2px solid;
      border-color: ${(props) => {
        if (props.bgcolor === 'night') {
          return 'rgb(52, 43, 61)';
        }
        if (props.bgcolor === 'day') {
          return 'rgb(184, 131, 78)';
        }
        if (props.bgcolor === 'evening') {
          return 'rgb(35, 26, 43)';
        }
      }}; */
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
  currentWindowInnerHeight,
}) => {
  return (
    <StyledSettingsBar
      currentWindowInnerHeight={currentWindowInnerHeight}
      open={open}
      bgcolor={bgcolor}
    >
      <StyledSearchBox bgcolor={bgcolor}>
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
        <MdLocationSearching
          fontSize='2rem'
          onClick={() => {
            findMeHandler();
            handleOpen();
          }}
        />
      </StyledSearchBox>
    </StyledSettingsBar>
  );
};

export default SettingsBar;
