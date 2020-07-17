import React, { ReactElement } from 'react';
import { Route, RouteComponentProps } from 'react-router-dom'
import { SignIn, SignUp } from '../templates'

import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

function Page(props: RouteComponentProps) {
  const { match } = props;

  return (
    <Container>
      <Route exact path={match.path} component={SignIn} />
      <Route exact path={`${match.path}/signIn`} component={SignIn} />
      <Route exact path={`${match.path}/signUp`} component={SignUp} />
    </Container>
  );
}

export default Page;