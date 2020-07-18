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
      value: "식재료 구매하기",
      path: `${path}/product`,
    },
    {
      value: "장바구니",
      path: `${path}/cart`,
    }
  ];

  return (
    <Container>
      <TopNavBar topNavItems={topNavItems} />

      <Route exact path={`${path}`}>
        <Redirect to={`${path}/product`} />
      </Route>
      <Route exact path={`${path}/product`} component={Discovery} />
      <Route exact path={`${path}/cart`} component={Cart} />
      <Route path={`${path}/product/detail`} component={Detail} />
    </Container>
  );
}

export default Page;