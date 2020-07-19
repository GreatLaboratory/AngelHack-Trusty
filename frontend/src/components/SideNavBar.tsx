import React, { ReactElement } from 'react';
import { SidebarItemType, UserType } from '../types'

import { Link } from 'react-router-dom'
import logoWhite from '../assets/images/logoWhite.png'
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

const Container = styled.div`
  height: 200vh;
  background-color: #00a457;
  padding: 40px;
`;

const Logo = styled.div`
  width: 151px;
  height: 111px;
  padding-bottom: 40px;
  border-bottom: 1px solid white;

  img {
    width: 100%;
    height: 100%;
  }
`;

const MenuWrapper = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;

  .selected {
    font-size: 20px;
    font-weight: 900;
    color: #ffffff;
  }

  .unselected {
    font-size: 20px;
    color: #ffffff;
    opacity: 0.5;
  }
`;

interface Props {
  userType: UserType;
  sidebarItems: SidebarItemType[];
}

function SideNavBar(props: Props) {
  const { location: { pathname } } = useReactRouter();
  const { userType, sidebarItems } = props;

  const menuItem = (item: SidebarItemType, index: number): ReactElement => {
    const tmp: string[] = pathname.split('/');

    if(item.path === `/${tmp[1]}`) {
      return (
        <MenuItem key={`item__${index}`}>
          <div className="selected">{item.value}</div>
        </MenuItem>
      );
    }

    return (
      <MenuItem key={`item__${index}`}>
        <Link to={item.path} style={{ textDecoration: 'none'}}>
          <div className="unselected">{item.value}</div>
        </Link>
      </MenuItem>
    );
  }

  switch(userType) {
    case UserType.USER:
    default:
      return (
        <Container>
          <Logo>
            <Link to="/main" style={{ width: '100%', height: '100%' }}>
            <img src={logoWhite} alt="" />
            </Link>
          </Logo>
          <MenuWrapper>
            {sidebarItems.map((item, index) => menuItem(item, index))}
          </MenuWrapper>
      </Container>
      );
    case UserType.SELLER:
      return (
        <Container style={{ backgroundColor: '#0032a4' }}>
          <Logo>
            <Link to="/main" style={{ width: '100%', height: '100%' }}>
            <img src={logoWhite} alt="" />
            </Link>
          </Logo>
          <MenuWrapper>
            {sidebarItems.map((item, index) => menuItem(item, index))}
          </MenuWrapper>
        </Container>
      );
  }
}

export default SideNavBar;