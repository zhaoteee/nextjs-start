import type { NextPage } from 'next'

import styles from 'styles/Layout.module.less'
import Image from 'next/image'

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;


const LayoutComp: NextPage = ({ children }) => {
  const navList = [{ name: '首页', link: '' },{ name: '响应式', link: '' },{ name: '整站', link: '' },{ name: '后台', link: '' }]
  return (
    <Layout>
      <Header>
        <div className={styles.logo}>
          <Image
            src="https://cdn.jsdelivr.net/gh/npsvip/static@1.0.4/images/slider/head-logo.jpg"
            alt='logo' width={50} height={50}
          />
        </div>
        <Menu theme="dark" mode="horizontal" className={styles.myMenu} defaultSelectedKeys={['2']}>
          {navList.map((item, index) => {
            const key = index + 1;
            return <Menu.Item key={key}>{item.name}</Menu.Item>;
          })}
          <Menu.Item className={styles.fr}>登录</Menu.Item>
          <Menu.Item className={styles.fr}>注册</Menu.Item>
        </Menu>
      </Header>
      <Content className={styles.pageContent} style={{ padding: '0 50px' }}>
        {children}
      </Content>
      <Footer style={{ textAlign: 'center' }}>模板免费下载免费试用免费使用</Footer>
    </Layout>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await postAxios('/index/distributorInfo')
//   return {
//     props: {info: res},
//   }
// }

export default LayoutComp