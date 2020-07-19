import React, {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from 'react';

import { User } from '../types';

type UserState = {
  user: User;
}

const UserStateContext = createContext<UserState | undefined | null>(undefined);

// 액션타입
type Action = 
  | { type: 'SET'; user: User }
  | { type: 'RESET' }

type UserDispatch = Dispatch<Action>; // => 추후 컴포넌트에서 액션을 디스패치 할 때 액션들에 대한 티입을 검사할 수 있다.
const UserDispatchContext = createContext<UserDispatch | undefined >(undefined);

function userReducer(state: UserState, action: Action): UserState {
  switch (action.type) {
    case 'SET':
      return {
        ...state,
        user: action.user,
      }
    case 'RESET':
      return {
        ...state,
        user: {
          _id: "12",
          userType: 6,
          userId: 'id',
          profileImage: 'data.profileImage',
          userName: 'data.name',
          phoneNum: 'data.phoneNum',
          storeName: 'data.storeName',
          address: 'data.address',
          orderIdList: [],
          cartIdList: [],
          reviewIdList: [],
        }
      }
    default:
      throw new Error('Unhandled action');
  }
}

// Provider 만들기
export function UserContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(userReducer, {
    user: {
      _id: "12",
      userType: 1,
      userId: 'id',
      profileImage: 'data.profileImage',
      userName: 'data.name',
      phoneNum: 'data.phoneNum',
      storeName: 'data.storeName',
      address: 'data.address',
      orderIdList: [],
      cartIdList: [],
      reviewIdList: [],
    }
  });
  
  return (
    <UserDispatchContext.Provider value={dispatch}>
      <UserStateContext.Provider value={state}>
        {children}
      </UserStateContext.Provider>
    </UserDispatchContext.Provider>
  );
}

export function useUserState() {
  const state = useContext(UserStateContext);  
  // if (!state) throw new Error('UserProvider not found');
  return state;
}

export function useUserDispatch() {
  const dispatch = useContext(UserDispatchContext);
  // if (!dispatch) throw new Error('UserProvider not found');
  return dispatch;
}