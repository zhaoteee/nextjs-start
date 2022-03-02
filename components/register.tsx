import type { NextPage } from 'next'
import type { StoreContextType } from 'pages/_app'
import { StoreContext } from 'pages/_app'
import { useContext } from 'react'
import { postAxios } from 'util/axios'
import { useCookies } from "react-cookie"
import { Modal, Form, Input, Button, Checkbox } from 'antd'

const Register: NextPage = ({ children }) => {
  const [form] = Form.useForm();
  const { state, dispatch } = useContext<StoreContextType>(StoreContext)
  const [cookies, setCookie] = useCookies<string, any>()
  const handleCancel = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: !state.isShowRegisterModal })
  };
  const toLogin = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: false })
    dispatch({ type: 'TOGGLE_LOGIN', data: true })
  }
  const handleConfirm = async () => {
    const values = await form.validateFields()
    postAxios('/api/register', values).then((res: any) => {
      if (res.msg === 'success') {
        setCookie("isLoigin", 'true', { path: "/", maxAge: res.expire, sameSite: true })
        setCookie("token", res.token, { path: "/", maxAge: res.expire, sameSite: true })
        // 保存登录数据
        dispatch({ type: 'TOGGLE_LOGINACOUNT', data: { isLogin: true, token: res.token } })
        // 关闭弹窗
        dispatch({ type: 'TOGGLE_REGISTER', data: !state.isShowRegisterModal })
      } else {
        Modal.error({
            title: '请求出错',
            okText: '确定',
            content: res.msg,
        });
      }
    })
  }
  return (
    <Modal title="注册账号" cancelText='取消' okText='确定注册' visible={state.isShowRegisterModal} onOk={handleConfirm} onCancel={handleCancel}>
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item> */}
          <p style={{paddingLeft: '30px'}}>已有账号？<span style={{color: '#f74a49', cursor: 'pointer'}} onClick={toLogin}>去登录</span></p>
        </Form>
    </Modal>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await postAxios('/index/distributorInfo')
//   return {
//     props: {info: res},
//   }
// }

export default Register
