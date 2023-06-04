import React from "react";
import { useRouteError, isRouteErrorResponse } from "react-router-dom";

import styles from "./Error.module.scss";

function Error() {
  const error = useRouteError();
  
  return (
    <div className={styles.errorPage}>
      <div className={styles.container}>
        <h1>Oops!</h1>
        <p className={styles.emoji}>😢</p>
        <p>Sorry, an unexpected error has occurred </p>
        <p>
          {isRouteErrorResponse(error) ? <i>{error.statusText || error.status}</i> : <i>Unknown error occurred </i>}
        </p>
      </div>
    </div>
  );
}

export default Error;
