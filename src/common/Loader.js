import React from 'react';
import styled from 'styled-components';
import { Spinner } from 'reactstrap';

const Loader = () => {
  return (
    <LoaderContainer>
      <Spinner type="grow" color="info" />
    </LoaderContainer>
  );
}

export default Loader;

const LoaderContainer = styled.div`
  width: 100vw;
  height: calc(100vh - 73px);
  display: flex;
  justify-content: center;
  align-items: center;
`;
