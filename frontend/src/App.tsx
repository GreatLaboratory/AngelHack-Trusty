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
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';

import CustomRoute from './route';
import styled from 'styled-components';

function App() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const getAuth = (): void => {
    setAuthenticated(false);
  }
  
  useEffect(() => {
    getAuth();
  }, []);
  
  return (
    <Router>
      <Switch>
        <CustomRoute exact authenticated={authenticated} path="/main" page={MainContainer} />
        <Route path="/auth" component={AuthContainer} />
        <CustomRoute authenticated={authenticated} path="/delivery" page={DeliveryContainer} />
        <CustomRoute authenticated={authenticated} path="/service" page={ServiceContainer} />
        <CustomRoute authenticated={authenticated} path="/mypage" page={MyPageContainer} />
        <CustomRoute authenticated={authenticated} path="/manager" page={ManagerContainer} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
