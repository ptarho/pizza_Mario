import React from 'react'
import styles from "./Pagination.module.scss" 
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../../redux/slices/pageSlice';

function Pagination() {
  const dispatch = useDispatch()
  const {page, amount} = useSelector(state => state.page)
  //console.log(page, amount)
  const onChangePage = (page) => {
    dispatch(changePage(page))
    window.scrollTo(0,200)
  }
  return (
    <div className={styles.pagination}>
        {[...new Array(amount)].map((_, i) => {
          return (
            <div onClick={() => onChangePage(i)} className={`${styles.pagination__item} ${page === i ? styles.active : ""}`} key={i}>
              {i + 1}
            </div>
          );
        })}
      </div>
  )
}

export default Pagination