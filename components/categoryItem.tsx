import type { NextPage } from 'next'
import { useState, useRef, useEffect } from 'react'
import { isServer } from 'util/utils'
import styles from 'styles/Home.module.less'

export type FenleiType = {id: number, name: string}[]

type pageType = {list: FenleiType, name: string}

const CategoryItem: NextPage<pageType> = ({ list, name }) => {
  const [isMore, setIsMore] = useState(false)
  const [showCmore, setShowCmore] = useState(false)
  const [isRowOne, setisRowOne] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const setHeigh = () => {
    if (wrapRef && contentRef && !isServer) {
      let wh = parseFloat(getComputedStyle(wrapRef.current).height)
      let ch = parseFloat(getComputedStyle(contentRef.current).height)
      console.log(wh, ch)
      if (ch > wh) {
        setIsMore(true)
      }
      if (ch <= 76 && ch ) { // 一行的情况
        setisRowOne(true)
        setIsMore(false)
      }
      if (ch > 76) {
        setIsMore(true)
        setisRowOne(false)
      }
    }
  }
  useEffect(() => {
    setHeigh()
    window.addEventListener('resize', setHeigh)
  }, [wrapRef, contentRef, list])
  return (
    <div className={styles.row}>
      <div className={styles.name}>{name}:</div>
      <div
        ref={wrapRef} className={`${styles.ks} ${ showCmore || isRowOne ? styles.moreks : ''}`}
      >
        <div ref={contentRef} >{ list.map(i => <span key={i.id}>{i.name}</span>) }</div>
        { isMore ? <span className={styles.more} onClick={() => setShowCmore(!showCmore)}>{ showCmore ? '收起' : '更多'}</span> : null }
      </div>
    </div>
  )
}
export default CategoryItem
