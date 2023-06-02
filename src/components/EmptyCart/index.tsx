import React from 'react'
import styles from "./EmptyCart.module.scss"

function EmptyCart() {
  return (
    <div className={styles.cartEmpty}>
      <h2>Cart is empty</h2>
      <img src="/img/empty-cart.png" alt="" />
    </div>
  )
}

export default EmptyCart