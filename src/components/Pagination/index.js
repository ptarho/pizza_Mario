import React from 'react'
import styles from "./Pagination.module.scss" 

function Pagination({pageNumber, setPage, page}) {
  return (
    <div className={styles.pagination}>
        {[...new Array(pageNumber)].map((_, i) => {
          return (
            <div onClick={() => setPage(i)} className={`${styles.pagination__item} ${page === i ? styles.active : ""}`} key={i}>
              {i + 1}
            </div>
          );
        })}
      </div>
  )
}

export default Pagination