import React, { useState } from 'react';
import styled from 'styled-components';
import SettingsBar from './SettingsBar';

const StyledBurger = styled.div`
  position: absolute;
  top: 2.2rem;
  left: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  justify-content: space-around;
  display: flex;
  flex-direction: column;
  z-index: 20;
  div {
    width: 1.5rem;
    height: 0.15rem;
    background-color: #fff;
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) =>
        open ? 'translateX(-100%)' : 'translateX(0)'};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`;

const Burger = ({
  handleInput,
  handleSubmit,
  bgcolor,
  inputLocation,
  findMeHandler,
  currentWindowInnerHeight,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(!open);
    document.body.style.overflow = `${open ? 'auto' : 'hidden'}`;
  };
  return (
    <>
      <StyledBurger open={open} onClick={handleOpen}>
        <div></div>
        <div></div>
        <div></div>
      </StyledBurger>
      <SettingsBar
        open={open}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
        handleOpen={handleOpen}
        bgcolor={bgcolor}
        inputLocation={inputLocation}
        findMeHandler={findMeHandler}
        currentWindowInnerHeight={currentWindowInnerHeight}
      />
    </>
  );
};

export default Burger;
