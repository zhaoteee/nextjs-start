import type { NextPage } from 'next'
import Link from 'next/link'
// import type { GetStaticProps } from 'next'
import styles from 'styles/Layout.module.less'
import Image from 'next/image'
import { useContext, useState, useEffect } from 'react'
import { Layout, Menu } from 'antd';
import Login from './login'
import Register from './register'
import Logout from './logout'
import { StoreContext } from 'pages/_app'
import { getAxios } from 'util/axios'
import { useCookies } from "react-cookie"

const { Header, Content, Footer } = Layout;

export type ResType = {
  code: number, msg: string, user: UserInfoType
}

export type UserInfoType = { username: string, createTime: string, userId: number }

const LayoutComp: NextPage = ({ children, ...other }) => {
  const [cookies, setCookie] = useCookies<string, any>()
  const [info, setInfo] = useState<UserInfoType>({ username: '', createTime: '', userId: 0 })
  
  const navList = [{ name: '首页', link: '/' },{ name: '响应式', link: '/as' },{ name: '整站', link: '/asee' },{ name: '后台', link: '/dd' }]
  const { state, dispatch } = useContext(StoreContext)
  const loginClick = () => {
    if (state.isLogin) {
      dispatch({ type: 'TOGGLE_LOGOUT', data: !state.isShowLogoutModal })
    } else {
      dispatch({ type: 'TOGGLE_LOGIN', data: !state.isShowLoginModal })
    }
  }
  const registerClick = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: !state.isShowRegisterModal })
  }
  useEffect(() => {
    getAxios('/api/userInfo', {}, {
      headers: { token: `${ state.token }`},
    }).then((r) => {
      let res = r as ResType
      if (res.code == 10000) {
        setCookie("isLoigin", '', { path: "/", sameSite: true })
        setCookie("token", '', { path: "/", sameSite: true })
      }
      if (res.code === 0 && res.msg === 'success') {
        setInfo(res.user)
      }
    })
  }, [state.token, setCookie])
  
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>
          <Image
            src="https://cdn.jsdelivr.net/gh/npsvip/static@1.0.4/images/slider/head-logo.jpg"
            alt='logo' width={50} height={50}
          />
        </div>
        <Menu theme="dark" mode="horizontal" selectedKeys={[]} className={styles.myMenu} defaultSelectedKeys={['1']}>
          {navList.map((item, index) => {
            const key = index + 1;
            return item.link ? <Menu.Item key={key}><Link href={item.link}>{item.name}</Link></Menu.Item> : <Menu.Item key={key}>{item.name}</Menu.Item>;
          })}
          <Menu.Item onClick={loginClick} className={styles.fr}>{state.isLogin ? info.username : '登录'}</Menu.Item>
          { state.isLogin ? null : <Menu.Item onClick={registerClick} className={styles.fr}>注册</Menu.Item>}
        </Menu>
      </Header>
      <Content className={styles.pageLayoutContent}>
        <div className={styles.pageContent}>
          {children}
        </div>
      </Content>
      <Login></Login>
      <Register></Register>
      <Logout></Logout>
      <Footer style={{ textAlign: 'center' }}>模板免费下载免费试用免费使用</Footer>
    </Layout>
  )
}


export default LayoutComp
