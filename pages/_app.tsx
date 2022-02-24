import '../styles/globals.css'
require('antd/dist/antd.less');
import React, { useContext, useReducer } from "react";
import type { AppProps } from 'next/app'
export type InitValueType = {
  isLogin: boolean,
  isShowLoginModal: boolean,
  isShowRegisterModal: boolean,
}
export type ActionType = {
  type: string, data: any
}

const initValue: InitValueType = {
  isLogin: false,
  isShowLoginModal: false,
  isShowRegisterModal: false
}
export type StoreContextType = {
  state: InitValueType,
  dispatch: (params: { type: string, data: any }) => void
}
export const StoreContext = React.createContext<StoreContextType>({state: initValue, dispatch: () => {}});

function reducer(state: InitValueType, action: ActionType) {
  console.log(action)
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      return {
        ...state,
        isShowLoginModal: action.data
      }
    case 'TOGGLE_REGISTER':
      return {
        ...state,
        isShowRegisterModal: action.data
      }
    default:
      return initValue
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  const [state, dispatch] = useReducer(reducer, initValue)
  return <StoreContext.Provider value={{state, dispatch}}>
    <Component {...pageProps} />
  </StoreContext.Provider>
}

export default MyApp
