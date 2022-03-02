import '../styles/globals.css'
require('antd/dist/antd.less');
import React, { useReducer } from "react";
import { CookiesProvider } from "react-cookie"
import type { Cookie } from 'universal-cookie'
import type { AppProps } from 'next/app'
import { isServer, getCookies } from 'util/utils'

export type InitValueType = {
  isLogin: boolean,
  token: string,
  isShowLoginModal: boolean,
  isShowRegisterModal: boolean,
  isShowLogoutModal: boolean
}
export type ActionType = {
  type: string, data: any
}

const initValue: InitValueType = {
  isLogin: false,
  token: '',
  isShowLoginModal: false,
  isShowRegisterModal: false,
  isShowLogoutModal: false
}
export type StoreContextType = {
  state: InitValueType,
  dispatch: (params: { type: string, data: any }) => void
}
export type PageWithCookieType = AppProps & Cookie
export const StoreContext = React.createContext<StoreContextType>({state: initValue, dispatch: () => {}});

function reducer(state: InitValueType, action: ActionType) {
  switch (action.type) {
    case 'TOGGLE_LOGIN': // 登录弹窗
      return {
        ...state,
        isShowLoginModal: action.data
      }
    case 'TOGGLE_REGISTER':
      return {
        ...state,
        isShowRegisterModal: action.data
      }
    case 'TOGGLE_LOGOUT':
      return {
        ...state,
        isShowLogoutModal: action.data
      }
    case 'TOGGLE_LOGINACOUNT': // 登录接口
        return {
          ...state,
          isLogin: action.data.isLogin,
          token: action.data.token
        }
        
    default:
      return initValue
  }
}

function MyApp({ Component, pageProps, cookies }: PageWithCookieType ) {
  let ck = cookies.cookies
  initValue.isLogin = Boolean(ck.isLoigin)
  initValue.token = ck.token || ''
  const [state, dispatch] = useReducer(reducer, initValue)
  return <StoreContext.Provider value={{state, dispatch}}>
    <CookiesProvider cookies={isServer ? cookies : undefined}><Component {...pageProps} /></CookiesProvider>
  </StoreContext.Provider>
}
MyApp.getInitialProps = async ({ ctx }) => {
  let req = ctx.req
  const cookies = getCookies(ctx);
  return {
    cookies
  }
}

export default MyApp
