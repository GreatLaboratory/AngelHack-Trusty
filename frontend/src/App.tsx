import {
  AuthContainer,
  DeliveryContainer,
  MainContainer,
  ManagerContainer,
  MyPageContainer,
  NotFound,
  ServiceContainer,
} from './containers';
import React, { useEffect, useState } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { SidebarItemType, User, UserType } from './types'

import CustomRoute from './route';
import { SideNavBar } from './components'
import { UserContextProvider } from './contexts/UserContext';
import styled from 'styled-components';
import { useUserState } from './contexts/UserContext';

const Container = styled.div`
  width: 100vw;
`;

const UserRoute = styled.div`
  display: flex;
  flex-direction: row;
`;

const SellerRoute = styled.div`
  display: flex;
  flex-direction: row;
`;

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(true);

  const state = useUserState();

  const sidebarItems: SidebarItemType[] = [
    {
      value: '식재료 구매',
      path: '/main',
    },
    {
      value: '주문배송',
      path: '/delivery',
    },
    {
      value: '마이페이지',
      path: '/mypage',
    }
  ];

  const managerSidebarItems: SidebarItemType[] = [
    {
      value: '판매글 등록하기',
      path: '/manager',
    },
    {
      value: '마이페이지',
      path: '/mypage',
    },
  ];

  const [user, setUser] = useState<User>();

  const getUser = (): void => {
    const stringUser = window.localStorage.getItem("user");

    if(stringUser) {
      const tmp = JSON.parse(stringUser);
      setUser({
        _id: tmp._id,
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
  
  return (
    <Container>
      <UserContextProvider>
        <Router>
          <Switch>
            <Route path="/auth" component={AuthContainer} />
            <UserRoute>
              <SideNavBar userType={UserType.USER} sidebarItems={user?.userType === UserType.USER ? sidebarItems : managerSidebarItems} />
              <>
                <CustomRoute authenticated={authenticated} path="/main" page={MainContainer} />
                <CustomRoute authenticated={authenticated} path="/delivery" page={DeliveryContainer} />
                <CustomRoute authenticated={authenticated} path="/mypage" page={MyPageContainer} />
                <CustomRoute authenticated={authenticated} path="/manager" page={ManagerContainer} />
              </>
            </UserRoute>
            <Route component={NotFound} />
          </Switch>
        </Router>
      </UserContextProvider>
    </Container>
  );
}

export default App;
