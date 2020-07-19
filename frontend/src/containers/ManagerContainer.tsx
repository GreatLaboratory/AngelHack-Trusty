import React, { ReactElement } from 'react';

import { ManagerMain } from '../templates';
import { RouteComponentProps } from 'react-router-dom';
import { TopNavBar } from '../components'
import { TopNavItemType } from '../types'
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  padding: 20px 0px;
`;

function Page(props: RouteComponentProps) {
  const { path } = props.match;
  const topNavItems: TopNavItemType[] = [
    {
      value: "판매글 등록하기",
      path: `${path}`,
    },
  ];

  return (
    <Container>
      <TopNavBar topNavItems={topNavItems} />
      <ManagerMain />
    </Container>
  );
}

export default Page;