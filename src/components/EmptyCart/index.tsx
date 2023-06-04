import React from "react";
import styles from "./EmptyCart.module.scss";
import { Link } from "react-router-dom";

export const EmptyCart: React.FC = () => {
  return (
    <div className={styles.cartEmpty}>
      <h2>Cart is empty</h2>
      <img src="./pizza_Mario/img/empty-cart.png" alt="" />
      <Link to="/">
        <button>Return to the menu page</button>
      </Link>
    </div>
  );
};
