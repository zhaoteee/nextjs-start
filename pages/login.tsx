import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { postAxios } from '../util/axios'

const Home: NextPage = ({ info }) => {
  console.log(info)
  return (
    <div className={styles.container}>
      <Head>
        <title>登录</title>
        <meta name="description" content="模板下载 登录" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to { info.distributorName }
        </h1>
      </main>

      <footer className={styles.footer}>
         欢迎你哦登录
      </footer>
    </div>
  )
}
Home.getInitialProps = async () => {
  const res = await postAxios('/index/distributorInfo')
  console.log(res)
  return {
    info: res,
  }
}

export default Home
