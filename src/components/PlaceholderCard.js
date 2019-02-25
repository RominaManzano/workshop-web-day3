import React from 'react';
import styled, { keyframes } from 'styled-components';

const PlaceholderCard = (props) => {
  return (
    <StyledCard height={props.height} />
  );
}

PlaceholderCard.defaultProps = {
  height: '380px',
};

export default PlaceholderCard;

const loading = keyframes`
  from {
    background: rgb(250,250,250);
  }

  to {
    background: rgb(235,235,235);
  }
`;

const StyledCard = styled.div`
  width: 100%;
  height: ${({ height }) => height};
  margin-bottom: 30px;
  background: rgb(245,245,245);
  animation: ${loading} 0.5s linear infinite alternate;
`;
