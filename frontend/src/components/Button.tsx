import React, { CSSProperties, ReactElement } from 'react';

import styled from 'styled-components';

const FilledContainer = styled.button`
  outline: none;
  background-color: ${props => props.color || "#00a457"};
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 15px 0px;
  color: white;
  font-size: 24px;
  font-weight: bold;
`;

const Container = styled.button`
  outline: none;
  background-color: transparent;
  border: 1px solid ${props => props.color || "#00a457"};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.color || "#00a457"};
  font-size: 24px;
  font-weight: bold;
  padding: 15px 0px;
`;

interface Props {
  value: string;
  click?: () => void;
  containerStyle?: CSSProperties;
  isFilled?: boolean;
  color?: string;
}

function Shared(props: Props) {
  const { 
    value, 
    click, 
    containerStyle, 
    isFilled = true,
    color = "#00a457"
  } = props;

  if(isFilled) {
    return (
      <FilledContainer 
      style={containerStyle}
      color={color}
      onClick={click}
    >
    {value}
    </FilledContainer>
    );
  }

  return (
    <Container 
      style={containerStyle}
      color={color}
      onClick={click}
    >
    {value}
    </Container>
  );
}

export default Shared;