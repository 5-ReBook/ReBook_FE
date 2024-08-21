import React from 'react';

import { Box, Image } from '@chakra-ui/react';

import './HeaderButton.css';

const HeaderButton = ({ buttonImage, buttonAction }) => {
  const buttonClick = () => {
    buttonAction();
  };

  console.log('Button IMAGE ', buttonImage);

  return (
    <button className="header-button" onClick={buttonClick}>
      <Image boxSize={'1.5rem'} src={buttonImage} alt="header-button" />
    </button>
  );
};

export default HeaderButton;
