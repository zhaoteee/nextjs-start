import type { NextPage } from 'next'
import type { StoreContextType } from 'pages/_app'
import { StoreContext } from 'pages/_app'
import { useContext } from 'react'
import { Modal } from 'antd'
import { useCookies } from "react-cookie"
import { ExclamationCircleOutlined } from '@ant-design/icons';


const Logout: NextPage = ({ children }) => {
  const [cookies, setCookie] = useCookies<string, any>()
  const { state, dispatch } = useContext<StoreContextType>(StoreContext)
  const handleCancel = () => {
    dispatch({ type: 'TOGGLE_LOGOUT', data: !state.isShowLogoutModal })
  };
  const handleConfirm = async () => {
    setCookie("isLoigin", '', { path: "/", sameSite: true })
    setCookie("token", '', { path: "/", sameSite: true })
    // 保存登录数据
    dispatch({ type: 'TOGGLE_LOGINACOUNT', data: { isLogin: false, token: '' } })
    // 关闭弹窗
    dispatch({ type: 'TOGGLE_LOGOUT', data: !state.isShowLogoutModal })
  }
  return (
    <Modal
      title="退出登录"
      cancelText='取消'
      okText='确定'
      visible={state.isShowLogoutModal}
      onOk={handleConfirm}
      onCancel={handleCancel}
    >
      <p>确定退出登录吗？</p>
    </Modal>
  )
}


export default Logout
