import React from "react";
import { useRouteError } from "react-router-dom";

import styles from "./Error.module.scss";
console.log(styles);

function Error() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <h1>Oops!</h1>
        <p className={styles.emoji}>😢</p>
        <p>Sorry, an unexpected error has occurred </p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    </div>
  );
}

export default Error;
