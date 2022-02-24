import type { NextPage } from 'next'
import type { StoreContextType } from 'pages/_app'
import { StoreContext } from 'pages/_app'
import { useState, useContext } from 'react'
import { Modal, Form, Input, Button, Checkbox } from 'antd';

const Register: NextPage = ({ children }) => {
  const { state, dispatch } = useContext<StoreContextType>(StoreContext)
  const handleCancel = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: !state.isShowRegisterModal })
  };
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const toLogin = () => {
    dispatch({ type: 'TOGGLE_REGISTER', data: false })
    dispatch({ type: 'TOGGLE_LOGIN', data: true })
  }
  console.log(state.isShowRegisterModal)
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Modal title="注册账号" cancelText='取消' okText='确定注册' visible={state.isShowRegisterModal} onOk={handleCancel} onCancel={handleCancel}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
