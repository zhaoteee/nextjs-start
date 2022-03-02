import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import styles from 'styles/Home.module.less'
import { Card } from 'antd';
import CategoryItem from './categoryItem'

export type FenleiType = {id: number, name: string}[]
export type BaseResType = {
  code: number, msg: string, classification: FenleiType, color: FenleiType, tag: FenleiType
}
type pageType = {classification: FenleiType, color: FenleiType, tag: FenleiType}

const Category: NextPage<pageType> = ({ classification, color, tag}) => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if(classification.length && color.length && tag.length) {
      setLoading(false)
    }
  }, [classification, color, tag])
  return (
    <Card className={`${styles.cate} myCategoryCard`} loading={loading}>
      <CategoryItem name='分类' list={classification} />
      <CategoryItem name='颜色' list={color} />
      <CategoryItem name='Tag' list={tag} />
    </Card>
  )
}
export default Category
