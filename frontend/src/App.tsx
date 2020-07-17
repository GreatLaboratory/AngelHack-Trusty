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
import { SidebarItemType, UserType } from './types'

import CustomRoute from './route';
import { SideNavBar } from './components'
import styled from 'styled-components';

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

  const getAuth = (): void => {
    setAuthenticated(true);
  }
  
  useEffect(() => {
    getAuth();
  }, []);

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
      value: '고객센터',
      path: '/service',
    },
    {
      value: '마이페이지',
      path: '/mypage',
    }
  ];
  
  return (
    <Container>
      <Router>
        <Switch>
          <Route path="/auth" component={AuthContainer} />
          <UserRoute>
            <SideNavBar userType={UserType.USER} sidebarItems={sidebarItems} />
            <>
              <CustomRoute exact authenticated={authenticated} path="/main" page={MainContainer} />
              <CustomRoute authenticated={authenticated} path="/delivery" page={DeliveryContainer} />
              <CustomRoute authenticated={authenticated} path="/service" page={ServiceContainer} />
              <CustomRoute authenticated={authenticated} path="/mypage" page={MyPageContainer} />
              {/* <CustomRoute authenticated={authenticated} path="/manager" page={ManagerContainer} /> */}
              <Redirect from="/" to="/main" />
            </>
          </UserRoute>

          {/* <SellerRoute>
            <SideNavBar userType={UserType.USER} sidebarItems={sidebarItems} />
            <>
              <CustomRoute exact authenticated={authenticated} path="/manager" page={MainContainer} />
              <CustomRoute authenticated={authenticated} path="/delivery" page={DeliveryContainer} />
              <CustomRoute authenticated={authenticated} path="/service" page={ServiceContainer} />
              <CustomRoute authenticated={authenticated} path="/mypage" page={MyPageContainer} />
              <CustomRoute authenticated={authenticated} path="/manager" page={ManagerContainer} />
              <Redirect from="/" to="/main" />
            </>
          </SellerRoute> */}
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
