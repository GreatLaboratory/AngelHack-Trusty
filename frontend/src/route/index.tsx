import { AuthenticatedType, RoutePageType } from '../types'
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";

import React from "react"
import { useUserState } from '../contexts/UserContext';

interface Props {
  page: RoutePageType; // 실제 렌더링할 컴포넌트
  authenticated: boolean;
}

function CustomRoute(props: (Props & RouteProps)) {
  const { authenticated, page } = props;
  // const state = useUserState();

  const user = window.localStorage.getItem('user');

  console.log('local', user);
  
  const Page = page;

  return (
    <Route 
      {...props}
      render={props => {
        if(user) {
          return <Page {...props} />
        } else {
          return (
            <Redirect 
            to={{
              pathname: "/auth/signIn",
              state: { from: props.location }
            }}
          />
          );
        }
      }}
    />
  );
}

export default CustomRoute