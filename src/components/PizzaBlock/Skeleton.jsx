import React from "react";
import ContentLoader from "react-content-loader";

const PizzaSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="135" cy="154" r="112" />
    <rect x="139" y="342" rx="0" ry="0" width="0" height="1" />
    <rect x="0" y="288" rx="10" ry="10" width="280" height="25" />
    <rect x="0" y="330" rx="10" ry="10" width="280" height="88" />
    <rect x="-1" y="430" rx="10" ry="10" width="120" height="35" />
    <rect x="160" y="430" rx="10" ry="10" width="120" height="35" />
  </ContentLoader>
);

export default PizzaSkeleton;
