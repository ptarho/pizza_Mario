import React from "react";
import ContentLoader from "react-content-loader";

const MyLoader = (props) => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#cccccc"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="335" rx="0" ry="0" width="280" height="90" />
    <rect x="0" y="0" width="280" height="280" />
    <rect x="0" y="293" rx="5" ry="5" width="280" height="30" />
    <rect x="5" y="447" rx="0" ry="0" width="110" height="30" />
    <rect x="125" y="440" rx="20" ry="20" width="150" height="45" />
  </ContentLoader>
);

export default MyLoader;
