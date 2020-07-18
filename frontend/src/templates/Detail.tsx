import React, { ReactElement } from 'react';

import { RouteComponentProps } from 'react-router-dom'
import queryString from 'query-string';
import styled from 'styled-components';

const Container = styled.div``;

function Detail(props: RouteComponentProps) {
  const query = queryString.parse(props.location.search);
  console.log(query.id);

  return (
  <Container>{query.id}</Container>
  );
}

export default Detail;