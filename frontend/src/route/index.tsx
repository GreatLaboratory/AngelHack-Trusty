import { AuthenticatedType, RoutePageType } from '../types'
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router-dom";

import React from "react"

interface Props {
  page: RoutePageType; // 실제 렌더링할 컴포넌트
  authenticated: boolean;
}

function CustomRoute(props: (Props & RouteProps)) {
  const { authenticated, page } = props;
  
  const Page = page;

  return (
    <Route 
      {...props}
      render={props => {
        if(authenticated) {
          return <Page {...props} />
        } else {
          return (
            <Redirect 
            to={{
              pathname: "/auth/logIn",
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