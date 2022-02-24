import type { NextPage } from 'next'
// import type { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from 'components/layout'
import styles from 'styles/Detail.module.less'
import { Card, Descriptions, Button } from 'antd';

export type infoType = { distributorName: string }

const Home: NextPage = (v) => {
  return (
    <Layout>
        <div>
          <Card className={styles.info}>
            <Descriptions title="精品大钱上午萨达撒给妻儿去二七分团委" bordered>
              <Descriptions.Item labelStyle={{width: '200px'}} span={18} label="文件大小">22M</Descriptions.Item>
              <Descriptions.Item span={18} label="页面数">22</Descriptions.Item>
              <Descriptions.Item span={18} label="下载类型">免费</Descriptions.Item>
              <Descriptions.Item span={18} label="模板标签">精品 标签 大气 商务</Descriptions.Item>
              <Descriptions.Item span={18} label="描述">
                Data disk type: MongoDBDatabase version: 3.4
                Package: dds.mongo.mid
                Storage space: 10 GB
                <br />
                Replication factor: 3
                <br />
                Region: East China 1<br />
              </Descriptions.Item>
              <Descriptions.Item span={18} label="免责声明">本站不以盈利为目的，所有资源均来自互联网，如有侵权请联系站长删除</Descriptions.Item>
            </Descriptions>
            <div className={styles.btns}>
              <Button type="primary">在线预览</Button>
              <Button type="primary">免费下载</Button>
              <Button type="primary">服务器</Button>
            </div>
          </Card>
          <Card className={styles.preview}>
            <h4>效果预览</h4>
            <div>
              阿斯达大所大
            </div>
          </Card>
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
