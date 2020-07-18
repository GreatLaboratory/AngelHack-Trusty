import { Cart, Detail, Discovery } from '../templates';
import React, { ReactElement } from 'react';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';

import { TopNavBar } from '../components'
import { TopNavItemType } from '../types'
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

const Container = styled.div`
  width: 100%;
  padding: 20px 0px;
`;

function Page(props: RouteComponentProps) {
  const { location: { pathname } } = useReactRouter();
  const { path } = props.match;

  const topNavItems: TopNavItemType[] = [
    {
      value: "주문배송",
      path: `${path}`,
    },
  ];

  return (
    <Container>
      <TopNavBar topNavItems={topNavItems} />
    </Container>
  );
}

export default Page;