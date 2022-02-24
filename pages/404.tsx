import type { NextPage } from 'next'
// import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from 'components/layout'
import { useState } from 'react'
import { Empty } from 'antd';

export type infoType = { distributorName: string }

const Home: NextPage = (v) => {
  return (
    <Layout>
        <Empty description='未找到当前页面' style={{marginTop: '200px'}} />
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
