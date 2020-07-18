import React, { ReactElement, useEffect, useState } from 'react';

import { Link } from 'react-router-dom'
import { TopNavItemType } from '../types'
import { User } from '../types'
import styled from 'styled-components';
import useReactRouter from 'use-react-router';

const Container = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 2px solid #cccccc;
  flex-direction: row;
  justify-content: space-between;
`;

const NavItem = styled.div`
  width: 250px;

  .selected {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    font-weight: bold;
    color: #333333;
    border-bottom: 4px solid #00a457;
  }

  .unselected {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #333333;
  }
`;

const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: #cccccc;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 20px;

  div {
    .store {
      font-size: 19px;
      font-weight: 500;
      color: #999999;
    }

    .name {
      font-size: 24px;
      font-weight: bold;
      color: #333333;
    }
  }

  img {
    width: 64px;
    height: 64px;
    border-radius: 30px;
  }
`;

interface Props {
  topNavItems: TopNavItemType[]
}

function Shared(props: Props) {
  const { topNavItems } = props;
  const { location: { pathname } } = useReactRouter();

  const [user, setUser] = useState<User>();

  const getUser = (): void => {
    const stringUser = window.localStorage.getItem("user");

    if(stringUser) {
      const tmp = JSON.parse(stringUser);
      console.log(tmp);
      setUser({
        userType: tmp.userType,
        userId: tmp.id,
        profileImage: tmp.profileImage,
        userName: tmp.userName,
        phoneNum: tmp.phoneNum,
        storeName: tmp.storeName,
        address: tmp.address,
        orderIdList: tmp.orderIdList,
        cartIdList: tmp.cartIdList,
        reviewIdList: tmp.reviewIdList,
      });
    }
  }

  useEffect(() => {
    getUser();
  }, []);
  
  const topNavItem = (navItem: TopNavItemType, index: number): ReactElement => {
    if(pathname.includes(navItem.path)) {
      return ( 
        <NavItem key={`item__${index}`}>
          <div className="selected">{navItem.value}</div>
        </NavItem>
      );
    }

    return (
      <NavItem key={`item__${index}`}>
      <Link to={navItem.path} style={{ width: '100%', height: '100%', textDecoration: 'none' }}>
          <div className="unselected">{navItem.value}</div>
        </Link>
      </NavItem>
    );
  }
  
  return (
    <Container>
      <>
      {topNavItems.map((item, index) => topNavItem(item, index))}
      </>
      <Row>
        <div>
          <div className="store">{user?.storeName}</div>
          <div className="name">{user?.userName}</div>
        </div>
        <img src={user?.profileImage} alt="" />
      </Row>
    </Container>
  );
}

export default Shared;