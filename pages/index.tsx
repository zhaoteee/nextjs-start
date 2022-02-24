import type { NextPage } from 'next'
// import type { GetStaticProps } from 'next'

import Head from 'next/head'
import Layout from 'components/layout'

import styles from 'styles/Home.module.less'
import { Card } from 'antd';


export type infoType = { distributorName: string }

const Home: NextPage<{ info: infoType }> = ({ info }) => {
  console.log(info)
  return (
    <Layout>
        <div>
          <Card className={styles.cate}>
            <div className={styles.row}>
              <div className={styles.name}>分类:</div>
              <div className={styles.ks}>
                <span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span>
                <span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span>
                <span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span>
                <span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span>
                <span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span>
                <span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span><span>精品</span><span>企业</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.name}>颜色:</div>
              <div className={styles.ks}><span>白色</span><span>蓝色</span><span>白色</span><span>蓝色</span><span>白色</span><span>蓝色</span><span>白色</span><span>蓝色</span></div>
            </div>
          </Card>
          <div className={styles['site-layout-content']}>Content</div>
        </div>
    </Layout>
  )
}

// export const getStaticProps: GetStaticProps = async (context) => {
//   const res = await postAxios('/index/distributorInfo')
//   return {
//     props: {info: res},
//   }
// }

export default Home
