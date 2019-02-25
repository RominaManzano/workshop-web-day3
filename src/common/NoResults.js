import React from 'react';
import styled from 'styled-components';

const noResults = (props) => {
  const message = props.message

  return (
    <NoResults>
      {message}
    </NoResults>
  );
}

export default noResults;

const NoResults = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  font-size: 40px;
`;
