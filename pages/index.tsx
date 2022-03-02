import type { NextPage } from 'next'
// import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Layout from 'components/layout'
import { useState, useEffect } from 'react'
import { getAxios, postAxios } from 'util/axios'
import styles from 'styles/Home.module.less'
import { Input } from 'antd';
import { getCookies } from 'util/utils'
import Category from '@/components/category'
import PageLoading from '@/components/pageLoading'
const { Search } = Input;

export type infoType = { distributorName: string }
export type FenleiType = {id: number, name: string}[]
export type BaseResType = {
  code: number, msg: string, classification: FenleiType, color: FenleiType, tag: FenleiType
}
export type TmplItemType = { id: number, img: string, name: string }
export type PageResType = {
  code: number, msg: string, data: { current: number, size: number, total: number, records: TmplItemType[] }
}

const Home: NextPage = (v) => {
  const [loading, setLoading] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [list, setList] = useState<TmplItemType[]>([])
  const [classification, setClassification] = useState<FenleiType>([])
  const [color, setColor] = useState<FenleiType>([])
  const [tag, setTag] = useState<FenleiType>([])
  useEffect(() => {
    async function init() {
      setPageLoading(true)
      await getAxios('/api/static/base', {}).then((r) => {
        let res = r as BaseResType
        if (res.code === 0 && res.msg === 'success') {
          setClassification(res.classification)
          setColor(res.color)
          setTag(res.tag)
        }
      })
      await postAxios('/api/static/page', { current: 1, size: 20 }).then((r) => {
        let res = r as PageResType
        if (res.code === 0 && res.msg === 'success') {
          let data = res.data
          console.log(data)
          setList(data.records)
        }
      })
      setPageLoading(false)
    }
    init()
  }, [])
  return (
    <Layout>
        <div>
          <div className={styles.searchArea}>
            <Search placeholder="搜索词: 支付 模板 商城 帝国cms" enterButton="搜索" size="large" loading={loading} />
          </div>
          <Category classification={classification} color={color} tag={tag} />
          <div className={styles['site-layout-content']}>
            {
              list.map(item => {
                return <div className={styles.item} key={item.id}>
                  <Image width={200} height={400} src={item.img} alt={item.name} />
                  <p><Link href={`/detail?id=${item.id}`}>{item.name}</Link></p>
                </div>
              })
            }
          </div>
        </div>
        <PageLoading loading={pageLoading}></PageLoading>
    </Layout>
  )
}

export async function getServerSideProps({ req })  {
  const cookies = getCookies(req);
  console.log(cookies)
  const res = await getAxios('/api/userInfo').catch((e) => { console.log(e) })
  return { props: { info: {} } }
}
export default Home
